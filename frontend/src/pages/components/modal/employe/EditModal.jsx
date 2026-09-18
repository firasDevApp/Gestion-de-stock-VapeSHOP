import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ OnUpdate, user }) => {
   const [showEditModal, setShowEditModal] = useState(false);

   const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    salaire: '',
  });

  // Remplir le formulaire avec les données existantes
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        salaire: user.salaire || '',
       
      });
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      
      await axios.put(`http://localhost:5000/api/employes/${user._id}`, form, {
         withCredentials: true,
      });
      OnUpdate();
      handleCloseEditModal();
    } catch (err) {
      console.error('Erreur modification employé', err);
    }
  };

  return (
    <>
    <i class="ri-edit-line edit" onClick={handleShowEditModal}></i>
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Modifier un Employé</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} value={form.name} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} value={form.email} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salaire</Form.Label>
            <Form.Control type="Number" name="salaire" onChange={handleChange} value={form.salaire} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rôle</Form.Label>
              <Form.Select name="role" value={form.role} onChange={handleChange} required>
                <option value="">-- Choisir un Rôle --</option>
                <option value="vendeur">Vendeur</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          <Modal.Footer className="d-flex justify-content-end gap-2">
            
            <Button variant="primary" type="submit">Enregistrer</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default EditModal;
