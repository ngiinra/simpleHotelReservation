import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import useUserLocation from "../customHooks/useUserLocation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import useUrlLocation from "../customHooks/useUrlLocation";

function Map({ markers }) {
  const [mapCenter, setMapCenter] = useState([
    52.36795586072917, 4.874447396294998,
  ]);
  const {
    userLocation,
    setUserPosition,
    isLoading: userLocationLoading,
    error: userLocationError,
  } = useUserLocation();
  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    if (lng && lat) {
      setMapCenter([lat, lng]);
    }
  }, [lng, lat]);

  // update location if user location had set
  useEffect(() => {
    if (userLocationError !== "") toast.error(userLocationError);
    else if (
      userLocation.length === 2 &&
      userLocation[0] !== null &&
      userLocation[1] !== null
    )
      setMapCenter(userLocation);
  }, [userLocation, userLocationError]);

  useEffect(() => {
    if (markers?.length === 1)
      setMapCenter([markers[0]?.latitude, markers[0]?.longitude]);
  }, [markers]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button
        className="z-1003 bg-green-800 text-white text-sm absolute bottom-0 m-5 py-2 px-5 rounded-md border-stone-300 hover:bg-green-600"
        onClick={setUserPosition}
      >
        {userLocationLoading ? "Loading ..." : "find your nearby hotels"}
      </button>

      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markers?.map((hotel) => {
          return (
            <Marker
              key={hotel?.id}
              position={[hotel?.latitude, hotel?.longitude]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>{hotel?.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
export default Map;
