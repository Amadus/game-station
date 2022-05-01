import React, { useState, useEffect } from "react";
import "./Sell.css";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { cities } from "./Sell.constant";
import ImagesUpload from "./ImagesUpload";

export default function GameEdit() {
  const gameId = useParams().gameId;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [picture_urls, setPicture_urls] = useState([]);
  const [condition, setCondition] = useState("");
  const [platform, setPlatform] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [description, setDescription] = useState("");

  const [gameData, setGameData] = useState({});

  const getGameData = async function () {
    const data = await fetch(`http://localhost:3030/post/${gameId}`);
    const game = await data.json();
    setGameData(game);
    setTitle(game.title);
    setPrice(game.price);
    setPicture_urls(game.picture_urls);
    setCondition(game.condition);
    setPlatform(game.platform);
    setCity(game.city);
    setPostal_code(game.postal_code);
    setDescription(game.description);
  };

  useEffect(() => {
    getGameData();
  }, []);

  const clickSubmit = async () => {
    if (
      title === "" ||
      picture_urls.length === 0 ||
      condition === "" ||
      platform === "" ||
      city === "" ||
      postal_code === ""
    ) {
      alert("Please complete the form!");
    } else {
      gameData.title = title;
      gameData.price = price;
      gameData.picture_urls = picture_urls;
      gameData.condition = condition;
      gameData.platform = platform;
      gameData.city = city;
      gameData.postal_code = postal_code;
      gameData.description = description;
      gameData.seller = gameData.seller._id;

      await fetch(`http://localhost:3030/post/${gameData._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(gameData),
      });
      navigate(`/games/${gameData._id}`);
    }
  };

  return (
    <div className="sell-container">
      <div className="suf-box-log">
        <section className="suf-subscription">
          <div className="input-areas">
            <form>
              <Stack spacing={3} id="sell-stack">
                <ImagesUpload
                  picture_urls={picture_urls}
                  setPicture_urls={setPicture_urls}
                />
                <TextField
                  required
                  id="title"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  required
                  id="price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="select-label-condition">Condition</InputLabel>
                  <Select
                    labelId="select-label-condition"
                    id="condition"
                    label="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <MenuItem value="Used">Used</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="select-label-platform">Platform</InputLabel>
                  <Select
                    labelId="select-label-platform"
                    id="platform"
                    label="Platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <MenuItem value="PlayStation 5">PlayStation 5</MenuItem>
                    <MenuItem value="PlayStation 4">PlayStation 4</MenuItem>
                    <MenuItem value="Xbox Series X|S">Xbox Series X|S</MenuItem>
                    <MenuItem value="Xbox One">Xbox One</MenuItem>
                    <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
                  </Select>
                </FormControl>
                <Autocomplete
                  disablePortal
                  id="city"
                  options={cities}
                  value={city}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                  onChange={(e) => setCity(e.target.innerText)}
                />
                <TextField
                  required
                  id="postcal_code"
                  value={postal_code}
                  label="Postal Code"
                  onChange={(e) => setPostal_code(e.target.value)}
                />
                <TextField
                  id="description"
                  label="Description"
                  value={description}
                  multiline
                  maxRows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    fullwidth
                    variant="contained"
                    onClick={clickSubmit}
                    size="large"
                    id="submit-button"
                  >
                    Edit Post
                  </Button>
                  <Button
                    fullwidth
                    variant="contained"
                    onClick={() => navigate(`/games/${gameData._id}`)}
                    size="large"
                    id="cancel-button"
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
