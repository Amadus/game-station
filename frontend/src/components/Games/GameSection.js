import React from "react";
import "./GameSection.css";
import GameCard from "./GameCard";

export default function GameSection(props) {
  return (
    <div className="cards-container">
      <div className="cards-wrapper">
        <ul className="cards-items">
          {props.games.map((item) => (
            <GameCard key={item._id} infor={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
