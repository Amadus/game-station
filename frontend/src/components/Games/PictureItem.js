import React from "react";

export default function PictureItem({ gameData, imageUrl }) {
  return (
    <div
      id="picture-area-details"
      alt={gameData.title}
      style={{
        background: `url(${imageUrl}) center center/cover no-repeat`,
      }}
    >
      <div className="blur">
        <img
          src={imageUrl}
          alt={gameData.title}
          id="hd-image"
        />
      </div>
    </div>
  );
}
