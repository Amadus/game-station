import React, { useState, useEffect } from "react";
import "./GameCard.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function GameCard({ infor }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <li id="cards" className="cards-item">
        <div className="cards-item-link">
          <Link to={`/games/${infor._id}`} id="picture-link">
            <div
              id="picture-area"
              style={{
                background: `url(${
                  infor.picture_urls[0] ? infor.picture_urls[0] : ""
                }) center center/cover no-repeat`,
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {isHover && <p>DETAILS</p>}
            </div>
          </Link>
          <div className="cards-item-info">
            <h4>{infor.title}</h4>
            <p className="cards-item-text">{infor.post_date.slice(0, 10)}</p>
            <p className="cards-item-text">
              <b>Postal Code:</b> {infor.postal_code}
            </p>
            <p className="cards-item-text">
              <b>Price:</b> C${infor.price}
            </p>
            <Link to={`/games/${infor._id}`}>
              <Button variant="contained" id="detail-button">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </li>
    </>
  );
}
