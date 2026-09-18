import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import SelectMoisAnnee from '../../SelectMoisAnnee'; // importe le composant ici

const PayModal = ({ OnPay, user }) => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [mois, setMois] = useState('');
  const [montantAvance, setMontantAvance] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShowPayModal = () => setShowPayModal(true);
  const handleClosePayModal = () => {
    setShowPayModal(false);
    setMessage('');
    setMois('');
    setMontantAvance('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mois || !montantAvance || isNaN(montantAvance) || montantAvance <= 0) {
      setMessage("Veuillez sélectionner un mois valide et entrer un montant positif.");
      return;
    }

    setLoading(true);
    try {
     
      const response = await axios.post('http://localhost:5000/api/salary', {
        userId: user._id,
        mois,
        montantAvance: Number(montantAvance)
      }, {
       withCredentials: true,
    });

      setMessage(response.data.message);
      if (OnPay) OnPay(); // callback après paiement/avance
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <i className="ri-bank-card-fill pay" onClick={handleShowPayModal} style={{ cursor: 'pointer' }}></i>

      <Modal show={showPayModal} onHide={handleClosePayModal} centered contentClassName="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>Payer un Employé</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mois</Form.Label>
              <SelectMoisAnnee value={mois} onChange={setMois} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Montant de l'avance</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={montantAvance}
                onChange={(e) => setMontantAvance(e.target.value)}
                placeholder="Entrer le montant"
              />
            </Form.Group>

            {message && <div className="alert alert-info">{message}</div>}

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'En cours...' : 'Valider'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PayModal;
