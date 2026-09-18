import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddModal = ({ show, handleClose, OnAdd }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    salaire: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    
    await axios.post('http://localhost:5000/api/employes', form, {
       withCredentials: true,
    });

    OnAdd();
    handleClose();
  } catch (err) {
    console.error('Erreur création employé', err);
  }
};


  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="dark-modal"  >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Employé</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salaire</Form.Label>
            <Form.Control type="Number" name="salaire" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmer Mot de passe</Form.Label>
            <Form.Control type="password" name="confirmPassword" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rôle</Form.Label>
            <Form.Select name="role"  onChange={handleChange} required>
              <option value="">-- Choisir un rôle --</option>
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
  );
};

export default AddModal;
