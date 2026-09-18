import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Finance.css';
import DepenseTables from '../components/finances/DepenseTables';
import RevenuTables from '../components/finances/RevenuTables';
// import RevenuNetTables from '../components/finances/RevenuTables';
import StockTables from '../components/finances/StockTables ';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Finance = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [activeTab, setActiveTab] = useState('tous');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
   const [depenseData, setDepenseData] = useState(null);
  const [revenuData, setRevenuData] = useState(null);
  const [stockData, setStockData] = useState(null);


  const toggleSidebar = () => setSidebarActive(prev => !prev);

  const fetchData = async () => {
    try {
      

      if (startDate && endDate) {
        const [depensesRes, revenusRes, stockRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/finance/depense`, {
            params: { startDate, endDate },
             withCredentials: true,
          }),
          axios.get(`http://localhost:5000/api/finance/revenus`, {
            params: { startDate, endDate },
            withCredentials: true,
          }),
           axios.get(`http://localhost:5000/api/finance/stock`, {
            withCredentials: true,
          })
        ]);
        setDepenseData(depensesRes.data);
        setRevenuData(revenusRes.data);
        setStockData(stockRes.data);
      } else {
        alert('Veuillez sélectionner les deux dates.');
      }
    } catch (err) {
      console.error('Erreur de chargement :', err);
    }
  };

 const revenuNet = (revenuData?.totalRevenu || 0) - (depenseData?.totalDepense || 0);

  const valeurTotale = revenuNet + (stockData?.totalStock || 0);
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <Card className="text-center">
                <Card.Header> Suivie Finance: Revenus, Dépenses et L'état de Stock</Card.Header>
                <Card.Body>
                  <FloatingLabel
        controlId="floatingStartDate"
        label="Début"
        className="mb-3"
      >
        <Form.Control type="date" placeholder="Début" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingEndDate" label="Fin">
        <Form.Control type="date" placeholder="Fin"value={endDate} onChange={e => setEndDate(e.target.value)} />
      </FloatingLabel>
             
                  <Button variant="primary" onClick={fetchData}>Trouver</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Nav
            fill
            variant="pills"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
            style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}
          >
            <Nav.Item>
              <Nav.Link eventKey="tous">Tous</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="depenses">Dépenses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="revenus">Revenus</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stock">Stock</Nav.Link>
            </Nav.Item>
             <Nav.Item>
              <Nav.Link eventKey="revenusNet">Revenus Net</Nav.Link>
            </Nav.Item>
          </Nav>
                </Card.Footer>
              </Card>
          {/* Formulaire des dates */}
          

          {/* Navigation */}
          

          {/* Composants */}
          {(activeTab === 'tous' || activeTab === 'depenses') && depenseData &&
            <DepenseTables data={depenseData} />}
          {(activeTab === 'tous' || activeTab === 'revenus') && revenuData &&
            <RevenuTables data={revenuData} />}
          {(activeTab === 'tous' || activeTab === 'stock') && <StockTables />}
          {(activeTab === 'tous' || activeTab === 'revenusNet') &&
            depenseData && revenuData && stockData && (
             <div className="container mt-5">
      <h2 className="text-center mb-4">Résumé Financier Net</h2>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Description</th>
            <th>Montant (TND)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total des Revenus</td>
            <td>{revenuData.totalRevenu.toFixed(3)} TND</td>
          </tr>
          <tr>
            <td>Total des Dépenses</td>
            <td>{depenseData.totalDepense.toFixed(3)} TND</td>
          </tr>
          <tr className="table-warning fw-bold">
            <td>Revenu Net (Revenus - Dépenses)</td>
            <td>{revenuNet.toFixed(3)} TND</td>
          </tr>
          <tr>
            <td>Valeur du Stock Restant</td>
            <td>{stockData.totalStock.toFixed(3)} TND</td>
          </tr>
          <tr className="table-success fw-bold">
            <td>Valeur Totale Finale</td>
            <td>{valeurTotale.toFixed(3)} TND</td>
          </tr>
        </tbody>
      </table>
    </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Finance;
