"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({ listings }: any) {
  return (
    <MapContainer
      key="nestly-map"          // ← stable key prevents remount
      center={[43.7, -79.4]}
      zoom={11}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {listings.map((item: any) => (
        <Marker key={item.id} position={[item.lat, item.lng]}>
          <Popup>
            <b>{item.title}</b>
            <div>${item.price}/mo</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}