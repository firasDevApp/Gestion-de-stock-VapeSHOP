import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddModal from '../components/modal/service/AddModal';
import EditModal from '../components/modal/service/EditModal';
import DeleteModal from '../components/modal/service/DeleteModal';
const Service = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
   
  const [services, setServices] = useState([]);
  const toggleSidebar = () => setSidebarActive(prev => !prev);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  
  


  const fetchServices = async () => {
    try {
       const response = await axios.get('http://localhost:5000/api/services', {
       withCredentials: true,
    });
      setServices(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des services', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="recent--patients">
            <div className="title">
              <h2 className="section--title">Gerer les Services</h2>
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
                    <th>Prix</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <>
                    <tr key={service._id}>
                      <td>{service.nom}</td>
                      <td>{service.prix}</td>
                      <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                      <td><span><EditModal  service={service} OnUpdate={fetchServices} /><DeleteModal  service={service} OnDelete={fetchServices} /></span></td>

                    
                    
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
      
      <AddModal show={showAddModal} handleClose={handleCloseAddModal} OnAdd={fetchServices} />
    </>
  );
};

export default Service;
