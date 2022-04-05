import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import Sell from "./components/Sell/Sell";
import Profile from "./components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <img src="loading.svg" alt="Loading" />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/games" exact element={<Games />} />
            <Route path="/sell" exact element={<Sell />} />
            <Route path="/profile" exact element={<Profile />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
