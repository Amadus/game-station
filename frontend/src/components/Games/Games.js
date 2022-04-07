import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GameSection from "./GameSection";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import "./Games.css";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await fetch("http://localhost:3030/post/getallposts");
      const jsonData = await data.json();
      setGames(jsonData);
    }
    fetchGames();
  }, []);

  return (
    <div className="game-page">
      <section>
        <h2 className="game-title">
          <FontAwesomeIcon id="game-icon" icon={faGamepad} /> Games
        </h2>
        <GameSection games={games} />
      </section>
    </div>
  );
}
