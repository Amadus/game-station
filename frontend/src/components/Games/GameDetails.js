import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Divider, Avatar } from "@mui/material";
import dateFormat from "dateformat";
import "./GameDetails.css";
import MapWidget from "../utils/MapWidget";

export default function GameDetails() {
  const gameId = useParams().gameId;
  const [gameData, setGameData] = useState({});
  const [gameUrl, setGameUrl] = useState("");
  const [date, setDate] = useState("");
  const [seller, setSeller] = useState({});

  useEffect(() => {
    async function getGameData() {
      const data = await fetch(
        `http://localhost:3030/post/getpostbyid/${gameId}`
      );
      const game = await data.json();
      setGameData(game);
      setGameUrl(game.picture_urls[0]);
      console.log(game);
      setDate(
        dateFormat(new Date(game.post_date), "dddd, mmmm dS, yyyy, h:MM:ss TT")
      );
      setSeller(game.seller);
    };
    getGameData();
  }, []);

  return (
    <Grid container className="game-details-page">
      <Grid item md={9} xs={12} id="picture-section">
        <div
          id="picture-area-details"
          style={{
            background: `url(${gameUrl}) center center/cover no-repeat`,
          }}
        >
          <div className="blur">
            <img src={gameUrl} alt="game" id="hd-image" />
          </div>
        </div>
      </Grid>
      <Grid item md={3} xs={12} id="details-section">
        <h2>{gameData.title}</h2>
        <p>C${gameData.price}</p>
        <p>Posted in {gameData.city}</p>
        <p className="little-text">{date}</p>
        <br />
        <Divider variant="large" />
        <h3>Details</h3>
        <p>
          <b>Condition:</b> {gameData.condition}
        </p>
        <p>
          <b>Platform:</b> {gameData.platform}
        </p>
        <p className ="postal">
          <b>Postal Code:</b> {gameData.postal_code}
        </p>
        <MapWidget postal_code={gameData.postal_code} />
        <br />
        <Divider variant="large" />
        <h3>Seller Information</h3>
        <Avatar src={seller?.avatar_url} id="seller-avatar" />
        <p id="seller-name">{seller?.user_name}</p>
        <Divider variant="large" />
        <h3>Comments</h3>
      </Grid>
    </Grid>
  );
}
