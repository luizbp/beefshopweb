import { useEffect, useState } from "react";
import {
  Title,
  Button,
  Stack,
  Group,
  TextInput,
  Table,
  ActionIcon,
  Tooltip,
  Modal,
  Select,
  Text,
  NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import type { Orders } from "../../types";

import { CITIES, STATES } from "../../utils/constants";
import {
  createOrders,
  deleteOrders,
  getAllOrders,
  updateOrders,
} from "../../services/beefShopApi/orderServices";
import { useGlobalContext } from "../../contexts/globalContext";

export function OrdersManagement() {
  const { buyers } = useGlobalContext();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [
    addEditModalOpened,
    { open: openAddEditModal, close: closeAddEditModal },
  ] = useDisclosure(false);
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    orderId?: number | null;
  }>({ isOpen: false, orderId: null });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataOrders = await getAllOrders();
    setOrders(dataOrders);
  };

  const form = useForm({
    initialValues: {
      id: null as number | null,
      buyerId: null as number | null,
      orderDate: new Date(),
      totalValue: 0,
      buyers: null,
      orderItems: [],
    } as Orders,
    validate: {
      orderItems: (value) =>
        value.length <= 0
          ? "There must be at least one item in the order"
          : null,
      buyerId: (value) => (value !== null ? "You need to have a buyer" : null),
    },
  });

  const handleOpenAddModal = () => {
    form.reset();
    openAddEditModal();
  };

  const handleOpenEditModal = (order: Orders) => {
    form.setValues(order);
    openAddEditModal();
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (values.id) {
        const order = values as Orders;
        const orderId = Number(order.id);
        delete order.id;
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
          orderDate: values.orderDate,
          orderItems: values.orderItems,
        };
        setOrders([...orders, newOrder]);
        notifications.show({
          title: "Success!",
          message: `Order "${values.id}" has been added.`,
          color: "green",
        });
      }
      closeAddEditModal();
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

  const openDeleteConfirmation = (order: Orders) => {
    setDeleteModalState({ isOpen: true, orderId: order.id });
  };

  const handleDelete = async () => {
    if (!deleteModalState?.orderId) return;

    try {
      await deleteOrders(deleteModalState.orderId);
      const orderToDelete = orders.find(
        (m) => m.id === deleteModalState.orderId
      );
      setOrders(orders.filter((m) => m.id !== deleteModalState.orderId));
      setDeleteModalState({ isOpen: false, orderId: null });
      notifications.show({
        title: "Deleted!",
        message: `The order "${orderToDelete?.id}" has been removed.`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error trying to delete order!",
        message: `${error}`,
        color: "red",
      });
    }
  };

  const tableRows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.id}</Table.Td>
      <Table.Td>{order.buyer?.name}</Table.Td>
      <Table.Td>{order.totalValue}</Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Tooltip label="Edit Orders">
            <ActionIcon color="blue" onClick={() => handleOpenEditModal(order)}>
              <IconPencil size="1rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={"Delete Orders"} multiline w={180}>
            <div>
              <ActionIcon
                color="red"
                onClick={() => openDeleteConfirmation(order)}
              >
                <IconTrash size="1rem" />
              </ActionIcon>
            </div>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  // const tableRowsOrderItems = form.getValues().orderItems?.map((orderItem) => (
  //   <Table.Tr key={orderItem.id}>
  //     <Table.Td>{orderItem.id}</Table.Td>
  //     <Table.Td>{orderItem.buyer?.name}</Table.Td>
  //     <Table.Td>{orderItem.totalValue}</Table.Td>
  //     <Table.Td>
  //       <Group gap="xs" wrap="nowrap">
  //         <Tooltip label="Edit Orders">
  //           <ActionIcon color="blue" onClick={() => handleOpenEditModal(order)}>
  //             <IconPencil size="1rem" />
  //           </ActionIcon>
  //         </Tooltip>
  //         <Tooltip label={"Delete Orders"} multiline w={180}>
  //           <div>
  //             <ActionIcon
  //               color="red"
  //               onClick={() => openDeleteConfirmation(order)}
  //             >
  //               <IconTrash size="1rem" />
  //             </ActionIcon>
  //           </div>
  //         </Tooltip>
  //       </Group>
  //     </Table.Td>
  //   </Table.Tr>
  // ));

  return (
    <>
      <Stack gap="xl" mt={"xl"}>
        <Group align="apart">
          <Title order={2}>Orders Management</Title>
          <Button
            leftSection={<IconPlus size="1rem" />}
            onClick={handleOpenAddModal}
          >
            Add Orders
          </Button>
        </Group>

        <Table
          striped
          highlightOnHover
          withTableBorder
          withRowBorders
          withColumnBorders
          verticalSpacing="sm"
          horizontalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "100px" }}>ID</Table.Th>
              <Table.Th style={{ width: "600px" }}>Buyer</Table.Th>
              <Table.Th style={{ width: "250px" }}>Total Value</Table.Th>
              <Table.Th style={{ width: "100px" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.length > 0 ? (
              tableRows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text py="xl">No orders found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Stack>

      <Modal
        opened={addEditModalOpened}
        onClose={closeAddEditModal}
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
            <label htmlFor="selectBuyer">Buyer</label>
            <select id="selectBuyer" {...form.getInputProps("buyer")}>
              {buyers.map((buyer) => (
                <>
                  <option key={buyer.id} value={buyer.id}>
                    {buyer.name}
                  </option>
                </>
              ))}
            </select>
            <div>
              <Table
                striped
                highlightOnHover
                withTableBorder
                withRowBorders
                withColumnBorders
                verticalSpacing="sm"
                horizontalSpacing="sm"
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ width: "100px" }}>ID</Table.Th>
                    <Table.Th style={{ width: "600px" }}>Buyer</Table.Th>
                    <Table.Th style={{ width: "250px" }}>Total Value</Table.Th>
                    <Table.Th style={{ width: "100px" }}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {form.getValues().orderItems?.length > 0 ? (
                    tableRows
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

      <Modal
        opened={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, orderId: null })}
        title={<Title order={3}>Confirm Deletion</Title>}
        size="sm"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete this order? This action cannot be
            undone.
          </Text>
          <Group align="right" mt="md">
            <Button
              variant="default"
              onClick={() =>
                setDeleteModalState({ isOpen: false, orderId: null })
              }
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
