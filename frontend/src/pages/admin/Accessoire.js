import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddModal from '../components/modal/accessoire/AddModal';
import EditModal from '../components/modal/accessoire/EditModal';
import DeleteModal from '../components/modal/accessoire/DeleteModal';
const Accessoire = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
   
  const [accessoires, setAccessoires] = useState([]);
  const toggleSidebar = () => setSidebarActive(prev => !prev);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  
  


  const fetchAccessoires = async () => {
    try {
       const response = await axios.get('http://localhost:5000/api/accessoires', {
       withCredentials: true,
    });
      setAccessoires(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des accessoires', err);
    }
  };

  useEffect(() => {
    fetchAccessoires();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="recent--patients">
            <div className="title">
              <h2 className="section--title">Gerer les accessoires</h2>
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
                    <th>Quantité</th>
                    <th>Prix d'Achat</th>
                    <th>Prix du vente</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accessoires.map((accessoire) => (
                    <>
                    <tr key={accessoire._id}>
                      <td>{accessoire.nom}</td>
                      <td>{accessoire.categorie}</td>
                      <td>{accessoire.quantite}</td>
                      <td>{accessoire.prix_achat} TND</td>
                      <td>{accessoire.prix_vente} TND</td>
                      <td>{new Date(accessoire.createdAt).toLocaleDateString()}</td>
                      <td><span><EditModal  accessoire={accessoire} OnUpdate={fetchAccessoires} /><DeleteModal  accessoire={accessoire} OnDelete={fetchAccessoires} /></span></td>

                    
                    
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
      
      <AddModal show={showAddModal} handleClose={handleCloseAddModal} OnAdd={fetchAccessoires} />
    </>
  );
};

export default Accessoire;
