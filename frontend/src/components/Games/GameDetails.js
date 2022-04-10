import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Divider, Avatar, Button, Stack } from "@mui/material";
import dateFormat from "dateformat";
import "./GameDetails.css";
import MapWidget from "../utils/MapWidget";
import CommentSection from "./CommentSection";
import { useAuth0 } from "@auth0/auth0-react";

export default function GameDetails() {
  const gameId = useParams().gameId;
  const [gameData, setGameData] = useState({});
  const [gameUrl, setGameUrl] = useState("");
  const [date, setDate] = useState("");
  const [seller, setSeller] = useState({});

  const { user, isAuthenticated } = useAuth0();
  let currentUserId = "";
  if (isAuthenticated) {
    currentUserId = user.sub.substring(user.sub.indexOf("|") + 1);
    if (currentUserId.length > 24) {
      currentUserId = currentUserId.substring(0, 24);
    } else {
      currentUserId = currentUserId.padEnd(24, "0");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    getGameData();
  }, []);

  const getGameData = async function () {
    const data = await fetch(`http://localhost:3030/post/${gameId}`);
    const game = await data.json();
    setGameData(game);
    setGameUrl(game.picture_urls[0]);
    setDate(
      dateFormat(new Date(game.post_date), "dddd, mmmm dS, yyyy, h:MM:ss TT")
    );
    setSeller(game.seller);
  };

  const markStatus = async function (status) {
    gameData.status = status;
    gameData.seller = gameData.seller._id;
    await fetch(`http://localhost:3030/post/${gameData._id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(gameData),
    });
    getGameData();
  };

  const handleDelete = async function () {
    await fetch(`http://localhost:3030/post/${gameData._id}`, {
      method: "DELETE",
    });
    navigate("/profile");
  };

  const handleEdit = function () {
    navigate(`/gameedit/${gameData._id}`);
  };

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
        {gameData && gameData.seller && currentUserId === gameData.seller._id && (
          <>
            <Stack direction="row" spacing={1}>
              {gameData.status === "Selling" ? (
                <Button variant="contained" onClick={() => markStatus("Sold")}>
                  Mark Sold
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => markStatus("Selling")}
                >
                  Mark Selling
                </Button>
              )}
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
            <br />
          </>
        )}
        <Divider variant="large" />
        <h3>Details</h3>
        <p>
          <b>Condition:</b> {gameData.condition}
        </p>
        <p>
          <b>Platform:</b> {gameData.platform}
        </p>
        <p className="postal">
          <b>Postal Code:</b> {gameData.postal_code}
        </p>
        <MapWidget postal_code={gameData.postal_code} />
        <br />
        <Divider variant="large" />
        <h3>Seller Information</h3>
        <Avatar src={seller?.avatar_url} id="seller-avatar" />
        <p id="seller-name">{seller?.user_name}</p>
        <Divider variant="large" />
        <h3>Description</h3>
        {gameData.description ? (
          <p>{gameData.description}</p>
        ) : (
          <p>There is no description for this game.</p>
        )}
        <br />
        <Divider variant="large" />
        <h3>Comments</h3>
        <CommentSection gameData={gameData} seller={seller} />
      </Grid>
    </Grid>
  );
}
