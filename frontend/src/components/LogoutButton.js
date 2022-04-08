import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function LogoutButton(props) {

  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-links" >
      <Button id="dashboardButton"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleProfileClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleProfileClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfileClose} >
          <Link className="dashboardElements"
            to="/profile"
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
        >Logout</MenuItem>
      </Menu>
    </div>

  );
}

export default LogoutButton;
