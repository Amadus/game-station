import React, { useState, useEffect } from "react";
import "./GameCard.css";

export default function GameCard({ infor }) {
  return (
    <>
      <li id="cards" className="cards-item">
        <div className="cards-item-link">
          <div
            className="picture-area"
            style={{
              background: `url(${
                infor.picture_urls[0] ? infor.picture_urls[0] : ""
              }) center center/cover no-repeat`,
            }}
          ></div>
          <div className="cards-item-info">
            <h4>{infor.title}</h4>
            <p className="cards-item-text">{infor.post_date.slice(0, 10)}</p>
            <p className="cards-item-text">
              <b>Postal Code:</b> {infor.postal_code}
            </p>
            <p className="cards-item-text">
              <b>Price:</b> CA${infor.price}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}
