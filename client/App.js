import AllGames from "./AllGames";
import CreateGame from "./CreateGame";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import { Grid } from "@mui/material";
import GameDetails from "./GameDetails";

const App = () => {
  return (
    <>
      <Header />
      <Grid container id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/creategame" element={<CreateGame />} />
        </Routes>
      </Grid>
    </>
  );
};

export default App;
