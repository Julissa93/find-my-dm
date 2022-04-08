import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button, Chip, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateGame from "./CreateGame";
import { UserContext } from "./UserContext";

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({
    imageUrl: "",
    game_name: "",
    game_type: "",
    genre: "",
    tags: [],
    description: "",
  });
  const [gameAdmin, setGameAdmin] = useState({});
  const [editGame, setEditGame] = useState(false);
  const { user } = useContext(UserContext);
  console.log("curent user = ", user);
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const { data : gameDetails } = await axios.get(`/api/games/${id}`);
        const { data : adminDetails } = await axios.get(`/api/games/${id}/admin`);
        console.log("game details from server = ", gameDetails);
        console.log("data.admin", adminDetails);
        if (editGame === false) {
          setGameDetails(gameDetails);
          setGameAdmin(adminDetails);
        }
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
        {/* if the current user logged in is the admin of the game then display edit/delete buttons */}
        {user && gameAdmin && user.id === gameAdmin.player_id ? (
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
        ) : (
          <></>
        )}
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
            <Grid
              container
              item
              xs={8}
              flexDirection="column"
              justifyContent="flex-start"
              alignContent="center"
            >
              <Typography variant="p" align="left">
                GM: {gameAdmin.username}
              </Typography>
              <Typography variant="p" align="left">
                Game Type: {gameDetails.game_type}
              </Typography>
              <Typography variant="p" align="left">
                Genre: {gameDetails.genre}
              </Typography>
              <Typography variant="p" align="left">
                Players Needed: 3
              </Typography>
              <Typography variant="p" align="left">
                Frequency: Weekly
              </Typography>
              <Grid item container>
                <Grid container direction="row" justifyContent="space-evenly">
                  {gameDetails.tags.map((tag, idx) => {
                    return (
                      <Chip
                        key={idx}
                        label={tag.tag_name}
                        size="medium"
                        id="tag"
                      />
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
