import { useEffect, useState } from "react";
import {
  Title,
  Button,
  Stack,
  Group,
  Table,
  ActionIcon,
  Tooltip,
  Modal,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import type { Orders } from "../../types";
import {
  deleteOrders,
  getAllOrders,
} from "../../services/beefShopApi/orderServices";
import { ModalOrder } from "./components/ModalOrder";

export function OrdersManagement() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const modalController = useDisclosure(false);
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
    // validate: {
    //   orderItems: (value) =>
    //     value.length <= 0
    //       ? "There must be at least one item in the order"
    //       : null,
    //   buyerId: (value) => (value !== null ? "You need to have a buyer" : null),
    // },
  });

  const handleOpenAddModal = () => {
    form.reset();
    modalController[1].open();
  };

  const handleOpenEditModal = (order: Orders) => {
    form.setValues(order);
    modalController[1].open();
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
      <Table.Td>{new Date(order.orderDate).toLocaleDateString()}</Table.Td>
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
              <Table.Th style={{ width: "200px" }}>Order Date</Table.Th>
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
      <ModalOrder
        form={form}
        modalController={modalController}
        setOrders={setOrders}
        orders={orders}
      />
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
