import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Table,
  TextInput,
  Text,
  Title,
  Tooltip,
  NumberInput,
  Select,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { Orders } from "../../../../types";
import { type UseDisclosureReturnValue } from "@mantine/hooks";
import { useGlobalContext } from "../../../../contexts/globalContext";
import { IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  updateOrders,
  createOrders,
} from "../../../../services/beefShopApi/orderServices";
import { useEffect, useState } from "react";
import "./index.css";

type ModalEditOrderProps = {
  form: UseFormReturnType<Orders, (values: Orders) => Orders>;
  modalController: UseDisclosureReturnValue;
  orders: Orders[];
  setOrders: (orders: Orders[]) => void;
};

export const ModalOrder = ({
  form,
  modalController,
  setOrders,
  orders,
}: ModalEditOrderProps) => {
  const { buyers, meats } = useGlobalContext();
  const [addEditModalOpened, { close: closeAddEditModal }] = modalController;
  const [selectedMeatId, setSelectedMeatId] = useState<number | null>(
    form.values.orderItems?.[0]?.meatId || meats?.[0]?.id || null
  );
  const [price, setPrice] = useState<number | null>(null);
  const [coin, setCoint] = useState<string | null>(null);

  useEffect(() => {
    if (buyers?.[0]?.id === undefined) return;
    if (!form?.values?.buyerId) {
      form.setFieldValue("buyerId", buyers[0].id);
    }
  }, [form]);

  const tableRowsOrderItems = form.getValues().orderItems?.map((orderItem) => (
    <Table.Tr key={orderItem.meatId}>
      <Table.Td>{orderItem.meatId}</Table.Td>
      <Table.Td>
        {meats
          .find((meat) => meat.id === orderItem.meatId)
          ?.description.toString()}
      </Table.Td>
      <Table.Td>{orderItem.price}</Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Tooltip label={"Delete Orders"} multiline w={180}>
            <div>
              <ActionIcon
                color="red"
                onClick={() => {
                  if (!orderItem.meatId) return;
                  form.setFieldValue(
                    "orderItems",
                    form
                      .getValues()
                      .orderItems?.filter((m) => m.meatId !== orderItem.meatId)
                  );
                }}
              >
                <IconTrash size="1rem" />
              </ActionIcon>
            </div>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (values.id) {
        const order = values as Orders;
        const orderId = Number(order.id);
        delete order.id;
        delete order.totalValue;
        await updateOrders(orderId, order);
        setOrders(
          orders.map((m) =>
            m.id === orderId
              ? {
                  ...m,
                  buyerId: values.buyerId,
                  orderItems: values.orderItems,
                }
              : m
          )
        );
        notifications.show({
          title: "Success!",
          message: `Order "${values.id}" has been updated.`,
          color: "green",
        });
      } else {
        const order = values as Orders;
        delete order.id;
        const createdOrder = await createOrders(order);
        const newOrder: Orders = {
          id: createdOrder.id,
          buyerId: values.buyerId,
          buyer: buyers.find((buyer) => buyer.id === Number(values.buyerId)),
          totalValue: values.orderItems.reduce(
            (total, item) => total + item.price,
            0
          ),
          orderDate: values.orderDate,
          orderItems: values.orderItems,
        };
        setOrders([...orders, newOrder]);
        setCoint(null);
        setPrice(null);
        notifications.show({
          title: "Success!",
          message: `Order "${values.id}" has been added.`,
          color: "green",
        });
      }
      modalController[1].close();
    } catch (error: any) {
      notifications.show({
        title: "Erro!",
        message: `${
          error?.message || "Error when trying to create or update a order"
        }`,
        color: "red",
      });
    }
  };
  return (
    <Modal
      opened={addEditModalOpened}
      onClose={() => {
        closeAddEditModal();
        setCoint(null);
        setPrice(null);
      }}
      size="900"
      title={
        <Title order={3}>
          {form.values.id ? "Edit Orders" : "Add New Orders"}
        </Title>
      }
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Date"
            placeholder="ex: 12/06/2025"
            {...form.getInputProps("orderDate")}
          />
          <div className="boxBuyer--select">
            <label htmlFor="selectBuyer">Buyer</label>
            <select id="selectBuyer" {...form.getInputProps("buyerId")}>
              {buyers.map((buyer) => (
                <>
                  <option key={buyer.id} value={buyer.id}>
                    {buyer.name}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className={"boxMeats"}>
            <div className="boxMeats--context">
              <div className="boxMeats--select">
                <label htmlFor="selectMeat">Meats</label>
                <select
                  id="selectMeat"
                  value={selectedMeatId?.toString()}
                  onChange={(e) => setSelectedMeatId(Number(e.target.value))}
                >
                  {meats
                    .filter(
                      (meat) =>
                        !form
                          .getValues()
                          ?.orderItems?.some(
                            (orderItem) => orderItem?.meatId === meat?.id
                          )
                    )
                    .map((meat) => (
                      <>
                        <option key={meat.id} value={meat.id}>
                          {meat.description}
                        </option>
                      </>
                    ))}
                </select>
              </div>
              <NumberInput
                label="Price"
                placeholder="Input placeholder"
                value={price?.toString()}
                onChange={(value) => setPrice(Number(value))}
              />
              <Select
                label="Coin"
                data={["BRL", "USD", "EUR"]}
                value={coin}
                onChange={(value) => setCoint(value)}
              />
              <Button
                color="blue"
                onClick={() => {
                  if (!selectedMeatId || !price) return;
                  form.setFieldValue("orderItems", [
                    ...form.getValues().orderItems,
                    {
                      meatId: selectedMeatId,
                      price,
                      coin: coin || "BRL",
                    },
                  ]);
                }}
              >
                Add Meat
              </Button>
            </div>
          </div>
          <div>
            <Table
              striped
              highlightOnHover
              withTableBorder
              withRowBorders
              withColumnBorders
              verticalSpacing="10"
              horizontalSpacing="10"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: "100px" }}>Meat ID</Table.Th>
                  <Table.Th style={{ width: "600px" }}>Meat</Table.Th>
                  <Table.Th style={{ width: "250px" }}>Price</Table.Th>
                  <Table.Th style={{ width: "50px" }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {form.getValues().orderItems?.length > 0 ? (
                  tableRowsOrderItems
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={4}>
                      <Text py="xl">No orders found.</Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </div>
          <Group align="right" mt="md">
            <Button variant="default" onClick={closeAddEditModal}>
              Cancel
            </Button>
            <Button type="submit">
              {form.values.id ? "Update Orders" : "Save Orders"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
