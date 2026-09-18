import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ OnUpdate, vape }) => {
   const [showEditModal, setShowEditModal] = useState(false);

   const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const [form, setForm] = useState({
    nom: '',
    categorie: '',
    quantite: '',
    prix_achat: '',
    prix_vente: '',
  });

  // Remplir le formulaire avec les données existantes
  useEffect(() => {
    if (vape) {
      setForm({
        nom: vape.nom || '',
        categorie: vape.categorie || '',
        quantite: vape.quantite || '',
        prix_achat: vape.prix_achat || '',
        prix_vente: vape.prix_vente || '',
      });
    }
  }, [vape]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      
      await axios.put(`http://localhost:5000/api/vapes/${vape._id}`, form, {
         withCredentials: true,
      });
      OnUpdate();
      handleCloseEditModal();
    } catch (err) {
      console.error('Erreur modification vape', err);
    }
  };

  return (
    <>
    <i class="ri-edit-line edit" onClick={handleShowEditModal}></i>
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Modifier une Vape</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" onChange={handleChange} value={form.nom} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control type="text" name="categorie" onChange={handleChange} value={form.categorie} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantité</Form.Label>
            <Form.Control type="number" name="quantite" onChange={handleChange} value={form.quantite} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prix d'achat</Form.Label>
            <Form.Control type="number" name="prix_achat" onChange={handleChange} value={form.prix_achat} />
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
