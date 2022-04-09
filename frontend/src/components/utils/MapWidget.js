import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

export default function MapWidget(props) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const zoom = 11;

  useEffect(() => {
    async function getPositionByPostalCode() {
      const postal_code = props.postal_code;
      if (postal_code) {
        const postal_code_clean = postal_code.replace(/\s/g, "");
        const url =
          "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" +
          postal_code_clean +
          "&key=AIzaSyACJI9eXF36yCDaHrIeDiVeGjaY0zPRKmg";
        const result = await fetch(url);
        const json = await result.json();
        setLat(json.results[0].geometry.location.lat);
        setLng(json.results[0].geometry.location.lng);
      }
    }
    getPositionByPostalCode();
  }, [props]);

  return (
    <div style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyACJI9eXF36yCDaHrIeDiVeGjaY0zPRKmg" }}
        center={{ lat: lat, lng: lng }}
        zoom={zoom}
      >
        <MapMarker lat={lat} lng={lng} name="My Marker" color="red" />
      </GoogleMapReact>
    </div>
  );
}
