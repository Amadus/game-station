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
          <Link
            to={`/games/${infor._id}`}
            className="picture-link"
            aria-label={infor.title}
          >
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
            <h3>{infor.title}</h3>
            <p className="cards-item-text">{infor.post_date.slice(0, 10)}</p>
            <p className="cards-item-text">
              <b>Postal Code:</b> {infor.postal_code}
            </p>
            <p className="cards-item-text">
              <b>Price:</b> C${infor.price}
            </p>
            <Link to={`/games/${infor._id}`}>
              <Button
                variant="contained"
                className="detail-button"
                style={{ position: "absolute", bottom: "1rem" }}
              >
                Details
              </Button>
            </Link>
          </div>
        </div>
      </li>
    </>
  );
}
