import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotjar,
  faPlaystation,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";
import "./Home.css";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await fetch("http://localhost:3030/post/getallposts");
      const jsonData = await data.json();
      console.log(jsonData);
      setGames(jsonData);
    }
    fetchGames();
  }, []);

  return (
    <div className="home-page">
      <section>
        <h2 className="home-title">
          <FontAwesomeIcon id="hot-icon" icon={faHotjar} /> Today's Picks
        </h2>
      </section>
      <section>
        <h2 className="home-title">
          <FontAwesomeIcon id="ps-icon" icon={faPlaystation} /> PlayStation
        </h2>
      </section>
      <section>
        <h2 className="home-title">
          <FontAwesomeIcon id="xbox-icon" icon={faXbox} /> Xbox
        </h2>
      </section>
      <section>
        <h2 className="home-title">
          <img
            id="switch-icon"
            src="/images/nintendo-switch.png"
            alt="switch"
          /> Nintendo Switch
        </h2>
      </section>
    </div>
  );
}
