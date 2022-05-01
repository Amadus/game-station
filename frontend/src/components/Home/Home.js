import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GameSection from "../Games/GameSection";
import {
  faHotjar,
  faPlaystation,
  faXbox,
  faSpotify
} from "@fortawesome/free-brands-svg-icons";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const [picks, setPicks] = useState([]);
  const [psGames, setPsGames] = useState([]);
  const [xboxGames, setXboxGames] = useState([]);
  const [nsGames, setNsGames] = useState([]);
  const [histories, setHistories] = useState([]);

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    async function fetchGames() {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/post/all`);
      const jsonData = await data.json();
      const sellingGames = jsonData.filter((game) => game.status === "Selling");
      setPicks(sellingGames.slice(0, 8));
      setPsGames(
        sellingGames
          .filter((game) => game.platform.includes("PlayStation"))
          .slice(0, 8)
      );
      setXboxGames(
        sellingGames
          .filter((game) => game.platform.includes("Xbox"))
          .slice(0, 8)
      );
      setNsGames(
        sellingGames
          .filter((game) => game.platform.includes("Switch"))
          .slice(0, 8)
      );
    }
    fetchGames();
  }, []);

  useEffect(() => {
    async function checkUser() {
      if (isAuthenticated) {
        const dbUser = {};
        let currentUserId = user.sub.substring(user.sub.indexOf("|") + 1);
        if (currentUserId.length > 24) {
          currentUserId = currentUserId.substring(0, 24);
        } else {
          currentUserId = currentUserId.padEnd(24, "0");
        }
        dbUser._id = currentUserId;
        dbUser.user_name = user.name;
        dbUser.avatar_url = user.picture;
        await fetch(`${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/user`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(dbUser),
        });
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    async function fetchHistories() {
      if (isAuthenticated) {
        let currentUserId = user.sub.substring(user.sub.indexOf("|") + 1);
        if (currentUserId.length > 24) {
          currentUserId = currentUserId.substring(0, 24);
        } else {
          currentUserId = currentUserId.padEnd(24, "0");
        }
        const data = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/history/byuser/${currentUserId}`
        );
        const jsonData = await data.json();
        const posts = jsonData.map((history) => history.post);
        setHistories(posts);
      }
    }
    fetchHistories();
  }, []);

  return (
    <div className="home-page">
      {isAuthenticated && (
        <section>
          <h2 className="home-title">
            <FontAwesomeIcon id="spofity-icon" icon={faSpotify} /> You viewed
          </h2>
          {histories.length === 0 ? (
            <>
              <p>You don't have view history.</p>
              <br />
            </>
          ) : (
            <GameSection games={histories} />
          )}
        </section>
      )}
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
