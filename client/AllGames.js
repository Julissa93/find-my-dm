import { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import SingleGame from "./SingleGame";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  useEffect(() => {
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
    <Grid item container direction="row" justifyContent="center" id="games">
      <Grid item xs={12} >
      {user.username ? <h3>Hello, {user.username}</h3> : <></> }
      </Grid>
      {games.map((game, idx) => (
        <SingleGame key={idx} game={game}/>
      ))}
    </Grid>
  );
};

export default AllGames;
