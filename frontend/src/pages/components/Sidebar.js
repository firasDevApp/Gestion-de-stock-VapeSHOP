import React from 'react';
import axios from 'axios';
import vapeIcon from '../../assets/img/vape.png';
import produitIcon from '../../assets/img/produit liquide.png';
import liquideIcon from '../../assets/img/liquide.png';
import accessoireIcon from '../../assets/img/accessoire.png';
import { FcServices } from "react-icons/fc";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isActive }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLinkActive = (path) => currentPath === path;

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


  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
            <ul className="sidebar--items">
        <li>
          <a href="/admin/dashboard" id={isLinkActive("/admin/dashboard") ? "active--link" : undefined}>
            <span className="icon icon-1"><i class="ri-dashboard-fill"></i></span>
            <span className="sidebar--item">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/admin/employe" id={isLinkActive("/admin/employe") ? "active--link" : undefined}>
            <span className="icon icon-2"><i className="ri-shield-user-fill"></i></span>
            <span className="sidebar--item">Employés</span>
          </a>
        </li>
        <li>
          <a href="/admin/vape" id={isLinkActive("/admin/vape") ? "active--link" : undefined}>
            <span className="menu-item">
              <img src={vapeIcon} className="icon" alt="Vape Icon" />
              <span className="label">Vapes</span>
            </span>
          </a>
        </li>
        <li>
          <a href="/admin/produit-liquide" id={isLinkActive("/admin/produit-liquide") ? "active--link" : undefined}>
            <span className="menu-item">
              <img src={produitIcon} className="icon" alt="Produit Liquide Icon" />
              <span className="label">Produits Liquides</span>
            </span>
          </a>
        </li>
        <li>
          <a href="/admin/liquide" id={isLinkActive("/admin/liquide") ? "active--link" : undefined}>
            <span className="menu-item">
              <img src={liquideIcon} className="icon" alt="Liquide Icon" />
              <span className="label">Liquides</span>
            </span>
          </a>
        </li>
        <li>
          <a href="/admin/accessoire" id={isLinkActive("/admin/accessoire") ? "active--link" : undefined}>
            <span className="menu-item">
              <img src={accessoireIcon} className="icon" alt="Accessoire Icon" />
              <span className="label">Accessoires</span>
            </span>
          </a>
        </li>
        <li>
          <a href="/admin/service" id={isLinkActive("/admin/service") ? "active--link" : undefined}>
            <span className="icon icon-6"><FcServices /></span>
            <span className="sidebar--item">Services</span>
          </a>
        </li>
      </ul>
      <ul className="sidebar--bottom-items">
        
        <li>
           <button 
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
            <span className="icon icon-8"><i className="ri-logout-box-r-line"></i></span>
            <span className="sidebar--item">Déconnexion</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
