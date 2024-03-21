import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Vancouver', 'Toronto', 'Calgary', 'Edmonton'];

const BarChartComponent = (props) => {
  const data = {
    labels: labels,
    datasets: [{
      label: 'Average House Price (CAD)',
      data: labels.map(city => props.averagePrices[city]),
      backgroundColor: 'rgba(153, 102, 255, 0.6',
      borderColor: 'rgba(153, 102, 255, 0.6',
      borderWidth: 1,
    }],
  };


  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average House Price (CAD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Top Cities',
        },
      },
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => context.dataset.data[context.dataIndex]
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingBottom: 0, marginTop: 0, marginRight: 0 }}>
      <h2 style={{ textAlign: 'center' }}>Average House price comparison for all Top Cities</h2>

      <Bar options={options} data={data} />

    </div>


  );
};

export default BarChartComponent;