import React from 'react';
import { Bar } from 'react-chartjs-2';

const BedNAvrgPriceBar = ({ data }) => {
    // Group data by number of bedrooms and calculate average house price for each group
    const groupedData = {};
    data.forEach(property => {
        const numBeds = property.Number_Beds;
        if (!groupedData[numBeds]) {
            groupedData[numBeds] = [];
        }
        groupedData[numBeds].push(property.Price);
    });

    const averagePrices = Object.keys(groupedData).map(numBeds => {
        const prices = groupedData[numBeds];
        const averagePrice = prices.reduce((total, price) => total + price, 0) / prices.length;
        return {
            numBeds: parseInt(numBeds),
            averagePrice,
        };
    });

    // Prepare data for the bar chart
    const barData = {
        labels: averagePrices.map(entry => entry.numBeds), // Number of bedrooms
        datasets: [
            {
                label: 'Average House Price',
                data: averagePrices.map(entry => entry.averagePrice), // Average house price
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the bars
                borderWidth: 1,
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
                    text: 'Average House Price',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Number of Bedrooms',
                },
            },
        },
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Average House Price by Number of Bedrooms</h2>
            <div style={{ height: '300px', width: '100%' }}>
                <Bar data={barData} options={barOptions} />
            </div>
        </div>
    );
};

export default BedNAvrgPriceBar;
