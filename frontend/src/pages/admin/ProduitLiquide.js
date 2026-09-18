import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddModal from '../components/modal/produitLiquide/AddModal';
import EditModal from '../components/modal/produitLiquide/EditModal';
import DeleteModal from '../components/modal/produitLiquide/DeleteModal';
const ProduitLiquide = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
   
  const [produits, setProduits] = useState([]);
  const toggleSidebar = () => setSidebarActive(prev => !prev);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  
  


  const fetchProduits = async () => {
    try {
       const response = await axios.get('http://localhost:5000/api/produits', {
       withCredentials: true,
    });
      setProduits(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des vapes', err);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="recent--patients">
            <div className="title">
              <h2 className="section--title">Gerer les Aromes et Bases</h2>
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
                    <th>Arome en Millilitre</th>
                    <th>Base en Litre</th>
                    <th>Prix d'Achat du l'Arome</th>
                    <th>Prix d'Achat du Base</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {produits.map((produit) => (
                    <>
                    <tr key={produit._id}>
                      <td>{produit.arome_ml}</td>
                      <td>{produit.base_l}</td>
                      <td>{produit.prix_achat_arome} TND</td>
                      <td>{produit.prix_achat_base} TND</td>
                      <td>{new Date(produit.createdAt).toLocaleDateString()}</td>
                      <td><span><EditModal  produit={produit} OnUpdate={fetchProduits} /><DeleteModal  produit={produit} OnDelete={fetchProduits}  /></span></td>

                    
                    
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
      
      <AddModal show={showAddModal} handleClose={handleCloseAddModal} OnAdd={fetchProduits} />
    </>
  );
};

export default ProduitLiquide;
