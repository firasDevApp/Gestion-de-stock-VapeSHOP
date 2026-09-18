import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './VenteVapeModal.css';

const VenteAccsseoireModal = ({ show, accessoires, onHide, OnVente }) => {
  const [quantitesVendues, setQuantitesVendues] = useState({});

  const incrementer = (id) => {
    setQuantitesVendues((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleVente = (accessoire) => {
  const quantite = quantitesVendues[accessoire._id] || 0;
  if (quantite === 0) return alert("Veuillez saisir une quantité > 0");

  const venteData = {
    produit_id: accessoire._id,
    type: 'accessoires',
    quantite,
    prix_unitaire: accessoire.prix_vente,
    total: quantite * accessoire.prix_vente,
  };

  axios.post('http://localhost:5000/api/ventes', venteData, {
    withCredentials: true, // 🔐 on utilise les cookies sécurisés ici
  })
    .then(() => {
      alert("Vente enregistrée avec succès !");
      OnVente();
      setQuantitesVendues((prev) => ({ ...prev, [accessoire._id]: 0 }));
    })
    .catch((err) => {
      console.error("Erreur lors de l’enregistrement de la vente :", err);
      alert("Erreur lors de la vente.");
    });
};


  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="product-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="product-modal">Vente Accessoires</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-list">
          {accessoires.map((accessoire) => (
            <div className="product-card" key={accessoire._id}>
              <div className="product-info">
                <p><strong>Nom:</strong> {accessoire.nom}</p>
                <p><strong>Catégorie:</strong> {accessoire.categorie}</p>
                <p><strong>Quantité en stock:</strong> {accessoire.quantite}</p>
                <p><strong>Prix:</strong> {accessoire.prix_vente} TND</p>
              </div>
              <div className="product-actions">
                <div className="quantity-control">
                  <input
                    type="number"
                    min="0"
                    value={quantitesVendues[accessoire._id] || 0}
                    onChange={(e) =>
                      setQuantitesVendues((prev) => ({
                        ...prev,
                        [accessoire._id]: Number(e.target.value),
                      }))
                    }
                  />
                  <button className="btn-plus" onClick={() => incrementer(accessoire._id)}>+</button>
                </div>
                <button className="btn-vente" onClick={() => handleVente(accessoire)}>
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

export default VenteAccsseoireModal;
