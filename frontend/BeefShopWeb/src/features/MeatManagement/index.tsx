import { useEffect, useState } from 'react';
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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import type { Meat, MeatType } from '../../types';
import { createMeat, deleteMeat, getAllMeats, updateMeat } from '../../services/beefShopApi/meatServices';

const MEAT_TYPE = ['Bovina', 'Suína', 'Aves', 'Peixes'] as const;

export function MeatManagement() {
  const [meats, setMeats] = useState<Meat[]>([]);
  const [addEditModalOpened, { open: openAddEditModal, close: closeAddEditModal }] = useDisclosure(false);
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; meatId?: number | null }>({ isOpen: false, meatId: null });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataMeats = await getAllMeats();
    setMeats(dataMeats);
  }

  const form = useForm({
    initialValues: { id: null as number | null, description: '', meatType: '' as MeatType | '' },
    validate: {
      description: (value) => (value.trim().length < 3 ? 'Description must have at least 3 characters' : null),
      meatType: (value) => (value ? null : 'You must select an origin'),
    },
  });

  const handleOpenAddModal = () => {
    form.reset();
    openAddEditModal();
  };

  const handleOpenEditModal = (meat: Meat) => {
    form.setValues(meat);
    openAddEditModal();
  };
  
  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (values.id) {
        const meat = values as Meat;
        console.log("TCL: handleSubmit -> values", values)
        const meatId = Number(meat.id);
        delete meat.id;
        await updateMeat(meatId, meat);
        setMeats(meats.map((m) => (m.id === meatId ? { ...m, description: values.description, meatType: values.meatType as MeatType } : m)));
        notifications.show({ title: 'Success!', message: `Meat "${values.description}" has been updated.`, color: 'green' });
      } else {
        const meat = values as Meat;
        delete meat.id;
        const createdMeat = await createMeat(meat);
        const newMeat: Meat = { id: createdMeat.id, description: values.description, meatType: values.meatType as MeatType};
        setMeats([...meats, newMeat]);
        notifications.show({ title: 'Success!', message: `Meat "${values.description}" has been added.`, color: 'green' });
      }
      closeAddEditModal();
    } catch (error: any) { 
      notifications.show({ title: 'Erro!', message: `${error?.message || 'Erro ao tentar criar ou atualizar uma carne'}`, color: 'red' });
    }
  };
  
  const openDeleteConfirmation = (meat: Meat) => {
    setDeleteModalState({ isOpen: true, meatId: meat.id });
  };
  
  const handleDelete = async () => {
    if (!deleteModalState?.meatId) return;

    try {
      await deleteMeat(deleteModalState.meatId);
      const meatToDelete = meats.find(m => m.id === deleteModalState.meatId);
      setMeats(meats.filter((m) => m.id !== deleteModalState.meatId));
      setDeleteModalState({ isOpen: false, meatId: null });
      notifications.show({ title: 'Deleted!', message: `The meat "${meatToDelete?.description}" has been removed.`, color: 'green' });
    } catch (error) {
      notifications.show({ title: 'Erro ao tentar deletar a carne!', message: `${error}`, color: 'red' });
    }
  };


  const tableRows = meats.map((meat) => (
    <Table.Tr key={meat.id}>
      <Table.Td>{meat.id}</Table.Td>
      <Table.Td>{meat.description}</Table.Td>
      <Table.Td>{meat.meatType}</Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Tooltip label="Edit Meat"><ActionIcon color="blue" onClick={() => handleOpenEditModal(meat)}><IconPencil size="1rem" /></ActionIcon></Tooltip>
          <Tooltip label={(meat?.numberAssociatedOrders || 0) > 0 ? `Cannot delete, has ${(meat?.numberAssociatedOrders || 0)} associated orders` : 'Delete Meat'} multiline w={180}>
            <div><ActionIcon color="red" disabled={(meat?.numberAssociatedOrders || 0) > 0} onClick={() => openDeleteConfirmation(meat)}><IconTrash size="1rem" /></ActionIcon></div>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
        <Stack gap="xl" mt={"xl"}>
          <Group align="apart">
            <Title order={2}>Meat Management</Title>
            <Button leftSection={<IconPlus size="1rem" />} onClick={handleOpenAddModal}>
              Add Meat
            </Button>
          </Group>

          <Table striped highlightOnHover withTableBorder withRowBorders withColumnBorders verticalSpacing="sm" horizontalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '100px' }}>ID</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th style={{ width: '150px' }}>Meat Type</Table.Th>
                <Table.Th style={{ width: '120px' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tableRows.length > 0 ? tableRows : (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Text py="xl">
                      No meats found.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Stack>

      <Modal opened={addEditModalOpened} onClose={closeAddEditModal} title={<Title order={3}>{form.values.id ? 'Edit Meat' : 'Add New Meat'}</Title>} centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput withAsterisk label="Description" placeholder="e.g., Sirloin Steak" {...form.getInputProps('description')} />
            <Select withAsterisk label="Meat Type" placeholder="Pick one" data={[...MEAT_TYPE]} {...form.getInputProps('meatType')} />
            <Group align="right" mt="md"><Button variant="default" onClick={closeAddEditModal}>Cancel</Button><Button type="submit">{form.values.id ? 'Update Meat' : 'Save Meat'}</Button></Group>
          </Stack>
        </form>
      </Modal>
      
      <Modal opened={deleteModalState.isOpen} onClose={() => setDeleteModalState({isOpen: false, meatId: null})} title={<Title order={3}>Confirm Deletion</Title>} size="sm" centered>
        <Stack>
          <Text>Are you sure you want to delete this meat? This action cannot be undone.</Text>
          <Group align="right" mt="md"><Button variant="default" onClick={() => setDeleteModalState({isOpen: false, meatId: null})}>Cancel</Button><Button color="red" onClick={handleDelete}>Delete</Button></Group>
        </Stack>
      </Modal>
    </>
  );
}