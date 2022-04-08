import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GameSection from "./GameSection";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import "./Games.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Stack,
  Grid,
} from "@mui/material";
import { cities } from "../Sell/Sell.constant";
import { Box } from "@mui/system";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await fetch("http://localhost:3030/post/getallposts");
      const jsonData = await data.json();
      setGames(jsonData);
    }
    fetchGames();
  }, []);

  const [keyWord, setKeyWord] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(99999);
  const [condition, setCondition] = useState("");
  const [platform, setPlatform] = useState("");
  const [city, setCity] = useState("");

  const clickSearchButton = async () => {
    const filters = {};
    if (keyWord !== "") {
      filters.title = {};
      filters.title["$regex"] = keyWord;
      filters.title["$options"] = "i";
    }
    filters.price = {};
    filters.price["$gte"] = priceFrom;
    filters.price["$lte"] = priceTo;
    if (condition !== "" && condition !== "All") {
      filters.condition = condition;
    }
    if (platform !== "" && platform !== "All") {
      filters.platform = platform;
    }
    if (city !== "" && city !== "All") {
      filters.city = city;
    }

    const data = {};
    data.filters = filters;
    const res = await fetch("http://localhost:3030/post/getpostsbyfilters", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const resJson = await res.json();
    setGames(resJson);
  };

  return (
    <Grid container className="game-page">
      <Grid item md={3} xs={12} id="filter-section">
        <Stack spacing={3} id="filter-stack">
          <TextField
            id="search-games"
            label="Search Games"
            defaultValue=""
            onChange={(e) => setKeyWord(e.target.value)}
          />
          <Accordion id="more-filters">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>More Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Stack spacing={2}>
                  <TextField
                    id="price-from"
                    label="Price From"
                    type="number"
                    defaultValue={0}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                  <TextField
                    id="price-to"
                    label="Price To"
                    type="number"
                    defaultValue={99999}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="select-label-condition">
                      Condition
                    </InputLabel>
                    <Select
                      labelId="select-label-condition"
                      id="condition"
                      label="Condition"
                      defaultValue={"All"}
                      onChange={(e) => setCondition(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
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
                      defaultValue={"All"}
                      onChange={(e) => setPlatform(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="PlayStation 5">PlayStation 5</MenuItem>
                      <MenuItem value="PlayStation 4">PlayStation 4</MenuItem>
                      <MenuItem value="Xbox Series X|S">
                        Xbox Series X|S
                      </MenuItem>
                      <MenuItem value="Xbox One">Xbox One</MenuItem>
                      <MenuItem value="Nintendo Switch">
                        Nintendo Switch
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Autocomplete
                    disablePortal
                    id="city"
                    options={["All", ...cities]}
                    defaultValue={"All"}
                    renderInput={(params) => (
                      <TextField {...params} label="City" />
                    )}
                    onChange={(e) => setCity(e.target.innerText)}
                  />
                </Stack>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            id="search-button"
            onClick={clickSearchButton}
            size="large"
          >
            Search
          </Button>
        </Stack>
      </Grid>
      <Grid item md={9} xs={12} id="games-section">
        <h2 className="game-title">
          <FontAwesomeIcon id="game-icon" icon={faGamepad} /> Games
        </h2>
        <GameSection games={games} />
      </Grid>
    </Grid>
  );
}
