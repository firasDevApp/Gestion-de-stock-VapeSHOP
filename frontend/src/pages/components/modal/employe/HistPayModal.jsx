import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const HistPayModal = ({ user }) => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleShowPayModal = () => {
    setShowPayModal(true);
    fetchHistorique();
  };
  const handleClosePayModal = () => {
    setShowPayModal(false);
    setHistorique([]);
    setMessage('');
  };

  const fetchHistorique = async () => {
    setLoading(true);
    setMessage('');
    try {
     
      const response = await axios.get(`http://localhost:5000/api/salary/employe/${user._id}`, {
         withCredentials: true,
      });
      setHistorique(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur serveur.');
    }
    setLoading(false);
  };

  return (
    <>
      <i
        className="ri-file-list-3-fill pay"
        onClick={handleShowPayModal}
        style={{ cursor: 'pointer' }}
        title="Voir historique des salaires"
      ></i>

      <Modal show={showPayModal} onHide={handleClosePayModal} centered contentClassName="dark-modal" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Historique des salaires de {user.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" role="status" />
              <span className="ms-2">Chargement...</span>
            </div>
          )}

          {message && <p className="text-danger">{message}</p>}

          {!loading && !message && historique.length === 0 && <p>Aucun historique trouvé.</p>}

          {!loading && historique.length > 0 && (
            <div>
              {historique.map((sal) => {
                const totalAvance = sal.avances.reduce((acc, a) => acc + a.montant, 0);
                const montantRestant = sal.montant - totalAvance;
                return (
                  <div key={sal._id} className="mb-4 border p-3 rounded">
                    <h5>Mois : {sal.mois}</h5>
                    <p>Salaire total : {sal.montant} TND</p>
                    <p>
                      Statut : {sal.isPaid ? <span style={{ color: 'green' }}>Payé</span> : <span style={{ color: 'red' }}>Non payé</span>}
                    </p>
                    <p>Montant restant : {sal.isPaid ? 0  :( montantRestant > 0 ? montantRestant : 0) } TND</p>

                    <h6>Avances :</h6>
                    {sal.avances.length === 0 && <p>Aucune avance.</p>}
                    <ul>
                      {sal.avances.map((avance, idx) => (
                        <li key={idx}>
                          {avance.montant} TND - le {new Date(avance.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePayModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistPayModal;
