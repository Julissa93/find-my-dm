import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateGame from './CreateGame';

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({
    imageUrl: "",
    game_name: "",
    game_type: "",
    genre: "",
    tags: [],
    description: "",
  });
  const [editGame, setEditGame] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const { data } = await axios.get(`/api/games/${id}`);
        setGameDetails(data);
        console.log("data: ", data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGameDetails();
  }, []);

  const deleteGame = async () => {
    try {
      await axios.delete(`/api/games/${id}`);
      navigate("/games");
    } catch(err) {
      console.error(err);
    }
  };

  if(editGame === true)
    return(<CreateGame {...gameDetails} editGame />)

  return (
    <Grid container direction="column" id="game-details">
      <Grid container justifyContent="center" item direction="row">
        <Typography variant="h3" textAlign="center">
          {gameDetails.game_name}
        </Typography>
        <Button className="button" sx={{alignSelf: "center"}} onClick={() => setEditGame(true)}>
        <EditIcon /> Edit Game 
        </Button>
        <Button className="button" sx={{alignSelf: "center"}} onClick={() => deleteGame()}>
        <DeleteForeverIcon /> Delete Game 
        </Button>
      </Grid>

      <Grid
        item
        container
        justifyContent="center"
        flexDirection="row"
        sx={{ width: "auto", whiteSpace: "normal" }}
      >
        <Grid item xs={12} md={4} textAlign="center">
          <img src={gameDetails.imageUrl} id="game-image" />
        </Grid>
        <Grid item xs={12} md={4} alignSelf="center" id="game-description">
          <Typography xs={10} component="p" paragraph={true}>
            {gameDetails.description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center" textAlign="center">
          <Typography variant="h6" textAlign="center">
            Campaign Details
          </Typography>
          <Typography component="p">GM: Jane Doe</Typography>
          <Typography component="p">
            Game Type: {gameDetails.game_type}
          </Typography>
          <Typography component="p">Genre: {gameDetails.genre}</Typography>
          <Typography component="p">Players Needed: 3</Typography>
          <Typography component="p">Frequency: Weekly</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameDetails;
