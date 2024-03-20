export function getAllCityAvrgPriceDatasets(allCityData) {
    const averagePrices = {};
    const cityCount = {};
    allCityData.forEach(city => {
        const cityName = city.City;
        const price = city.Price;

        if (!averagePrices[cityName]) {
            averagePrices[cityName] = price;
            cityCount[cityName] = 1;
        } else {
            averagePrices[cityName] += price;
            cityCount[cityName]++;
        }
    });

    // Calculate average price for each city
    const topCities = Object.keys(averagePrices);
    topCities.forEach(city => {
        averagePrices[city] /= cityCount[city];
    });
    // Sort cities by average price in descending order
    const sortedCities = topCities.sort((a, b) => averagePrices[b] - averagePrices[a]);

    return averagePrices;
}

export const calculateCityStatistics = (allCityData, selectedCity) => {
    const cityData = allCityData.filter(city => city.City === selectedCity);

    if (cityData.length === 0) {
        return null; // City not found in the dataset
    }

    const housePrices = cityData.map(city => city.Price);
    const medianFamilyIncomes = cityData.map(city => city.Median_Family_Income);

    const averageHousePrice = housePrices.reduce((acc, price) => acc + price, 0) / housePrices.length;
    const maxHousePrice = Math.max(...housePrices);
    const minHousePrice = Math.min(...housePrices);

    const sortedIncomes = medianFamilyIncomes.sort((a, b) => a - b);
    const medianFamilyIncome = sortedIncomes[Math.floor(sortedIncomes.length / 2)];

    return {
        averageHousePrice,
        maxHousePrice,
        minHousePrice,
        medianFamilyIncome
    };
};