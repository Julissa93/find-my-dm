import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGames() {
      try {
        const { data } = await axios.get("/api/games");
        setGames(data);
        console.log('GAMES: ', data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGames();
  }, []);

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      id="games"
    >
      {games.map((game, idx) => (
        <Grid item key={idx} xs={12} md={6} lg={4} id="card">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={game.imageUrl}
                alt="game image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                  {game.game_name}
                </Typography>
                <Typography variant="body2" component="p" color="text.secondary" id="description">
                  {game.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" onClick={() => navigate(`/games/${game.id}`)}>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllGames;
