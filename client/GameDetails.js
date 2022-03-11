import { useState, useEffect } from "react";
import { Grid, Typography, Button, Chip, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateGame from "./CreateGame";

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
        if (editGame === false) setGameDetails(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGameDetails();
  }, [editGame]);

  const deleteGame = async () => {
    try {
      await axios.delete(`/api/games/${id}`);
      navigate("/games");
    } catch (err) {
      console.error(err);
    }
  };

  if (editGame === true)
    return <CreateGame {...gameDetails} editGame setEditGame={setEditGame} />;

  return (
    <Grid container direction="column" id="game-details">
      <Grid container justifyContent="center" item direction="column">
        <Typography variant="h3" textAlign="center">
          {gameDetails.game_name}
        </Typography>
        <Grid container justifyContent="center" id="edit-delete-btn-group">
          <Button
            className="button"
            sx={{ alignSelf: "center" }}
            onClick={() => setEditGame(true)}
          >
            <EditIcon /> Edit Game
          </Button>
          <Button
            className="button"
            sx={{ alignSelf: "center" }}
            onClick={() => deleteGame()}
          >
            <DeleteForeverIcon /> Delete Game
          </Button>
        </Grid>
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

          <Grid container item>
          <Grid
            container
            item
            xs={4}
            alignSelf="flex-start"
            justifyContent="flex-end"
          >
            <Avatar alt="Remy Sharp" sx={{ width: 150, height: 150 }}>
              DM
            </Avatar>
          </Grid>
          <Grid container item xs={8} flexDirection="column" justifyContent="flex-start" alignContent="center">
            <Typography variant="p" align="left">GM: Jane Doe</Typography>
            <Typography variant="p" align="left">
              Game Type: {gameDetails.game_type}
            </Typography>
            <Typography variant="p" align="left">Genre: {gameDetails.genre}</Typography>
            <Typography variant="p" align="left">Players Needed: 3</Typography>
            <Typography variant="p" align="left">Frequency: Weekly</Typography>
            <Grid item container>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
            >
              {gameDetails.tags.map((tag, idx) => {
                return (
                  <Chip key={idx} label={tag.tag_name} size="medium" id="tag" />
                );
              })}
            </Grid>
          </Grid>  
          </Grid>
         
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameDetails;
