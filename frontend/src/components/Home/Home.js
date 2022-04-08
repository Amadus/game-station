import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GameSection from "../Games/GameSection";
import {
  faHotjar,
  faPlaystation,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";
import "./Home.css";

export default function Home() {
  const [picks, setPicks] = useState([]);
  const [psGames, setPsGames] = useState([]);
  const [xboxGames, setXboxGames] = useState([]);
  const [nsGames, setNsGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await fetch("http://localhost:3030/post/getallposts");
      const jsonData = await data.json();
      console.log(jsonData);
      setPicks(jsonData.slice(0, 8));
      setPsGames(
        jsonData
          .filter((game) => game.platform.includes("PlayStation"))
          .slice(0, 8)
      );
      setXboxGames(
        jsonData.filter((game) => game.platform.includes("Xbox")).slice(0, 8)
      );
      setNsGames(
        jsonData.filter((game) => game.platform.includes("Switch")).slice(0, 8)
      );
    }
    fetchGames();
  }, []);

  return (
    <div className="home-page">
      <section>
        <h2 className="home-title">
          <FontAwesomeIcon id="hot-icon" icon={faHotjar} /> Today's Picks
        </h2>
        <GameSection games={picks} />
      </section>
      <section>
        <h2 className="home-title">
          <FontAwesomeIcon id="ps-icon" icon={faPlaystation} /> PlayStation
        </h2>
        <GameSection games={psGames} />
      </section>
      <section>
        <h2 className="home-title">
          <FontAwesomeIcon id="xbox-icon" icon={faXbox} /> Xbox
        </h2>
        <GameSection games={xboxGames} />
      </section>
      <section>
        <h2 className="home-title">
          <img
            id="switch-icon"
            src="/images/nintendo-switch.png"
            alt="switch"
          />
          Nintendo Switch
        </h2>
        <GameSection games={nsGames} />
      </section>
    </div>
  );
}
