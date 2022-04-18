import React from "react";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Grid, Divider, Input, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useAuth0 } from "@auth0/auth0-react";
import Typography from '@mui/material/Typography';
import GameSection from '../Games/GameSection';
import "./Profile.css";


export default function Profile() {

    const [games, setGames] = useState([]);
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState('');
    const [hover, setHover] = useState(false);
    const [avatar, setAvatar] = useState('');
    const sellerId = useParams().sellerId;

    useEffect(() => {
        async function getUserPosts() {
            const data = {};
            const filters = {};
            filters.seller = sellerId;
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

        const userInfo = await fetch(`http://localhost:3030/user/${sellerId}`);
        const userData = await userInfo.json();
        const url = await userData.avatar_url;
        setAvatar(url);
        setUserData(userData);
        console.log(userData.user_name);
    };

    useEffect(() => getUserAvatar(), []);

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ margin: 'auto' }}>
                <Grid item xs={12} sm={12} md={2} id='img-box2'>
                    <Grid>
                        <div id='img-box3'>
                            <img src={avatar} alt="avatar" id="selleravatarimage" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm container id='textgrid'>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    <h2>{userData.user_name}</h2>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item sm={12} md={10} id="user-items">
                    <h2>Seller Items</h2>
                    <Divider variant="large" />
                    <GameSection id="items-list" games={games} />
                </Grid>
            </Grid>

        </Box >

    );
}