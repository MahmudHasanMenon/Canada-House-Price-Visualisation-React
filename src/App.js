import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";
import DoughnutComponent from "./component/Charts/Doughnut";
import BarChartComponent from "./component/Charts/BarComponent";
import CityBarChartComponent from "./component/Charts/CityPriceIncomeBarComponent";
import PieChartComponent from "./component/Charts/PieComponent";
import LineChartComponent from "./component/Charts/LineComponent";
import ScatterPlot from "./component/Charts/ScatterPlot";
import BedNAvrgPriceBar from "./component/Charts/BedNAvrgPriceBar";
import ScatterAllCityPlot from "./component/Charts/ScatterAllCity";
import BarAllcityPlot from "./component/Charts/BarAllcityPlot";
import LineAllCityPlot from "./component/Charts/LineAllCityPlot";
import HeatmapChart from "./component/Charts/Heatmap";
import MapComponent from "./component/Charts/Map";
import { canadaHousePrice } from "../src/utils/caCityHouse";
import { cityData } from "../src/utils/cityData";
import { getAllCityAvrgPriceDatasets, calculateCityStatistics } from "../src/utils/plotHelperFunction"

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [cityHousePriceData, setCityHousePriceData] = useState([]);
  const [averagePrices, setAveragePrices] = useState(null)
  const [cityStatistic, setCityStatistic] = useState(null)
  const [cities, setCities] = useState([cityData]);
  const [citychartData, setCityChartData] = useState(null);
  const [selectedCity, setSelectedCity] = useState({
    value: "Edmonton",
    label: "Edmonton"
  },);


  useEffect(() => {
    console.log("cityData", cityData);
    console.log("canadaHousePrice", canadaHousePrice);
    const cityFilterData = canadaHousePrice.filter(
      (item, index) => item.City === "Edmonton"
    );
    setCityHousePriceData(cityFilterData);
    prepareAllCitiesAvrgPrice()
    setCityStatistic(calculateCityStatistics(canadaHousePrice, 'Edmonton'))
    prepareCityStatistic('Edmonton')
    // fetch(
    //   "https://data.edmonton.ca/resource/tq23-qn4m.json?$limit=100"
    //     // "https://data.edmonton.ca/resource/s4ws-tdws.json?$limit=1000"
    // )
    //     .then((response) => response.json())
    //     .then((data: any) => {
    //         console.log('data', data)
    //         // const albertaData = data.filter((item, index) => item.station_province === "ALBERTA")
    //         console.log('albertaData', data)
    //         setCanadaWeatherData(data)
    //     });
  }, []);

  const prepareCityStatistic = (selectedCity) => {
    if (canadaHousePrice && selectedCity) {
      const selectedCityData = canadaHousePrice.filter(location => location.City === selectedCity);
      console.log('selectedCityData', selectedCityData)
      const locations = selectedCityData.map(location => location.Address);
      const housePrices = selectedCityData.map(location => location.Price);
      const medianFamilyIncomes = selectedCityData.map(location => location.Median_Family_Income);

      setCityChartData({
        labels: locations,
        datasets: [
          {
            label: 'House Price (CAD)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red color
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: housePrices,
          },
          {
            label: 'Median Family Income (CAD)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: medianFamilyIncomes,
          },
        ],
      });
    }
  }

  const prepareAllCitiesAvrgPrice = () => {
    if (cityData && cityData.length > 0) {
      const averagePrices = getAllCityAvrgPriceDatasets(canadaHousePrice)
      console.log('topCitiesPriceDataset', averagePrices)
      setAveragePrices(averagePrices)
    }
  }

  const setCity = (item) => {
    console.log('item', item)
    if (item && item.value) {
      setSelectedCity(item)
      const cityFilterData = canadaHousePrice.filter(
        (data, index) => data.City === item.value
      );
      console.log('cityFilterData', cityFilterData)
      setCityHousePriceData(cityFilterData);
      setCityStatistic(calculateCityStatistics(canadaHousePrice, item.value))
      prepareCityStatistic(item.value)
    }
  }

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchInput(query);
    const cityFilterData = canadaHousePrice.filter(city =>
      city.City.toLowerCase().includes(query)
    );

    setCityHousePriceData(cityFilterData);
    let findCity = cityData.find(city => city.value.toLowerCase().includes(query))
    console.log('cityName', findCity)
    if (findCity) {
      setSelectedCity(findCity)
      setCityStatistic(calculateCityStatistics(canadaHousePrice, findCity.value))
      prepareCityStatistic(findCity.value)
    }

    // const filtered = citiesData.filter(city => city.name.toLowerCase().includes(query));
    // setFilteredCities(filtered);
  };

  return (
    <div className="body">
      <div className="navbar">
        <h1 className="headerText">Canadian house prices for top cities</h1>
      </div>

      <div className="searchBarContainer">
        <div style={{ display: 'flex', flex: 0.5 }}></div>
        <div class="search-container" style={{ display: 'flex', flexDirection: 'row', background: "#FFFFFF", flex: 0.8, borderRadius: 10, alignItems: 'center', marginRight: 100, paddingLeft: 20 }}>
          <button type="submit"><i class="fa fa-search"></i></button>
          <input
            style={{
              width: "100%",
              height: 30,
              border: "none",
              borderRadius: 20,
              marginLeft: 30,
              padding: "0.5rem",
            }}
            className="search"
            key="search-bar"
            value={searchInput}
            placeholder={"search by city e.g Edmonton, Toronto, Calgary, Vancouber"}
            onChange={handleChange}
          />
        </div>

        <div className="cityDropDown">
          <h1 style={{ fontSize: 16, marginBottom: -8, textAlign: 'center' }}>
            Select your city
          </h1>
          <div style={{ marginTop: 10 }}>
            <Select
              options={cityData}
              value={selectedCity}
              onChange={(selectedOption) =>
                setCity(selectedOption)
              }
            />
          </div>

        </div>
      </div>

      <div className="highlightContainer">
        <div className="highlightBox">
          <div className="highlightLabel " style={{ backgroundColor: 'rgba(36, 53, 204, 0.1)' }}>
            <span style={{ fontSize: 16 }}>Average House Price</span>
          </div>
          <div className="highlightValue"  >
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.averageHousePrice}</span>
          </div>
        </div>

        <div className="highlightBox">
          <div className="highlightLabel " style={{ backgroundColor: 'rgba(0, 128, 185, 0.1)' }}>
            <span style={{ fontSize: 16 }}>Max House price</span>
          </div>
          <div className="highlightValue">
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.maxHousePrice}</span>
          </div>
        </div>

        <div className="highlightBox">
          <div className="highlightLabel" style={{ backgroundColor: 'rgba(18, 190, 149, 0.1)' }}>
            <span style={{ fontSize: 16 }}>Min House Price</span>
          </div>
          <div className="highlightValue">
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.minHousePrice}</span>
          </div>
        </div>

        <div className="highlightBox">
          <div className="highlightLabel" style={{ backgroundColor: 'rgba(73, 88, 225, 0.1)' }}>
            <span style={{ fontSize: 16 }}>Median Family Income</span>
          </div>
          <div className="highlightValue">
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.medianFamilyIncome}</span>
          </div>
        </div>


      </div>

      <div className="chartHolder">
        <div className="chartContainer">
          {
            citychartData ?
              <div className="chartTile">
                <BedNAvrgPriceBar data={cityHousePriceData} />
              </div> : null
          }

        </div>
        <div className="mapContainer">
          {cityHousePriceData && cityHousePriceData.length > 0 ? (
            <MapComponent selectedCity={cityHousePriceData} />
          ) : null}
        </div>
      </div>

      <div>

        {
          citychartData ?
            <div style={{ backgroundColor: 'white', display: 'flex', flex: 1, marginLeft: 40, marginRight: 40, borderRadius: 20, padding: 20, marginTop: 40 }}>
              <div className="cityBarChart">
                <CityBarChartComponent data={citychartData} />
              </div>
              <div className="pieBox">
                <PieChartComponent data={cityHousePriceData} distributionType={'housePrice'} />
                <PieChartComponent data={cityHousePriceData} distributionType={'bedrooms'} />
              </div>

            </div> : null
        }

      </div>

      <div style={{ backgroundColor: 'white', display: 'flex', flex: 1, marginLeft: 40, marginRight: 40, borderRadius: 20, padding: 20, marginTop: 40 }}>
        {
          averagePrices ?
            <div className="allCityContainer">
              <BarChartComponent cityHousePriceData={cityHousePriceData} averagePrices={averagePrices} />
            </div> : null
        }
        <div className="allCityContainer">
          <BarAllcityPlot data={canadaHousePrice} />
        </div>
      </div>



      <div style={{ backgroundColor: 'white', marginTop: 40, padding: 40, borderRadius: 20 }}>
        <ScatterPlot data={cityHousePriceData} />
      </div>

      {/* <div style={{ backgroundColor: 'white', marginTop: 40, padding: 40, borderRadius: 20 }}>
        <ScatterAllCityPlot data={canadaHousePrice} />
      </div> */}


      {/* <div style={{ backgroundColor: 'white', marginTop: 40, padding: 40, borderRadius: 20 }}>
        <LineAllCityPlot data={canadaHousePrice} />
      </div> */}

    </div>
  );
}

export default App;
