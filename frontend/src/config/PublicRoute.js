import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => {
        setUserRole(res.data.role); // On récupère le rôle de l'utilisateur
        setLoading(false);
      })
      .catch(() => {
        setUserRole(null); // Pas connecté
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}


  if (userRole) {
    // Si admin, redirige vers dashboard admin, sinon vers home
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }

  // Pas connecté, afficher la page (ex: login)
  return children;
}

export default PublicRoute;
