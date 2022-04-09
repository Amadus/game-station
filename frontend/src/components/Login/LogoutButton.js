import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from "@auth0/auth0-react";


export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <MenuItem onClick={() => {
      logout({ returnTo: window.location.origin });
    }}
    >Logout</MenuItem>
  )
}
