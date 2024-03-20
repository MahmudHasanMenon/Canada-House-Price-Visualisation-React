import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const HeatmapChart = ({ data }) => {
    useEffect(() => {
        let myChart = null;

        // Destroy existing chart before creating a new one
        const canvas = document.getElementById('heatmapChart');
        const context = canvas.getContext('2d');
        if (myChart) {
            myChart.destroy();
        }

        // Prepare data for the heatmap-like scatter plot
        const labels = data.map(city => city.City);
        const prices = data.map(city => city.Price);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice;
        const normalizedPrices = prices.map(price => (price - minPrice) / priceRange);

        // Create the scatter plot chart
        myChart = new Chart(context, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'House Prices',
                        data: normalizedPrices.map((price, index) => ({ x: labels[index], y: 0, r: 10, value: price })),
                        backgroundColor: normalizedPrices.map(price => `rgba(${Math.round(price * 255)}, 0, 0, 0.6)`),
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'City',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'House Price',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        return () => {
            // Ensure the chart is destroyed when the component unmounts
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [data]);

    return (
        <div>
            <h2>House Prices Distribution Across Cities</h2>
            <canvas id="heatmapChart" />
        </div>
    );
};

export default HeatmapChart;
