import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddModal from '../components/modal/employe/AddModal';
import EditModal from '../components/modal/employe/EditModal';
import PayModal from '../components/modal/employe/PayModal';
import HistPayModal from '../components/modal/employe/HistPayModal';
import DeleteModal from '../components/modal/employe/DeleteModal';
const Employe = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
   
  const [users, setUsers] = useState([]);
  const toggleSidebar = () => setSidebarActive(prev => !prev);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  
  


  const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/employes', {
       withCredentials: true,
    });
      setUsers(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des employés', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="recent--patients">
            <div className="title">
              <h2 className="section--title">Gerer les Employés</h2>
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
                    <th>Email</th>
                    <th>Salaire</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <>
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.salaire}</td>
                      <td>{user.role}</td>
                      <td><span><PayModal  user={user} OnPay={fetchUsers} /><HistPayModal  user={user} /><EditModal  user={user} OnUpdate={fetchUsers} /><DeleteModal  user={user} OnDelete={fetchUsers} /></span></td>

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
      
      <AddModal show={showAddModal} handleClose={handleCloseAddModal} OnAdd={fetchUsers} />
    </>
  );
};

export default Employe;
