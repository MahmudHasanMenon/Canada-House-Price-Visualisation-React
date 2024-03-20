import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Select from "react-select";
import BarChartComponent from "./component/Charts/BarComponent";
import CityBarChartComponent from "./component/Charts/CityPriceIncomeBarComponent";
import PieChartComponent from "./component/Charts/PieComponent";
import LineChartComponent from "./component/Charts/LineComponent";
import ScatterPlot from "./component/Charts/ScatterPlot";
import BedNAvrgPriceBar from "./component/Charts/BedNAvrgPriceBar";
import ScatterAllCityPlot from "./component/Charts/ScatterAllCity";
import BarAllcityPlot from "./component/Charts/BarAllcityPlot";
import LineAllCityPlot from "./component/Charts/LineAllCityPlot";
import MapComponent from "./component/StreetMap/Map";
import { canadaHousePrice } from "../src/utils/caCityHouse";
import { cityData } from "../src/utils/cityData";
import { getAllCityAvrgPriceDatasets, calculateCityStatistics } from "../src/utils/plotHelperFunction"

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [cityHousePriceData, setCityHousePriceData] = useState([]);
  const [averagePrices, setAveragePrices] = useState(null)
  const [cityStatistic, setCityStatistic] = useState(null)
  const [cities, setCities] = useState([cityData]);
  const [citiesInfo, setCitiesInfo] = useState([canadaHousePrice]);
  const [citychartData, setCityChartData] = useState(null);
  const [selectedCity, setSelectedCity] = useState({
    value: "Edmonton",
    label: "Edmonton"
  },);


  useEffect(() => {
    // console.log("cityData", cityData);
    // console.log("canadaHousePrice", canadaHousePrice)
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "https://apigenerator.dronahq.com/api/6SmkZiQG/caCityInfo"
    fetch(url)
      .then((response) => {
        if (response) {
          const data = response.json();
          if (data && data.length > 0) {
            setCitiesInfo(data)
            getCitiesInfo(data)
          }
          else {
            setCitiesInfo(canadaHousePrice)
            getCitiesInfo(canadaHousePrice)
          }

        }
        else {
          setCitiesInfo(canadaHousePrice)
          getCitiesInfo(canadaHousePrice)
        }

      }
      )
  }

  const getCitiesInfo = (data) => {
    const cityFilterData = data.filter(
      (item, index) => item.City === "Edmonton"
    );
    setCityHousePriceData(cityFilterData);
    prepareAllCitiesAvrgPrice()
    setCityStatistic(calculateCityStatistics(data, 'Edmonton'))
    prepareCityStatistic('Edmonton')
  }

  const prepareCityStatistic = (selectedCity) => {
    if (citiesInfo && selectedCity) {
      const selectedCityData = citiesInfo.filter(location => location.City === selectedCity);

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
      const averagePrices = getAllCityAvrgPriceDatasets(citiesInfo)
      setAveragePrices(averagePrices)
    }
  }

  const setCity = (item) => {
    if (item && item.value) {
      setSelectedCity(item)
      const cityFilterData = citiesInfo.filter(
        (data, index) => data.City === item.value
      );
      setCityHousePriceData(cityFilterData);
      setCityStatistic(calculateCityStatistics(citiesInfo, item.value))
      prepareCityStatistic(item.value)
    }
  }

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchInput(query);
    const cityFilterData = citiesInfo.filter(city =>
      city.City.toLowerCase().includes(query)
    );

    setCityHousePriceData(cityFilterData);
    let findCity = cityData.find(city => city.value.toLowerCase().includes(query))
    if (findCity) {
      setSelectedCity(findCity)
      setCityStatistic(calculateCityStatistics(citiesInfo, findCity.value))
      prepareCityStatistic(findCity.value)
    }


    // const filtered = citiesData.filter(city => city.name.toLowerCase().includes(query));
    // setFilteredCities(filtered);
  };

  const handleSearchButton = () => {
    if (searchInput) {
      const cityFilterData = citiesInfo.filter(city =>
        city.City.toLowerCase().includes(searchInput)
      );

      setCityHousePriceData(cityFilterData);
      let findCity = cityData.find(city => city.value.toLowerCase().includes(searchInput))

      if (findCity) {
        setSelectedCity(findCity)
        setCityStatistic(calculateCityStatistics(citiesInfo, findCity.value))
        prepareCityStatistic(findCity.value)
      }
    }
  }

  return (
    <div className="body">

      <div className="searchBarContainer">
        <div style={{ display: 'flex', flex: 0.5, alignItems: 'center' }}>
          <h3 className="headerText">Canadian Top City House Prices</h3>
          <img
            style={{ height: 30, weight: 30, marginLeft: 6, marginTop: -10 }}
            src="/house_icon.svg"
            alt="c-tribe"
          />
        </div>
        <div className="search-container" style={{ display: 'flex', flexDirection: 'row', background: "#FFFFFF", flex: 0.8, borderRadius: 10, alignItems: 'center', marginRight: 100, paddingLeft: 20 }}>
          <button onClick={() => handleSearchButton()} type="submit"><i class="fa fa-search"></i></button>
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
          <h1 style={{ fontSize: 16, marginBottom: -8, textAlign: 'center', color: 'white' }}>
            Select your city
          </h1>
          <div style={{ marginTop: 10 }}>
            <Select
              options={cityData}
              style={{}}
              value={selectedCity}
              onChange={(selectedOption) =>
                setCity(selectedOption)
              }
            />
          </div>

        </div>
      </div>
      <h1 style={{ color: "#1C1C1C", fontSize: 24, textAlign: 'center', fontWeight: 'normal' }}>
        <span style={{ color: "rgba(255, 99, 132, 0.7)", fontWeight: 'bold', fontSize: 30, marginRight: 2 }}>{selectedCity && selectedCity.value}</span> House Price Survey
      </h1>
      <div className="highlightContainer">

        <div className="highlightBox">
          <div className="highlightLabel " style={{ backgroundColor: 'rgba(36, 53, 204, 0.1)' }}>
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>Average House Price</span>
          </div>
          <div className="highlightValue"  >
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.averageHousePrice}</span>
          </div>
        </div>

        <div className="highlightBox">
          <div className="highlightLabel " style={{ backgroundColor: 'rgba(0, 128, 185, 0.1)' }}>
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>Max House price</span>
          </div>
          <div className="highlightValue">
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.maxHousePrice}</span>
          </div>
        </div>

        <div className="highlightBox">
          <div className="highlightLabel" style={{ backgroundColor: 'rgba(18, 190, 149, 0.1)' }}>
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>Min House Price</span>
          </div>
          <div className="highlightValue">
            <span style={{ fontSize: 16, textAlign: 'center' }}>${cityStatistic && cityStatistic.minHousePrice}</span>
          </div>
        </div>

        <div className="highlightBox">
          <div className="highlightLabel" style={{ backgroundColor: 'rgba(73, 88, 225, 0.1)' }}>
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>Median Family Income</span>
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
                <BedNAvrgPriceBar data={cityHousePriceData} selectedCity={selectedCity} />
              </div> : null
          }

        </div>
        <div className="mapContainer">
          <h3 style={{ textAlign: 'center' }}>Explore House Prices in Canada's Top Cities</h3>
          {cityHousePriceData && cityHousePriceData.length > 0 ? (
            <MapComponent selectedCityPriceData={cityHousePriceData} />
          ) : null}
        </div>
      </div>

      <div>

        {
          citychartData ?
            <div style={{ backgroundColor: 'white', display: 'flex', flex: 1, marginLeft: 40, marginRight: 40, borderRadius: 20, padding: 20, marginTop: 40 }}>
              <div className="cityBarChart">
                <CityBarChartComponent data={citychartData} selectedCity={selectedCity} />
              </div>
              <div className="pieBox">
                <PieChartComponent data={cityHousePriceData} distributionType={'housePrice'} />
                <PieChartComponent data={cityHousePriceData} distributionType={'bedrooms'} />
              </div>

            </div> : null
        }

      </div>


      <div className="allCityComparison">
        <h1 style={{ color: "#1C1C1C", fontSize: 28, textAlign: 'center', fontWeight: 'normal', paddingTop: 40 }}>
          <span style={{ color: "rgba(75, 192, 192, 1)", fontWeight: 'bold', fontSize: 34, marginRight: 2 }}>All Top Cities</span> House Price Comparison
        </h1>
        <div style={{ backgroundColor: 'white', display: 'flex', flex: 1, marginLeft: 40, marginRight: 40, borderRadius: 20, padding: 20, marginTop: 40 }}>
          {
            averagePrices ?
              <div className="allCityContainer" style={{ paddingBottom: 50 }}>
                <BarChartComponent cityHousePriceData={cityHousePriceData} averagePrices={averagePrices} selectedCity={selectedCity} />
              </div> : null
          }
          <div className="allCityContainer">
            <BarAllcityPlot data={citiesInfo} />
          </div>
        </div>

        {/* <div style={{ backgroundColor: 'white', marginTop: 40, marginLeft: 40, marginRight: 40, borderRadius: 20, }}>
          <ScatterPlot data={citiesInfo} />
        </div> */}

      </div>

    </div>
  );
}

export default App;
