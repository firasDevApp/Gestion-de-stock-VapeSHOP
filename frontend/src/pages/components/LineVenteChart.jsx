import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineVenteChart = () => {
  const [startDate, setStartDate] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate) return alert('Veuillez sélectionner une date');

    try {
      
      const res = await axios.get('http://localhost:5000/api/statistiques/ventes-par-semaine-fixe', {
        params: { startDate },
         withCredentials: true,
      });

      const semaines = res.data.map(entry => entry.semaine);

      const vapesData = res.data.map(entry => entry.vapes);
      const liquidesData = res.data.map(entry => entry.liquides);
      const accessoiresData = res.data.map(entry => entry.accessoires);

      setChartData({
        labels: semaines,
        datasets: [
          {
            label: 'Vapes vendus',
            data: vapesData,
            borderColor: '#36A2EB',
            backgroundColor: '#cce6ff',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Liquides vendus',
            data: liquidesData,
            borderColor: '#FFCE56',
            backgroundColor: '#fff3cd',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Accessoires vendus',
            data: accessoiresData,
            borderColor: '#FF6384',
            backgroundColor: '#f8d7da',
            fill: false,
            tension: 0.4
          }
        ]
      });
    } catch (err) {
      console.error('Erreur lors du chargement du graphique :', err);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-3 mb-4">
        <label className="fw-bold">Date de début :</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Afficher</button>
      </form>

      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: context => `${context.dataset.label} : ${context.raw}`
                }
              }
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Quantité vendue',
                  font: { size: 14, weight: 'bold' }
                },
                beginAtZero: true
              },
              x: {
                title: {
                  display: true,
                  text: 'Semaines',
                  font: { size: 14, weight: 'bold' }
                }
              }
            }
          }}
        />
      ) : (
        <p className="text-muted text-center">Sélectionnez une date pour afficher le graphique.</p>
      )}
    </div>
  );
};

export default LineVenteChart;
