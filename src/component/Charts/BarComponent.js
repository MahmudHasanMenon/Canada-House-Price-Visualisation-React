import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Vancouver', 'Toronto', 'Calgary', 'Edmonton'];

const BarChartComponent = (props) => {
  const data = {
    labels: labels,
    datasets: [{
      label: 'Average House Price (CAD)',
      data: labels.map(city => props.averagePrices[city]),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingBottom: 0, marginTop: 0, marginRight: 0 }}>
      <h2 style={{ textAlign: 'center' }}>Average House price comparison</h2>

      <Bar options={options} data={data} />

    </div>


  );
};

export default BarChartComponent;