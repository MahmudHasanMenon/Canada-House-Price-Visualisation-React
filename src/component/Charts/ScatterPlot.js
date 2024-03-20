import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterPlot = ({ data }) => {
    // Extracting data for scatter plot
    const scatterData = data.map(property => ({
        x: property.Number_Beds, // Number of bedrooms
        y: property.Price, // House price
    }));

    // Scatter plot configuration
    const scatterConfig = {
        labels: 'House Price vs. Number of Bedrooms',
        datasets: [
            {
                label: 'House Price vs. Number of Bedrooms',
                data: scatterData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the data points
            },
        ],
    };

    return (
        <div>
            <h2>House Price vs. Number of Bedrooms</h2>
            <div style={{ height: '400px', width: '100%' }}>
                <Scatter data={scatterConfig} />
            </div>
        </div>
    );
};

export default ScatterPlot;