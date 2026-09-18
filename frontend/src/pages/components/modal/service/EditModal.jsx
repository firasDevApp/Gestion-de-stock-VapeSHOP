import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ OnUpdate, service }) => {
   const [showEditModal, setShowEditModal] = useState(false);

   const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const [form, setForm] = useState({
    nom: '',
    prix: ''
  });

  // Remplir le formulaire avec les données existantes
  useEffect(() => {
    if (service) {
      setForm({
        nom: service.nom || '',
        prix: service.prix || ''
      });
    }
  }, [service]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
     
      await axios.put(`http://localhost:5000/api/services/${service._id}`, form, {
        withCredentials: true,
      });
      OnUpdate();
      handleCloseEditModal();
    } catch (err) {
      console.error('Erreur modification service', err);
    }
  };

  return (
    <>
    <i class="ri-edit-line edit" onClick={handleShowEditModal}></i>
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Modifier un Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" onChange={handleChange} value={form.nom} />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="number" name="prix" onChange={handleChange} value={form.prix} />
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
