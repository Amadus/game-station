import React from "react";
import "./MapMarker.css";

export default function MapMarker(props) {
  const { color, name } = props;
  return (
    <div
      className="marker"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
}
