import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterAllCityPlot = ({ data }) => {
    // Prepare data for the scatter plot
    const scatterData = {
        datasets: data.map(city => ({
            label: city.City,
            data: [{ x: city.Median_Family_Income, y: city.Price }],
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the data points
        })),
    };

    // Scatter plot options
    const scatterOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Median Family Income',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'House Price',
                },
            },
        },
    };

    return (
        <div>
            <h2>Relationship between House Prices and Median Family Incomes</h2>
            <div style={{ height: '400px', width: '100%' }}>
                <Scatter data={scatterData} options={scatterOptions} />
            </div>
        </div>
    );
};

export default ScatterAllCityPlot;
