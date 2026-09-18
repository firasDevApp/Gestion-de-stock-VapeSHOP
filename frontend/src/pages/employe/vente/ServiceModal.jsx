import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ServiceModal = ({ show, onHide, OnVente }) => {
  const [form, setForm] = useState({
    nom: '',
    prix: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    await axios.post(
      'http://localhost:5000/api/services',
      form,
      {
        withCredentials: true // 🔐 on utilise les cookies HttpOnly
      }
    );

    OnVente();
    onHide();
  } catch (err) {
    console.error('Erreur création service', err);
  }
};



  return (
    <Modal show={show} onHide={onHide} centered contentClassName="dark-modal"  >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Service</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" onChange={handleChange} />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="number" name="prix" onChange={handleChange} />
          </Form.Group>
          
          <Modal.Footer className="d-flex justify-content-end gap-2">
           
            <Button variant="primary" type="submit">Enregistrer</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceModal;
