import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../Navbar.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProfileButton from "../Profile/ProfileButton";
import LogoutButton from "./LogoutButton";

function SubMenuButton(props) {

  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const { user } = useAuth0();

  return (
    <div className="nav-links" >
      <Button id="dashboardButton"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleProfileClick}
        onClose={handleProfileClose}
      >
        <img src={user.picture} alt="Avatar" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
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
