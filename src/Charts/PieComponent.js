import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, distributionType }) => {
  const calculateDistribution = () => {
    if (distributionType === 'housePrice') {
      // Calculate distribution of house prices by categories (e.g., price ranges)
      const priceRanges = {
        '<$100,000': 0,
        '$100,000 - $200,000': 0,
        '$200,000 - $300,000': 0,
        '>$300,000': 0,
      };

      data.forEach(property => {
        const price = property.Price;
        if (price < 100000) {
          priceRanges['<$100,000']++;
        } else if (price < 200000) {
          priceRanges['$100,000 - $200,000']++;
        } else if (price < 300000) {
          priceRanges['$200,000 - $300,000']++;
        } else {
          priceRanges['>$300,000']++;
        }
      });

      return {
        labels: Object.keys(priceRanges),
        datasets: [{
          data: Object.values(priceRanges),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8d6e63'],
        }],
      };
    } else if (distributionType === 'bedrooms') {
      // Calculate distribution of different types of properties by number of bedrooms
      const bedroomCounts = {
        '1 Bedroom': 0,
        '2 Bedrooms': 0,
        '3 Bedrooms': 0,
        '4+ Bedrooms': 0,
      };

      data.forEach(property => {
        const bedrooms = property.Number_Beds;
        if (bedrooms === 1) {
          bedroomCounts['1 Bedroom']++;
        } else if (bedrooms === 2) {
          bedroomCounts['2 Bedrooms']++;
        } else if (bedrooms === 3) {
          bedroomCounts['3 Bedrooms']++;
        } else {
          bedroomCounts['4+ Bedrooms']++;
        }
      });

      return {
        labels: Object.keys(bedroomCounts),
        datasets: [{
          data: Object.values(bedroomCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8d6e63'],
        }],
      };
    }
  };

  const chartData = calculateDistribution();


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 0, marginLeft: 20, marginRight: 40 }}>
      {distributionType === 'housePrice' && (
        <h2 style={{ textAlign: 'center', fontSize: 20, }}>Distribution of House Prices by Categories</h2>
      )}
      {distributionType === 'bedrooms' && (
        <h2 style={{ textAlign: 'center', fontSize: 20, }}>Distribution of Different Types of Properties (Number of Bedrooms)</h2>
      )}
      {chartData && (

        <div style={{ height: 400 }}>
          <Pie data={chartData} />
        </div>

      )}
    </div>
  );
};

export default PieChartComponent;