import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import profilePic from '../../../assets/img/avatar.png';
import './UserSettingsModal.css';
import { MdMarkEmailRead } from "react-icons/md";
import axios from 'axios';
const UserSettingsModal = ({ user, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('profil');
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [ancienMotDePasse, setAncienMotDePasse] = useState('');
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
    const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
 
   useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateInfo = async (e) => {
  e.preventDefault();
  try {
   
    await axios.put('http://localhost:5000/api/settings/update-info', {
      name,
      email
    }, {
     withCredentials: true,
    });
    alert("Informations mises à jour !");
    onUpdate();
    onClose(); // Fermer la modal
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la mise à jour");
  }
};


  const handleUpdatePassword = async (e) => {
  e.preventDefault();
  if (nouveauMotDePasse !== confirmerMotDePasse) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    await axios.put('http://localhost:5000/api/settings/update-password', {
      ancienMotDePasse,
      nouveauMotDePasse
    }, {
     withCredentials: true,
    });
    alert("Mot de passe modifié !");
    onUpdate();
    onClose();
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la modification du mot de passe");
  }
};

    return (
    <Modal show={isOpen} size='lg' onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Paramètres utilisateur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav
          fill
          variant="tabs"
          activeKey={activeTab}
          onSelect={(selectedKey) => setActiveTab(selectedKey)}
          className="mb-3"
        >
            <Nav.Item>
            <Nav.Link eventKey="profil">Profil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="info">Modifier les infos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="password">Modifier le mot de passe</Nav.Link>
          </Nav.Item>
        </Nav>
      
        
        {activeTab === 'profil' && (
           <> 
           <div className='imgProfil'>
                <img src={profilePic} className='avatarProfil' alt="profile" />
            </div>
            
           <ListGroup className='infos'>
            
      <ListGroup.Item
        
        className="d-flex justify-content-between text-center align-items-start  "
      >
        
        <div className="ms-2 me-auto">
          <div className="fw-bold">{user.name}</div>
          <MdMarkEmailRead />{' '+ user.email}
        </div>
        <Badge bg="primary" pill>
          {user.role}
        </Badge>
      </ListGroup.Item>
     
    </ListGroup>
    </>
        )}
        
            {activeTab === 'info' && (
        <Form onSubmit={handleUpdateInfo}>
            <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Nom..." 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Button variant="primary" type="submit">
            Enregistrer
            </Button>
        </Form>
        )}


            {activeTab === 'password' && (
        <Form onSubmit={handleUpdatePassword}>
            <Form.Group className="mb-3">
            <Form.Label>Ancien mot de passe</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Ancien mot de passe"
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Nouveau mot de passe"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Confirmer"
                value={confirmerMotDePasse}
                onChange={(e) => setConfirmerMotDePasse(e.target.value)}
            />
            </Form.Group>
            <Button variant="primary" type="submit">
            Modifier
            </Button>
        </Form>
        )}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserSettingsModal;
