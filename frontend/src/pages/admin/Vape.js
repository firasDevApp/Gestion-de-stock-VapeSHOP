import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddModal from '../components/modal/vape/AddModal';
import EditModal from '../components/modal/vape/EditModal';
import DeleteModal from '../components/modal/vape/DeleteModal';
const Vape = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
   
  const [vapes, setVapes] = useState([]);
  const toggleSidebar = () => setSidebarActive(prev => !prev);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  
  


  const fetchVapes = async () => {
    try {
       const response = await axios.get('http://localhost:5000/api/vapes', {
       withCredentials: true,
    });
      setVapes(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des vapes', err);
    }
  };

  useEffect(() => {
    fetchVapes();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="recent--patients">
            <div className="title">
              <h2 className="section--title">Gerer les vapes</h2>
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
                  {vapes.map((vape) => (
                    <>
                    <tr key={vape._id}>
                      <td>{vape.nom}</td>
                      <td>{vape.categorie}</td>
                      <td>{vape.quantite}</td>
                      <td>{vape.prix_achat} TND</td>
                      <td>{vape.prix_vente} TND</td>
                      <td>{new Date(vape.createdAt).toLocaleDateString()}</td>
                      <td><span><EditModal  vape={vape} OnUpdate={fetchVapes} /><DeleteModal  vape={vape} OnDelete={fetchVapes} /></span></td>

                    
                    
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
      
      <AddModal show={showAddModal} handleClose={handleCloseAddModal} OnAdd={fetchVapes} />
    </>
  );
};

export default Vape;
