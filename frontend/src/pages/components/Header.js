import React, { useState, useEffect } from 'react';
import profilePic from '../../assets/img/avatar.png';
import logoApp from '../../assets/img/logoApp.png';
import { CgMenuGridR } from "react-icons/cg";
import { BsCashCoin } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import axios from 'axios';
import UserSettingsModal from '../components/modal/UserSettingsModal'; 

const Header = ({ toggleSidebar }) => {
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
  return (
    <>
      <section className="header">
        <div className="logo">
          <CgMenuGridR className="icon icon-0 menu" onClick={toggleSidebar} />
          <img className='logoApp' src={logoApp} alt="logo" />
        </div>
        <div className="search--notification--profile">
          <div></div>
          <div className="notification--profile">
            <div className="picon lock" onClick={() => setShowModal(true)}>
              <i className="ri-settings-3-line"></i>
            </div>
            <div className="picon bell"><a href='/admin/finance'><BsCashCoin /></a></div>
            <div className="picon hist"><a href='/admin/historique-ventes'><FaHistory /></a></div>
            <div className="picon profile "><span>{user.name}</span><img src={profilePic} alt="profile" /></div>
          </div>
        </div>
      </section>

      <UserSettingsModal user={user} isOpen={showModal} onClose={() => setShowModal(false)} onUpdate={fetchUser} />
    </>
  );
};

export default Header;
