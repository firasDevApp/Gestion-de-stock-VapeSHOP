import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { FaFileDownload } from "react-icons/fa";
import './HistoriqueVente.css';



const HistoriqueVente = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [ventes, setVentes] = useState({ liquides: [], vapes: [], accessoires: [], services: [] });

  const toggleSidebar = () => setSidebarActive(prev => !prev);

  const handleDownloadPDF = (ventes) => {
    const doc = new jsPDF();
    let y = 10;

    const currentDate = new Date().toLocaleString();
    doc.text(`Historique des ventes - ${currentDate}`, 50, y);
    y += 10;

    ['vapes', 'liquides', 'accessoires'].forEach((typeKey) => {
      if (!ventes[typeKey]) return;

      doc.text(typeKey.toUpperCase(), 14, y);
      y += 6;

      ventes[typeKey].forEach((jour) => {
        doc.text(`Date : ${jour.date}`, 14, y);
        y += 6;

        jour.heures.forEach((heureData) => {
          doc.text(`Heure : ${heureData.heure}`, 14, y);
          y += 6;

          const columns = [
            { header: 'Produit', dataKey: 'produit' },
            ...(typeKey === 'liquides' ? [{ header: 'Catégorie', dataKey: 'categorie' }] : []),
            ...(typeKey === 'liquides' ? [{ header: 'Type', dataKey: 'type' }] : []),
            { header: 'Quantité', dataKey: 'quantite' },
            { header: 'Prix unitaire', dataKey: 'prix_unitaire' },
            { header: 'Total', dataKey: 'total' },
            { header: 'Vendu par', dataKey: 'vendeur' },
          ];

          const rows = heureData.ventes.map((vente) => ({
            produit: vente.produit?.nom || 'Produit',
            categorie: vente.produit?.categorie || '-',
            type: vente.produit?.type || '-',
            quantite: vente.quantite,
            prix_unitaire: `${vente.prix_unitaire} TND`,
            total: `${vente.total} TND`,
            vendeur: vente.vendeur?.name || 'Utilisateur',
          }));

          autoTable(doc, {
            startY: y,
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            theme: 'striped',
            styles: { fontSize: 9 },
            margin: { left: 14, right: 14 }
          });

          y = doc.lastAutoTable.finalY + 10;
        });
      });
    });

    // 🔵 Partie SERVICES ajoutée ici
    if (ventes.services && ventes.services.length > 0) {
      doc.text('SERVICES', 14, y);
      y += 6;

      ventes.services.forEach((jour) => {
        doc.text(`Date : ${jour.date}`, 14, y);
        y += 6;

        jour.heures.forEach((heureData) => {
          doc.text(`Heure : ${heureData.heure}`, 14, y);
          y += 6;

          const columns = [
            { header: 'Nom du service', dataKey: 'nom' },
            { header: 'Prix', dataKey: 'prix' },
            { header: 'Créé par', dataKey: 'createdBy' }
          ];

          const rows = heureData.services.map((service) => ({
            nom: service.nom,
            prix: `${service.prix} TND`,
            createdBy: service.vendeur?.name || 'Utilisateur',
          }));

          autoTable(doc, {
            startY: y,
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            theme: 'striped',
            styles: { fontSize: 9 },
            margin: { left: 14, right: 14 }
          });

          y = doc.lastAutoTable.finalY + 10;
        });
      });
    }

    doc.save('ventes.pdf');
  };



  const fetchFinance = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/ventes/group', {
       withCredentials: true,
    });
      console.log("VENTES :", res.data); // Debug
      setVentes(res.data);
    } catch (err) {
      console.error('Erreur de chargement des ventes:', err);
    }
  };

  useEffect(() => {
    fetchFinance();
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="main">
        <Sidebar isActive={isSidebarActive} />
        <div className={`main--content ${isSidebarActive ? 'active' : ''}`}>
          <div className="title">
              <h2 className="section--title">Historique des ventes par jour et heure</h2>
              <div className="doctors--right--btns">
                <button className="download" onClick={() => handleDownloadPDF(ventes)}>
                  <FaFileDownload />
                </button>

              </div>
            </div>
          <div className="finance-table">
            {['vapes', 'liquides', 'accessoires'].map((typeKey) => (
              <div key={typeKey} className="vente-type">
                <h3>{typeKey.toUpperCase()}</h3>

                {ventes[typeKey] && ventes[typeKey].length > 0 ? (
                  ventes[typeKey].map((jour, jIndex) => (
                    <div key={jIndex} className="vente-jour">
                      <h4>Date : {jour.date}</h4>
                      {jour.heures.map((heureData, hIndex) => (
                       <div key={hIndex} className="vente-heure">
                          <h5>Heure : {heureData.heure}</h5>
                          <div className="table-responsive">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th>Produit</th>
                                  {typeKey === 'liquides' && <th>Catégorie</th>}
                                  {typeKey === 'liquides' && <th>Type</th>}
                                  <th>Quantité</th>
                                  <th>Prix unitaire</th>
                                  <th>Total</th>
                                  <th>Vendu par</th>
                                </tr>
                              </thead>
                              <tbody>
                                {heureData.ventes.map((vente, vIndex) => (
                                  <tr key={vIndex}>
                                    <td>{vente.produit?.nom || 'Produit'}</td>
                                    {typeKey === 'liquides' && <td>{vente.produit?.categorie || '-'}</td>}
                                    {typeKey === 'liquides' && <td>{vente.produit?.type || '-'}</td>}
                                    <td>{vente.quantite}</td>
                                    <td>{vente.prix_unitaire} TND</td>
                                    <td>{vente.total} TND</td>
                                    <td>{vente.vendeur?.name || 'Utilisateur'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      ))}
                    </div>
                  ))
                ) : (
                  <p>Aucune vente pour ce type.</p>
                )}
              </div>
            ))}
             {['services'].map((typeKey) => (
                <div key={typeKey} className="vente-type">
                  <h3>{typeKey.toUpperCase()}</h3>

                  {ventes[typeKey] && ventes[typeKey].length > 0 ? (
                    ventes[typeKey].map((jour, jIndex) => (
                      <div key={jIndex} className="vente-jour">
                        <h4>Date : {jour.date}</h4>
                        {jour.heures.map((heureData, hIndex) => (
                          <div key={hIndex} className="vente-heure">
                            <h5>Heure : {heureData.heure}</h5>
                            <div className="table-responsive">
                              <table className="table table-bordered text-center">
                                <thead>
                                  <tr>
                                    <th>Nom du service</th>
                                    <th>Prix</th>
                                    <th>Créé par</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {heureData.services.map((service, sIndex) => (
                                    <tr key={sIndex}>
                                      <td>{service.nom}</td>
                                      <td>{service.prix} TND</td>
                                    <td>{service.vendeur?.name || 'Utilisateur'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>Aucune vente pour ce type.</p>
                  )}
                </div>
              ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default HistoriqueVente;
