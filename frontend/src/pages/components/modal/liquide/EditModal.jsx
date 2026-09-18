import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ OnUpdate, liquide }) => {
   const [showEditModal, setShowEditModal] = useState(false);

   const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const [form, setForm] = useState({
    nom: '',
    categorie: '',
    quantite: '',
    type: '',
    prix_vente: '',
  });

  // Remplir le formulaire avec les données existantes
  useEffect(() => {
    if (liquide) {
      setForm({
        nom: liquide.nom || '',
        categorie: liquide.categorie || '',
        quantite: liquide.quantite || '',
        type: liquide.type || '',
        prix_vente: liquide.prix_vente || '',
      });
    }
  }, [liquide]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      
      await axios.put(`http://localhost:5000/api/liquides/${liquide._id}`, form, {
         withCredentials: true,
      });
      OnUpdate();
      handleCloseEditModal();
    } catch (err) {
      console.error('Erreur modification liquide', err);
    }
  };

  return (
    <>
    <i class="ri-edit-line edit" onClick={handleShowEditModal}></i>
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Modifier un Liquide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" onChange={handleChange} value={form.nom} />
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
            <Form.Control type="number" name="quantite" onChange={handleChange} value={form.quantite} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix de vente</Form.Label>
            <Form.Control type="number" name="prix_vente" onChange={handleChange} value={form.prix_vente} />
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
