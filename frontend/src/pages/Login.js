import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Logo from '../assets/img/logo.gif';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './components/ForgotPasswordModal'; // ← importe ici

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [showModal, setShowModal] = useState(false); // ← nouveau state

  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:5000/auth/login',
      { email, password },
      { withCredentials: true }
    );

    const role = response.data.user.role;

    setMessage(response.data.message); // message: 'Connexion réussie'
    setAlertVariant('success');
    setShowAlert(true);

    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'vendeur') navigate('/home');
    else navigate('/');
    
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Erreur de connexion';
    setMessage(errorMessage);
    setAlertVariant('danger');
    setShowAlert(true);
  }
};


  return (
    <div className="wrapper">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <img className="logo" src={Logo} alt="logo" />
          <div className="forms-login">
            {showAlert && (
              <Alert
                variant={alertVariant}
                onClose={() => setShowAlert(false)}
                dismissible
                className="mt-2"
              >
                <p className="mb-0">{message}</p>
              </Alert>
            )}

            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <label>Password</label>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" onClick={() => setShowModal(true)}>Mot de passe oublié ?</a>
            </div>

            <button type="submit">Login</button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <ForgotPasswordModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Login;
