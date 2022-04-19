import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Grid, Divider, Avatar, Button, Stack } from "@mui/material";
import { DateTime } from "luxon";
import "./GameDetails.css";
import MapWidget from "../utils/MapWidget";
import CommentSection from "./CommentSection";
import { useAuth0 } from "@auth0/auth0-react";
import PictureItem from "./PictureItem";

export default function GameDetails() {
  const gameId = useParams().gameId;
  const [gameData, setGameData] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
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

  useEffect(() => {
    async function updateHistory() {
      if (isAuthenticated) {
        let currentUserId = user.sub.substring(user.sub.indexOf("|") + 1);
        if (currentUserId.length > 24) {
          currentUserId = currentUserId.substring(0, 24);
        } else {
          currentUserId = currentUserId.padEnd(24, "0");
        }
        const history = {};
        history.user = currentUserId;
        history.post = gameId;
        await fetch("http://localhost:3030/history", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(history),
        });
      }
    }
    updateHistory();
  }, []);

  const getGameData = async function () {
    const data = await fetch(`http://localhost:3030/post/${gameId}`);
    const game = await data.json();
    setGameData(game);
    setImageUrls(game.picture_urls);
    setDate(DateTime.fromISO(game.post_date).toRelative());
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
      <Grid item md={8} xs={12} id="picture-section">
        <Carousel
          indicators={false}
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          cycleNavigation={false}
        >
          {imageUrls.map((imageUrl, i) => (
            <PictureItem key={i} imageUrl={imageUrl} gameData={gameData} />
          ))}
        </Carousel>
      </Grid>
      <Grid item md={4} xs={12} id="details-section">
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
        <Link to={`/sellerprofile/${seller._id}`}>
          <Avatar
            src={seller?.avatar_url}
            alt={seller?.user_name}
            id="seller-avatar"
          />
          <p id="seller-name">{seller?.user_name}</p>
        </Link>
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
