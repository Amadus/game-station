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
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const [picks, setPicks] = useState([]);
  const [psGames, setPsGames] = useState([]);
  const [xboxGames, setXboxGames] = useState([]);
  const [nsGames, setNsGames] = useState([]);

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    async function fetchGames() {
      const data = await fetch("http://localhost:3030/post/getallposts");
      const jsonData = await data.json();
      console.log(jsonData);
      const sellingGames = jsonData.filter((game) => game.status === "Selling");
      setPicks(sellingGames.slice(0, 8));
      setPsGames(
        sellingGames
          .filter((game) => game.platform.includes("PlayStation"))
          .slice(0, 8)
      );
      setXboxGames(
        sellingGames.filter((game) => game.platform.includes("Xbox")).slice(0, 8)
      );
      setNsGames(
        sellingGames.filter((game) => game.platform.includes("Switch")).slice(0, 8)
      );
    }
    fetchGames();
  }, []);

  useEffect(() => {
    async function checkUser() {
      if (isAuthenticated) {
        const dbUser = {};
        dbUser._id = user.sub.substring(user.sub.indexOf("|") + 1).padEnd(24, "0");
        dbUser.user_name = user.name;
        dbUser.avatar_url = user.picture;
        await fetch("http://localhost:3030/user/createuser", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(dbUser)
        });
      }
    };
    checkUser();
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
