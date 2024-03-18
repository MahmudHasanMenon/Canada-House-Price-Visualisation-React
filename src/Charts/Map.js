import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

import { mapData } from './MapData'

const mapIcon = new Icon({
  iconUrl: "/map_marker_icon.svg",
  iconSize: [25, 25],
});

const MapComponent = ({ selectedCity }) => {
  const [position, setPosition] = useState([53.5344, -113.45326])
  const [activePark, setActivePark] = useState(null);
  // [53.526822, -113.4909855]

  useEffect(() => {
    console.log('mapData', selectedCity)
    setPosition([selectedCity[0].Latitude, selectedCity[0].Longitude])
    console.log('position', [selectedCity[0].Latitude, selectedCity[0].Longitude])
  }, [selectedCity]);

  return (

    <MapContainer center={[selectedCity[0].Latitude, selectedCity[0].Longitude]} zoom={10} style={{ height: '410px', width: '98%', marginLeft: 10 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedCity.map(data => (
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
          {/* <Popup>
          {data.Address}  
        </Popup> */}
        </Marker>
      ))}
      {/* <Marker position={position} icon={ iconPerson }>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>

  );
};

export default MapComponent;