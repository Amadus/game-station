import React, { useState, useEffect } from "react";
import "./Sell.css";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Input } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { cities } from "./Sell.constant";

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
  const [image, setImage] = useState("");

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
    setImage(game.picture_urls[0]);
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
      console.log(gameData);
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

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gamestationca");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/gamestationca/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    let urls = [];
    urls.push(file.secure_url);
    setPicture_urls(urls);
  };

  return (
    <div className="sell-container">
      <div className="suf-box-log">
        <section className="suf-subscription">
          <div className="input-areas">
            <form>
              <Stack spacing={3} id="sell-stack">
                <label htmlFor="icon-button-file1" id="image-box-1">
                  <Input
                    accept="image/*"
                    id="icon-button-file1"
                    type="file"
                    onChange={uploadImage}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    id="icon-button-1"
                  >
                    {!image ? (
                      <PhotoCamera id="image-icon-1" />
                    ) : (
                      <img src={image} alt="image" id="image-1" />
                    )}
                  </IconButton>
                </label>
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
