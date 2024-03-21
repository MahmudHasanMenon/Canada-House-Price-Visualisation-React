import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Toronto', 'Vancouver', 'Calgary', 'Edmonton'];

const CityBarChartComponent = (props) => {

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Street Address',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount (CAD)',
                },
            },
        },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingBottom: 0, marginTop: 0, marginRight: 0 }}>
            <h2 style={{ textAlign: 'center' }}>House Prices and Median Family Incomes of {props?.selectedCity && props?.selectedCity.value}</h2>
            <Bar options={options} data={props.data} />
        </div>


    );
};

export default CityBarChartComponent;