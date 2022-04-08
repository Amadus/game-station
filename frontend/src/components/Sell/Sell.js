import React, { useState } from "react";
import "./Sell.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { cities } from "./Sell.constant";

export default function Sell() {
  const { user } = useAuth0();
  const seller = user.sub.substring(user.sub.indexOf("|") + 1).padEnd(24, "0");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [picture_urls, setPicture_urls] = useState([]);
  const [condition, setCondition] = useState("");
  const [platform, setPlatform] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [description, setDescription] = useState("");

  const clickSubmit = (e) => {
    if (
      title === "" ||
      // picture_urls === [] ||
      condition === "" ||
      platform === "" ||
      city === "" ||
      postal_code === ""
    ) {
      alert("Please complete the form!");
    } else {
      const post = {};
      post.title = title;
      post.price = price;
      post.picture_urls = picture_urls;
      post.condition = condition;
      post.platform = platform;
      post.city = city;
      post.postal_code = postal_code;
      post.description = description;
      post.status = "Selling";
      post.seller = seller;

      fetch("http://localhost:3030/post/createpost", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(post),
      })
        .then((res) => res.text())
        .then((text) => console.log(text))
        .then(alert("You have succuessfully submit your request!"))
        .then(navigate("/"));
    }
  };

  return (
    <div className="log-container">
      <div className="suf-box-log">
        <section className="suf-subscription">
          <div className="input-areas">
            <Stack spacing={2}>
              <TextField
                required
                id="title"
                label="Title"
                defaultValue=""
                onBlur={(e) => setTitle(e.target.value)}
              />
              <TextField
                required
                id="price"
                label="Price"
                type="number"
                onBlur={(e) => setPrice(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="select-label-condition">Condition</InputLabel>
                <Select
                  labelId="select-label-condition"
                  id="condition"
                  label="Condition"
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
                renderInput={(params) => <TextField {...params} label="City" />}
                onChange={(e) => setCity(e.target.innerText)}
              />
              <TextField
                required
                id="postcal_code"
                label="Postal Code"
                onBlur={(e) => setPostal_code(e.target.value)}
              />
              <TextField
                id="description"
                label="Description"
                multiline
                maxRows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button variant="contained" onClick={clickSubmit}>
                Create Post
              </Button>
            </Stack>
          </div>
        </section>
      </div>
    </div>
  );
}
