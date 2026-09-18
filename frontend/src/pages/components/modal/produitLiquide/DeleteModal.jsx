import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const DeleteModal = ({  produit, OnDelete }) => {
  
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
 

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produits/${produit._id}`,{
       withCredentials: true,
    });
      OnDelete();
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  
};


  return (
    <>
    <i class="ri-delete-bin-line delete"onClick={handleShowDeleteModal}></i>
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered contentClassName="dark-modal">
      <Modal.Header closeButton>
        <Modal.Title>Confirmation de suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Êtes-vous sûr de vouloir supprimer cette produit ?</b>
      </Modal.Body>
      <Modal.Footer>
       
        <Button variant="danger" onClick={handleDelete}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default DeleteModal;
