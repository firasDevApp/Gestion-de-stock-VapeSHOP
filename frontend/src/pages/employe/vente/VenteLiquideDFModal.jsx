import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './VenteVapeModal.css';

const VenteLiquideDFModal = ({ show, liquides, onHide, OnVente }) => {
  const [quantitesVendues, setQuantitesVendues] = useState({});

  const incrementer = (id) => {
    setQuantitesVendues((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleVente = (liquide) => {
    const quantite = quantitesVendues[liquide._id] || 0;
    if (quantite === 0) return alert("Veuillez saisir une quantité > 0");

    const venteData = {
      produit_id: liquide._id,
      type: 'liquides', // 👈 très important pour le backend
      quantite,
      prix_unitaire: liquide.prix_vente,
      total: quantite * liquide.prix_vente,
    };

   
    axios.post('http://localhost:5000/api/ventes', venteData, {
      withCredentials: true,
    })
      .then(() => {
        alert("Vente enregistrée avec succès !");
        OnVente();
        setQuantitesVendues((prev) => ({ ...prev, [liquide._id]: 0 }));
      })
      .catch((err) => {
        console.error("Erreur lors de l’enregistrement de la vente :", err);
        alert("Erreur lors de la vente.");
      });
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="product-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="product-modal">Vente Liquide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-list">
          {liquides.map((liquide) => (
            <div className="product-card" key={liquide._id}>
              <div className="product-info">
                <p><strong>Nom:</strong> {liquide.nom}</p>
                <p><strong>Catégorie:</strong> {liquide.categorie}</p>
                <p><strong>Quantité en stock:</strong> {liquide.quantite}</p>
                <p><strong>Prix:</strong> {liquide.prix_vente} TND</p>
              </div>
              <div className="product-actions">
                <div className="quantity-control">
                  <input
                    type="number"
                    min="0"
                    value={quantitesVendues[liquide._id] || 0}
                    onChange={(e) =>
                      setQuantitesVendues((prev) => ({
                        ...prev,
                        [liquide._id]: Number(e.target.value),
                      }))
                    }
                  />
                  <button className="btn-plus" onClick={() => incrementer(liquide._id)}>+</button>
                </div>
                <button className="btn-vente" onClick={() => handleVente(liquide)}>
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

export default VenteLiquideDFModal;
