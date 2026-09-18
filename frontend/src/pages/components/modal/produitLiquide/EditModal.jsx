import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ OnUpdate, produit }) => {
   const [showEditModal, setShowEditModal] = useState(false);

   const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const [form, setForm] = useState({
     arome_ml: '',
    base_l: '',
    prix_achat_arome: '',
    prix_achat_base: '',
  });

  // Remplir le formulaire avec les données existantes
  useEffect(() => {
    if (produit) {
      setForm({
        arome_ml: produit.arome_ml || '',
        base_l: produit.base_l || '',
        prix_achat_arome: produit.prix_achat_arome || '',
        prix_achat_base: produit.prix_achat_base || '',
      });
    }
  }, [produit]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
     
      await axios.put(`http://localhost:5000/api/produits/${produit._id}`, form, {
         withCredentials: true,
      });
      OnUpdate();
      handleCloseEditModal();
    } catch (err) {
      console.error('Erreur modification produit', err);
    }
  };

  return (
    <>
    <i class="ri-edit-line edit" onClick={handleShowEditModal}></i>
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Modifier un Produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Arome en Millilitre</Form.Label>
            <Form.Control type="number" name="arome_ml" onChange={handleChange} value={form.arome_ml} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Base en Litre</Form.Label>
            <Form.Control type="number" name="base_l" onChange={handleChange} value={form.base_l} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix d'achat du l'Arome</Form.Label>
            <Form.Control type="number" name="prix_achat_arome" onChange={handleChange} value={form.prix_achat_arome} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix d'achat du Base</Form.Label>
            <Form.Control type="number" name="prix_achat_base" onChange={handleChange} value={form.prix_achat_base} />
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
