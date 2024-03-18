import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
    labels: ['Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [15, 25, 10],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'blue',
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'red',
        },
      },
      title: {
        display: true,
        text: 'Custom Chart Title',
        color: 'green',
        font: {
          weight: 'bold',
        },
      },
    },
  };

function DoughnutComponent() {
  return (
    <div> 
    <Doughnut data={data} options={options} />;
   </div>
  );
}

export default DoughnutComponent;
