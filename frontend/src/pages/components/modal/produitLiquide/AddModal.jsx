import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddModal = ({ show, handleClose, OnAdd }) => {
  const [form, setForm] = useState({
    arome_ml: '',
    base_l: '',
    prix_achat_arome: '',
    prix_achat_base: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    
    await axios.post('http://localhost:5000/api/produits', form, {
       withCredentials: true,
    });

   OnAdd();
    handleClose();
  } catch (err) {
    console.error('Erreur création produit', err);
  }
};


  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="dark-modal"  >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Produit</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Arome en Millilitre</Form.Label>
            <Form.Control type="number" name="arome_ml"    step="0.01"
    min="0" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Base en Litre</Form.Label>
            <Form.Control type="number" name="base_l"    step="0.01"
    min="0" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix d'achat du l'Arome</Form.Label>
            <Form.Control type="number" name="prix_achat_arome"    step="0.01"
    min="0" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix  d'achat du Base</Form.Label>
            <Form.Control type="number" name="prix_achat_base"    step="0.01"
    min="0" onChange={handleChange} />
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
