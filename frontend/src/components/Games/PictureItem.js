import React, { useState, useEffect } from "react";

export default function PictureItem({ gameData, imageUrl }) {
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    if (gameData.status === "Sold") {
      setIsSold(true);
    } else {
      setIsSold(false);
    }
  }, [gameData]);

  return (
    <div className="picture-item">
      <div
        id="picture-area-details"
        alt={gameData.title}
        style={{
          background: `url(${imageUrl}) center center/cover no-repeat`,
        }}
      >
        <div className="blur">
          <img src={imageUrl} alt={gameData.title} id="hd-image" />
        </div>
      </div>
      {isSold && (
        <div
          className="soldout-details"
          style={{
            background: `url(/images/sold-out.png) center center/cover no-repeat`,
          }}
        ></div>
      )}
    </div>
  );
}
