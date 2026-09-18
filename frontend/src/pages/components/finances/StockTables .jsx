import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Stock.css'
const StockTables = () => {
 const [stock, setStock] = useState({
  vapes: [],
  liquides: [],
  accessoires: [],
  totalVape: 0,
  totalLiquide: 0,
  totalAccessoire: 0,
  totalStock: 0
});


  useEffect(() => {
    
    axios.get('http://localhost:5000/api/finance/stock', {
       withCredentials: true,
    })
      .then(res => setStock(res.data))
      .catch(err => console.error('Erreur lors du chargement du stock :', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Stock - Vapes</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>État du Stock</th>
            <th>Prix Achat</th>
            <th>Prix Vente</th>
          </tr>
        </thead>
        <tbody>
          {stock.vapes.map((v, i) => (
            <tr key={i}>
              <td>{v.nom}</td>
              <td>{v.quantite}</td>
              <td>
                <span className={
                    v.quantite > 10
                    ? 'ba-dge badge-stock'
                    : v.quantite > 0
                    ? 'ba-dge badge-faible'
                    : 'ba-dge badge-rupture'
                }>
                    {v.quantite > 10
                    ? 'En stock'
                    : v.quantite > 0
                    ? 'Stock faible'
                    : 'Rupture de stock'}
                </span>
                </td>

              <td>{v.prix_achat ?? '-'} TND</td>
              <td>{v.prix_vente ?? '-'} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4">Total du stock brut Vapes</td>
            <td>{stock.totalVape.toFixed(3)} TND</td>
            
          </tr>
        </tbody>
      </table>

      <h2>Stock - Liquides</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Type</th>
            <th>Quantité</th>
            <th>État du Stock</th>
            <th>Prix Vente</th>
          </tr>
        </thead>
        <tbody>
          {stock.liquides.map((l, i) => (
            <tr key={i}>
              <td>{l.nom}</td>
              <td>{l.categorie}</td>
              <td>{l.type}</td>
              <td>{l.quantite}</td>
               <td>
                <span className={
                    l.quantite > 10
                    ? 'ba-dge badge-stock'
                    : l.quantite > 0
                    ? 'ba-dge badge-faible'
                    : 'ba-dge badge-rupture'
                }>
                    {l.quantite > 10
                    ? 'En stock'
                    : l.quantite > 0
                    ? 'Stock faible'
                    : 'Rupture de stock'}
                </span>
                </td>
              <td>{l.prix_vente ?? '-'} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="5">Total du stock brut Liquides</td>
            <td>{stock.totalLiquide.toFixed(3)} TND</td>
           
           
          </tr>
        </tbody>
      </table>

      <h2>Stock - Accessoires</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>État du Stock</th>
            <th>Prix Achat</th>
            <th>Prix Vente</th>
          </tr>
        </thead>
        <tbody>
          {stock.accessoires.map((a, i) => (
            <tr key={i}>
              <td>{a.nom}</td>
              <td>{a.quantite}</td>
               <td>
                <span className={
                    a.quantite > 10
                    ? 'ba-dge badge-stock'
                    : a.quantite > 0
                    ? 'ba-dge badge-faible'
                    : 'ba-dge badge-rupture'
                }>
                    {a.quantite > 10
                    ? 'En stock'
                    : a.quantite > 0
                    ? 'Stock faible'
                    : 'Rupture de stock'}
                </span>
                </td>
              <td>{a.prix_achat ?? '-'} TND</td>
              <td>{a.prix_vente ?? '-'} TND</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold">
            <td colSpan="4">Total du stock brut Accessoires</td>
            <td>{stock.totalAccessoire.toFixed(3)} TND</td>
            
          </tr>
        </tbody>
      </table>
      <h3 className="text-end mt-4">Total Général du stock brut : <strong>{stock.totalStock.toFixed(3)} TND</strong></h3>
    </div>
  );
};

export default StockTables;
