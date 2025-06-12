import { useState } from 'react';
import type { Meat, OriginMeat } from '../../types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Modal } from '../../components/Modal';
import './index.css';

const ORIGENS_CARNE: readonly OriginMeat[] = ['Bovina', 'Suína', 'Aves', 'Peixes'];

const MOCK_CARNES: Meat[] = [
  { id: 1, description: "Picanha", origen: "Bovina", requestsAssociates: 5 },
  { id: 2, description: "Filé de Tilápia", origen: "Peixes", requestsAssociates: 0 },
  { id: 3, description: "Coxa de Frango", origen: "Aves", requestsAssociates: 2 },
  { id: 4, description: "Costela Suína", origen: "Suína", requestsAssociates: 0 },
];

const INITIAL_FORM_STATE = { description: '', origen: 'Bovina' as OriginMeat };

export const MeatRegistration = () => {
  const [meats, setMeats] = useState<Meat[]>(MOCK_CARNES);
  const [formState, setFormState] = useState<Omit<Meat, 'id' | 'requestsAssociates'>>(INITIAL_FORM_STATE);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; meatIdToDelete: number | null }>({ isOpen: false, meatIdToDelete: null });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.description) return;

    if (editingId !== null) {
      // Editando
      setMeats(meats.map(c => c.id === editingId ? { ...c, ...formState } : c));
      setEditingId(null);
    } else {
      // Criando
      const newMeat: Meat = {
        id: new Date().getTime(),
        ...formState,
        requestsAssociates: 0,
      };
      setMeats([...meats, newMeat]);
    }
    setFormState(INITIAL_FORM_STATE);
  };

  const handleEdit = (meat: Meat) => {
    setEditingId(meat.id);
    setFormState({ description: meat.description, origen: meat.origen });
  };

  const openDeleteModal = (id: number) => {
    setModalState({ isOpen: true, meatIdToDelete: id });
  };
  
  const handleDelete = () => {
    if (modalState.meatIdToDelete === null) return;
    setMeats(meats.filter(c => c.id !== modalState.meatIdToDelete));
    setModalState({ isOpen: false, meatIdToDelete: null });
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Meats</h1>

      <form className="card form-container" onSubmit={handleSubmit}>
        <Input
          id="description"
          name="description"
          label="Descrição da Meat"
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Ex: Picanha"
          required
        />
        <Select
          id="origen"
          name="origen"
          label="Origem"
          value={formState.origen}
          onChange={handleInputChange}
          options={ORIGENS_CARNE}
        />
        <div className="form-actions">
          <Button type="submit">{editingId ? 'Salvar Alterações' : 'Cadastrar'}</Button>
        </div>
      </form>

      <div className="card table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Origem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {meats.map(meat => (
              <tr key={meat.id}>
                <td>{meat.id}</td>
                <td>{meat.description}</td>
                <td>{meat.origen}</td>
                <td className="actions-cell">
                  <Button variant="secondary" onClick={() => handleEdit(meat)}>Editar</Button>
                  <Button
                    variant="danger"
                    disabled={meat.requestsAssociates > 0}
                    onClick={() => openDeleteModal(meat.id)}
                    title={meat.requestsAssociates > 0 ? `Não pode ser excluído, possui ${meat.requestsAssociates} pedidos.` : 'Excluir'}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, meatIdToDelete: null })}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
      >
        <p>Você tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.</p>
      </Modal>
    </div>
  );
}