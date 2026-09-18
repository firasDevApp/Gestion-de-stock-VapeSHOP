import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenuDepenseChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState(null);

  const fetchData = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.get('http://localhost:5000/api/statistiques/revenu-depense', {
        params: { year },
        withCredentials: true,
      });

      const moisLabels = response.data.data.map(entry => entry.mois);
      const revenus = response.data.data.map(entry => entry.revenu);
      const depenses = response.data.data.map(entry => entry.depense);

      setChartData({
        labels: moisLabels,
        datasets: [
          {
            label: 'Revenus',
            data: revenus,
            backgroundColor: '#4caf50'
          },
          {
            label: 'Dépenses',
            data: depenses,
            backgroundColor: '#f44336'
          }
        ]
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques :', error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={fetchData} className="d-flex align-items-center gap-3 mb-4">
        <label className="fw-bold">Année :</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2000"
          max="2100"
        />
        <button type="submit" className="btn btn-primary">Afficher</button>
      </form>

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: context => `${context.dataset.label} : ${context.raw} TND`
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Mois'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Montant (TND)'
                },
                beginAtZero: true
              }
            }
          }}
        />
      ) : (
        <p className="text-muted text-center">Sélectionnez une année pour afficher le graphique.</p>
      )}
    </div>
  );
};

export default RevenuDepenseChart;
