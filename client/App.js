import AllGames from "./AllGames";
import CreateGame from "./CreateGame";
import Home from "./Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Grid } from "@mui/material";
import GameDetails from "./GameDetails";
import { UserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import { MyGames } from "./MyGames";
import SignUp from "./SignUp";

const App = () => {
  const [user, setUser] = useState({ id: null, username: "" });
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser({ id: token.userId, username: token.username });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Grid container id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/creategame" element={<CreateGame />} />
          <Route path="/mygames" element={<MyGames /> } />
        </Routes>
      </Grid>
    </UserContext.Provider>
  );
};

export default App;