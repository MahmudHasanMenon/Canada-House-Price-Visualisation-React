import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css';

import { mapData } from '../Charts/MapData'

const mapIcon = new Icon({
  iconUrl: "/house_icon.svg",
  iconSize: [20, 20],
});

const MapComponent = ({ selectedCityPriceData }) => {
  const [position, setPosition] = useState([53.5344, -113.45326])
  const [activePark, setActivePark] = useState(null);
  // [53.526822, -113.4909855]

  useEffect(() => {
    console.log('mapData', selectedCityPriceData)
    setPosition([selectedCityPriceData[0].Latitude, selectedCityPriceData[0].Longitude])
    console.log('position', [selectedCityPriceData[0].Latitude, selectedCityPriceData[0].Longitude])
  }, [selectedCityPriceData]);

  return (

    <MapContainer center={[selectedCityPriceData[0].Latitude, selectedCityPriceData[0].Longitude]} zoom={10} style={{ height: '350px', width: '96%', marginLeft: 20, marginRight: 0 }}>
      <TileLayer
        attribution="" // Empty attribution to hide the marketing text
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedCityPriceData.map(data => (
        <Marker
          key={data?.row_id}
          position={[
            data?.Latitude,
            data?.Longitude
          ]}
          onClick={() => {
            setActivePark(data);
          }}
          icon={mapIcon}
        >
          <Popup>
            <strong>{data.City}</strong><br />
            House Price: ${data.Price}<br />
            Address: {data.Address}<br />
            Beds: {data.Number_Beds}<br />
            Baths: {data.Number_Baths}
          </Popup>

        </Marker>
      ))}

    </MapContainer>

  );
};

export default MapComponent;