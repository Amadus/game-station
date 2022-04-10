import React from "react";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Grid, Divider } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useAuth0 } from "@auth0/auth0-react";
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import GameSection from '../Games/GameSection';
import "./Profile.css";

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
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

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

  const getUserAvatar = async function () {
    const index = user.sub.indexOf("|");
    const userId = user.sub.substring(index + 1).padEnd(24, "0");
    const userInfo = await fetch(`http://localhost:3030/user/${userId}`);
    const userData = await userInfo.json();
    console.log(userInfo);
    console.log(userData);
    const url = await userData.avatar_url;
    setAvatar(url);
  };

  useEffect(() => getUserAvatar(), [avatar]);

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gamestation");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drextjznd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);

    const updateData = {};
    const index = user.sub.indexOf("|");
    const userId = user.sub.substring(index + 1).padEnd(24, "0");
    updateData.avatar_url = file.secure_url;
    updateData.user_name = 'knight';
    updateData._id = userId;

    fetch(`http://localhost:3030/user/${userId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateData),
    });

    setLoading(false);

  }



  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ margin: 'auto' }}>
        <Grid item sm={12} md={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img src={avatar} alt="Avatar" />
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
                  <div>
                    <input
                      type="file"
                      name="file"
                      placeholder="Upload an image"
                      onChange={uploadImage}
                    />
                    {loading ? (
                      <h3>loading...</h3>) : (
                      < img src={image} style={{ width: '300px' }} />
                    )}
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} md={10} id="user-items">
          <h2>Your Items</h2>
          <Divider variant="large" />
          <GameSection id="items-list" games={games} />
        </Grid>
      </Grid>

    </Box >

  );
}