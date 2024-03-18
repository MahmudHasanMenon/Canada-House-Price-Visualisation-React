import React from 'react';
import { Line } from 'react-chartjs-2';

const LineAllCityPlot = ({ data }) => {
    // Prepare data for the line chart
    const lineData = {
        labels: data.map(city => city.City),
        datasets: [
            {
                label: 'House Price',
                data: data.map(city => city.Price),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 0.6)', // Color for the line
                tension: 0.1, // Smoothness of the curve
            },
            {
                label: 'Median Family Income',
                data: data.map(city => city.Median_Family_Income),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.6)', // Color for the line
                tension: 0.1, // Smoothness of the curve
            },
        ],
    };

    // Line chart options
    const lineOptions = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'City',
                },
            },
        },
    };

    return (
        <div>
            <h2>House Prices and Median Family Incomes by City</h2>
            <div style={{ height: '400px', width: '100%' }}>
                <Line data={lineData} options={lineOptions} />
            </div>
        </div>
    );
};

export default LineAllCityPlot;
