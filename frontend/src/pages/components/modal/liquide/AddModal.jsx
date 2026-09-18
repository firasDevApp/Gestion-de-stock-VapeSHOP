import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddModal = ({ show, handleClose, OnAdd }) => {
  const [form, setForm] = useState({
    nom: '',
    categorie: '',
    quantite: '',
    prix_vente: '',
    type: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      
      await axios.post('http://localhost:5000/api/liquides', form, {
         withCredentials: true,
      });

      OnAdd();
      handleClose();
    } catch (err) {
      console.error('Erreur création liquide', err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Liquide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" value={form.nom} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select name="categorie" value={form.categorie} onChange={handleChange} required>
              <option value="">-- Choisir une catégorie --</option>
              <option value="gourmand">Gourmand</option>
              <option value="fruité">Fruité</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handleChange} required>
              <option value="">-- Choisir un type --</option>
              <option value="bouteille">Bouteille</option>
              <option value="dose">Dose</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantité</Form.Label>
            <Form.Control type="number" name="quantite" value={form.quantite} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prix de vente</Form.Label>
            <Form.Control type="number" name="prix_vente" value={form.prix_vente} onChange={handleChange} required />
          </Form.Group>

          

          <Modal.Footer className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>Annuler</Button>
            <Button variant="primary" type="submit">Enregistrer</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
