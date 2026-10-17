
"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
} from "react-leaflet";

const restaurant = [8.9958, 38.7874];
const courier = [8.9975, 38.7902];
const customer = [8.9918, 38.7935];

export default function DeliveryMap() {
  return (
    <MapContainer
      center={[8.995, 38.790]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={[restaurant, courier, customer]}
        pathOptions={{
          color: "#9e5b24",
          weight: 4,
          opacity: 0.8,
        }}
      />

      <CircleMarker
        center={restaurant}
        radius={9}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#25211f",
          fillOpacity: 1,
        }}
      >
        <Popup>Restaurant: Order preparation point</Popup>
      </CircleMarker>

      <CircleMarker
        center={courier}
        radius={9}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#9e5b24",
          fillOpacity: 1,
        }}
      >
        <Popup>Courier: Sample location</Popup>
      </CircleMarker>

      <CircleMarker
        center={customer}
        radius={9}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#d97706",
          fillOpacity: 1,
        }}
      >
        <Popup>Customer: Sample delivery location</Popup>
      </CircleMarker>
    </MapContainer>
  );
}
