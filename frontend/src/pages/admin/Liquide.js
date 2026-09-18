import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddModal from '../components/modal/liquide/AddModal';
import EditModal from '../components/modal/liquide/EditModal';
import DeleteModal from '../components/modal/liquide/DeleteModal';
const Liquide = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
   
  const [liquides, setLiquide] = useState([]);
  const toggleSidebar = () => setSidebarActive(prev => !prev);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  
  


  const fetchLiquide = async () => {
    try {
       const response = await axios.get('http://localhost:5000/api/liquides', {
       withCredentials: true,
    });
      setLiquide(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des liquides', err);
    }
  };

  useEffect(() => {
    fetchLiquide();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="recent--patients">
            <div className="title">
              <h2 className="section--title">Gerer les liquides</h2>
              <div className="doctors--right--btns">
                <button className="add" onClick={handleShowAddModal}>
                  <i className="ri-add-line"></i> Ajouter
                </button>
              </div>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Type</th>
                    <th>Quantité</th>
                    <th>Prix du vente</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {liquides.map((liquide) => (
                    <>
                    <tr key={liquide._id}>
                      <td>{liquide.nom}</td>
                      <td>{liquide.categorie}</td>
                      <td>{liquide.type}</td>
                      <td>{liquide.quantite}</td>
                      <td>{liquide.prix_vente} TND</td>
                      <td>{new Date(liquide.createdAt).toLocaleDateString()}</td>
                      <td><span><EditModal  liquide={liquide} OnUpdate={fetchLiquide} /><DeleteModal  liquide={liquide} OnDelete={fetchLiquide} /></span></td>

                    </tr>
                    
                    </>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      
      <AddModal show={showAddModal} handleClose={handleCloseAddModal} OnAdd={fetchLiquide} />
    </>
  );
};

export default Liquide;
