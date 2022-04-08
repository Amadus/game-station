import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";


export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => {
        loginWithRedirect({ screen_hint: "sign_up" });
      }}
    >
      Login
    </button>
  );
}
