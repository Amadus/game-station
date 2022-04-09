import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from '@mui/material/MenuItem';



export default function ProfileButton() {
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
        <MenuItem onClick={handleProfileClose} onClose={handleProfileClose} >
            <Link className="dashboardElements"
                to="/profile"
            >
                Profile
            </Link>
        </MenuItem>
    )
}
