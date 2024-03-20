import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarAllcityPlot = ({ data }) => {
    // Prepare data for the bar chart
    const barData = {
        labels: data.map(city => city.City),
        datasets: [
            {
                label: 'House Price',
                data: data.map(city => city.Price),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the bars
            },
            {
                label: 'Median Family Income',
                data: data.map(city => city.Median_Family_Income),
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for the bars
            },
        ],
    };

    // Bar chart options
    const barOptions = {
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
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 20, marginTop: 20 }}>
            <h2 style={{ textAlign: 'center' }}>House Prices and Median Family Incomes by City</h2>

            <Bar data={barData} options={barOptions} />

        </div>
    );
};

export default BarAllcityPlot;
