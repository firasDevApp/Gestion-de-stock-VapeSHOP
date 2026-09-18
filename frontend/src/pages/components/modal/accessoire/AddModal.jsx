import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddModal = ({ show, handleClose, OnAdd }) => {
  const [form, setForm] = useState({
    nom: '',
    categorie: '',
    quantite: '',
    prix_achat: '',
    prix_vente: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    
    await axios.post('http://localhost:5000/api/accessoires', form, {
       withCredentials: true,
    });

    OnAdd();
    handleClose();
  } catch (err) {
    console.error('Erreur création accessoire', err);
  }
};


  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="dark-modal"  >
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Accessoire</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control type="text" name="categorie" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantité</Form.Label>
            <Form.Control type="number" name="quantite" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix d'achat</Form.Label>
            <Form.Control type="number" name="prix_achat" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix de vente</Form.Label>
            <Form.Control type="number" name="prix_vente" onChange={handleChange} />
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
