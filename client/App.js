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
import FindGame from "./FindGame";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState({ id: null, username: "" });
  const [games, setGames] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser({ id: token.userId, username: token.username });
    }
    async function fetchGames() {
      try {
        const { data } = await axios.get("/api/games");
        setGames(data);
        console.log("GAMES: ", data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGames();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Grid container id="app" justifyContent="center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/games" element={<AllGames games={games} setGames={setGames} />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/creategame" element={<CreateGame />} />
          <Route path="/mygames" element={<MyGames /> } />
          <Route path="/findgame" element={<FindGame games={games} setGames={setGames} />} />
        </Routes>
      </Grid>
    </UserContext.Provider>
  );
};

export default App;