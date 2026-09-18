import React, { useState, useRef, useEffect } from 'react';
import profilePic from '../../assets/img/avatar.png';
import logoApp from '../../assets/img/logoApp.png';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserSettingsModal from '../components/modal/UserSettingsModal'; 
const AppNavbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
   const [showModal, setShowModal] = useState(false);
const [user, setUser] = useState([]);
  const fetchUser = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/settings/profile', {
       withCredentials: true,
    });
      setUser(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement de profil user', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await axios.post(
      'http://localhost:5000/auth/logout',
      {},
      { withCredentials: true }
    );

    navigate('/');
  } catch (err) {
    console.error('Erreur lors de la déconnexion', err);
  }
};

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Cacher le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <section className="header">
      <div className="logo">
        <img className='logoApp' src={logoApp} alt="logo" />
      </div>
      <div className="search--notification--profile">
        <div></div>
        <div className="notification--profile">
          <div className="picon lock" onClick={() => setShowModal(true)}><i className="ri-settings-3-line"></i></div>
          
          <div className="dropdown-wrapper" ref={dropdownRef}>
  <div className="picon profile" onClick={toggleDropdown}>
    <span>{user.name}</span><img src={profilePic} alt="profile" />
  </div>
  {dropdownVisible && (
    <div className="profile-dropdown">
 
      <div className="dropdown-item"> <button 
            onClick={handleLogout} 
            className="logout-button" 
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              font: 'inherit',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            
            <span className="sidebar--item">Déconnexion</span>
          </button></div>
    </div>
  )}
</div>

        </div>
      </div>
    </section>
     <UserSettingsModal user={user} isOpen={showModal} onClose={() => setShowModal(false)} onUpdate={fetchUser} />
   </>
  );
};

export default AppNavbar;
