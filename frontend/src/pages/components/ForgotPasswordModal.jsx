import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ForgotPasswordModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger');
  const [token, setToken] = useState('');

  const reset = () => {
    setStep(1);
    setEmail('');
    setCode('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
    setVariant('danger');
    setToken('');
  };

  const handleStep1 = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/forgot-password/step1', { email });
      setMessage(res.data.message);
      setVariant('success');
      setToken(res.data.token);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erreur.');
      setVariant('danger');
    }
  };

  const handleStep2 = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/forgot-password/step2', { code, token });
      setMessage(res.data.message);
      setVariant('success');
      setToken(res.data.token); // Nouveau token pour step3
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erreur.');
      setVariant('danger');
    }
  };

  const handleStep3 = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/forgot-password/step3', {
        password,
        confirmPassword,
        token,
      });
      setMessage(res.data.message);
      setVariant('success');
      setTimeout(() => {
        reset();
        onHide();
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erreur.');
      setVariant('danger');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Button className="mt-3" onClick={handleStep1}>
              Envoyer le code
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Form.Group>
              <Form.Label>Code reçu par email</Form.Label>
              <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
            </Form.Group>
            <Button className="mt-3" onClick={handleStep2}>
              Vérifier le code
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Form.Group>
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="mt-3" onClick={handleStep3}>
              Réinitialiser le mot de passe
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={() => { reset(); onHide(); }} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mot de passe oublié</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant={variant}>{message}</Alert>}
        <Form>{renderStep()}</Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
