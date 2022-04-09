import React from "react";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAuth0 } from "@auth0/auth0-react";
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import GameSection from '../Games/GameSection'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});


export default function Profile() {

  const { user } = useAuth0();
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getUserPosts() {
      const data = {};
      const filters = {};
      const index = user.sub.indexOf("|");
      const seller = user.sub.substring(index + 1).padEnd(24, "0");
      filters.seller = seller;
      data.filters = filters;

      const res = await fetch("http://localhost:3030/post/getpostsbyfilters", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      setGames(resJson);
    }

    getUserPosts();
  }, []);



  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ margin: 'auto' }}>
        <Grid item sm={12} md={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img src={user.picture} alt="Avatar" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <div>{JSON.parse(JSON.stringify(user.nickname))}</div>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <div>{JSON.parse(JSON.stringify(user.email))}</div>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} md={10}>
          Your Items
          <GameSection games={games} />
        </Grid>
      </Grid>

    </Box >

  );
}