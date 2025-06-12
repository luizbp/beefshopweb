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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import type { Buyers } from "../../types";
import {
  createBuyers,
  deleteBuyers,
  getAllBuyers,
  updateBuyers,
} from "../../services/beefShopApi/buyerServices";
import { CITIES, STATES } from "../../utils/constants";

export function BuyersManagement() {
  const [buyers, setBuyers] = useState<Buyers[]>([]);
  const [
    addEditModalOpened,
    { open: openAddEditModal, close: closeAddEditModal },
  ] = useDisclosure(false);
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    buyerId?: number | null;
  }>({ isOpen: false, buyerId: null });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataBuyers = await getAllBuyers();
    setBuyers(dataBuyers);
  };

  const form = useForm({
    initialValues: {
      id: null as number | null,
      name: "",
      document: "",
      state: "",
      city: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 3 ? "Name must have at least 3 characters" : null,
    },
  });

  const handleOpenAddModal = () => {
    form.reset();
    openAddEditModal();
  };

  const handleOpenEditModal = (buyer: Buyers) => {
    form.setValues(buyer);
    openAddEditModal();
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (values.id) {
        const buyer = values as Buyers;
        const buyerId = Number(buyer.id);
        delete buyer.id;
        await updateBuyers(buyerId, buyer);
        setBuyers(
          buyers.map((m) =>
            m.id === buyerId
              ? {
                  ...m,
                  name: values.name,
                  document: values.document,
                  state: values.state,
                  city: values.city,
                }
              : m
          )
        );
        notifications.show({
          title: "Success!",
          message: `Buyers "${values.name}" has been updated.`,
          color: "green",
        });
      } else {
        const buyer = values as Buyers;
        delete buyer.id;
        const createdBuyer = await createBuyers(buyer);
        const newBuyer: Buyers = {
          id: createdBuyer.id,
          name: values.name,
          document: values.document,
          state: values.state,
          city: values.city,
        };
        setBuyers([...buyers, newBuyer]);
        notifications.show({
          title: "Success!",
          message: `Buyers "${values.name}" has been added.`,
          color: "green",
        });
      }
      closeAddEditModal();
    } catch (error: any) {
      notifications.show({
        title: "Erro!",
        message: `${
          error?.message || "Error when trying to create or update a buyer"
        }`,
        color: "red",
      });
    }
  };

  const openDeleteConfirmation = (buyer: Buyers) => {
    setDeleteModalState({ isOpen: true, buyerId: buyer.id });
  };

  const handleDelete = async () => {
    if (!deleteModalState?.buyerId) return;

    try {
      await deleteBuyers(deleteModalState.buyerId);
      const buyerToDelete = buyers.find(
        (m) => m.id === deleteModalState.buyerId
      );
      setBuyers(buyers.filter((m) => m.id !== deleteModalState.buyerId));
      setDeleteModalState({ isOpen: false, buyerId: null });
      notifications.show({
        title: "Deleted!",
        message: `The buyer "${buyerToDelete?.name}" has been removed.`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error trying to delete buyer!",
        message: `${error}`,
        color: "red",
      });
    }
  };

  const tableRows = buyers.map((buyer) => (
    <Table.Tr key={buyer.id}>
      <Table.Td>{buyer.id}</Table.Td>
      <Table.Td>{buyer.name}</Table.Td>
      <Table.Td>{buyer.document}</Table.Td>
      <Table.Td>{buyer.city}</Table.Td>
      <Table.Td>{buyer.state}</Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Tooltip label="Edit Buyers">
            <ActionIcon color="blue" onClick={() => handleOpenEditModal(buyer)}>
              <IconPencil size="1rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={"Delete Buyers"} multiline w={180}>
            <div>
              <ActionIcon
                color="red"
                onClick={() => openDeleteConfirmation(buyer)}
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
          <Title order={2}>Buyers Management</Title>
          <Button
            leftSection={<IconPlus size="1rem" />}
            onClick={handleOpenAddModal}
          >
            Add Buyers
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
              <Table.Th>Description</Table.Th>
              <Table.Th style={{ width: "150px" }}>Document</Table.Th>
              <Table.Th style={{ width: "150px" }}>City</Table.Th>
              <Table.Th style={{ width: "150px" }}>State</Table.Th>
              <Table.Th style={{ width: "120px" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.length > 0 ? (
              tableRows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text py="xl">No buyers found.</Text>
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
            {form.values.id ? "Edit Buyers" : "Add New Buyers"}
          </Title>
        }
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="ex: Luiz"
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Document"
              placeholder="ex: 458.685.685-52"
              {...form.getInputProps("document")}
            />
            <Select
              withAsterisk
              label="State"
              placeholder="Pick one"
              data={[...STATES]}
              {...form.getInputProps("state")}
            />
            <Select
              withAsterisk
              label="City"
              placeholder="Pick one"
              data={[...CITIES]}
              {...form.getInputProps("city")}
            />
            <Group align="right" mt="md">
              <Button variant="default" onClick={closeAddEditModal}>
                Cancel
              </Button>
              <Button type="submit">
                {form.values.id ? "Update Buyers" : "Save Buyers"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, buyerId: null })}
        title={<Title order={3}>Confirm Deletion</Title>}
        size="sm"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete this buyer? This action cannot be
            undone.
          </Text>
          <Group align="right" mt="md">
            <Button
              variant="default"
              onClick={() =>
                setDeleteModalState({ isOpen: false, buyerId: null })
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
