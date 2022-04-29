import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../Navbar.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProfileButton from "../Profile/ProfileButton";
import LogoutButton from "./LogoutButton";

function SubMenuButton({ avatar, setAvatar }) {
  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuth0();
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getUserAvatar();
  }, []);

  const getUserAvatar = async function () {
    const index = user.sub.indexOf("|");
    const userId = user.sub.substring(index + 1).padEnd(24, "0");
    const userInfo = await fetch(`http://localhost:3030/user/${userId}`);
    const userData = await userInfo.json();
    const url = await userData.avatar_url;
    setAvatar(url);
  };

  return (
    <div className="nav-links nav-avatar">
      <Button
        id="dashboardButton"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleProfileClick}
        onClose={handleProfileClose}
      >
        <img src={avatar} alt="Avatar" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={handleProfileClose}
      >
        <ProfileButton />
        <LogoutButton />
      </Menu>
    </div>
  );
}

export default SubMenuButton;
