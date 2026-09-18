import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './VenteVapeModal.css';

const VenteVapeModal = ({ show, vapes, onHide, OnVente }) => {
  const [quantitesVendues, setQuantitesVendues] = useState({});

  const incrementer = (id) => {
    setQuantitesVendues((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleVente = (vape) => {
    const quantite = quantitesVendues[vape._id] || 0;
    if (quantite === 0) return alert("Veuillez saisir une quantité > 0");

    const venteData = {
      produit_id: vape._id,
      type: 'vapes', // 👈 très important pour le backend
      quantite,
      prix_unitaire: vape.prix_vente,
      total: quantite * vape.prix_vente,
    };

    
    axios.post('http://localhost:5000/api/ventes', venteData, {
       withCredentials: true,
    })
      .then(() => {
        alert("Vente enregistrée avec succès !");
        OnVente();
        setQuantitesVendues((prev) => ({ ...prev, [vape._id]: 0 }));
      })
      .catch((err) => {
        console.error("Erreur lors de l’enregistrement de la vente :", err);
        alert("Erreur lors de la vente.");
      });
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="product-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="product-modal">Vente Vape</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-list">
          {vapes.map((vape) => (
            <div className="product-card" key={vape._id}>
              <div className="product-info">
                <p><strong>Nom:</strong> {vape.nom}</p>
                <p><strong>Catégorie:</strong> {vape.categorie}</p>
                <p><strong>Quantité en stock:</strong> {vape.quantite}</p>
                <p><strong>Prix:</strong> {vape.prix_vente} TND</p>
              </div>
              <div className="product-actions">
                <div className="quantity-control">
                  <input
                    type="number"
                    min="0"
                    value={quantitesVendues[vape._id] || 0}
                    onChange={(e) =>
                      setQuantitesVendues((prev) => ({
                        ...prev,
                        [vape._id]: Number(e.target.value),
                      }))
                    }
                  />
                  <button className="btn-plus" onClick={() => incrementer(vape._id)}>+</button>
                </div>
                <button className="btn-vente" onClick={() => handleVente(vape)}>
                  Vente
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VenteVapeModal;
