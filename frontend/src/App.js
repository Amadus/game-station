import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import GameDetails from "./components/Games/GameDetails";
import Sell from "./components/Sell/Sell";
import SellerProfile from "./components/Profile/SellerProfile";
import Profile from "./components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";
import GameEdit from "./components/Sell/GameEdit";

function App() {
  const { isLoading } = useAuth0();
  const [avatar, setAvatar] = useState("");

  return (
    <>
      {isLoading ? (
        <img src="/images/loading.svg" alt="Loading" />
      ) : (
        <>
          <Navbar avatar={avatar} setAvatar={setAvatar} />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/games" exact element={<Games />} />
            <Route path="/sellerprofile/:sellerId" exact element={<SellerProfile />} />
            <Route path="/games/:gameId" exact element={<GameDetails />} />
            <Route path="/gameedit/:gameId" exact element={<GameEdit />} />
            <Route
              path="/sell"
              exact
              element={<ProtectedRoute protectedComponent={Sell} />}
            />
            <Route
              path="/profile"
              exact
              element={<Profile avatar={avatar} setAvatar={setAvatar} />}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
