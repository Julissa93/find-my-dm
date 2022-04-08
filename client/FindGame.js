import { useState } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Checkbox,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import SingleGame from "./SingleGame";
import axios from "axios";

const FindGame = (props) => {
  const [gameDetails, setGameDetails] = useState({
    gameName: "",
    tags: [],
    newPlayersWelcome: false,
    freeToPlay: false,
  });

  const [games, setGames] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");

  const handleChange = (evt) => {
    //console.log("evt target name = ", evt.target.name)
    //console.log("evt target value", evt.target.checked);
    if (evt.target.hasOwnProperty("checked")) {
      setGameDetails({ ...gameDetails, [evt.target.name]: evt.target.checked });
    } else {
      setGameDetails({ ...gameDetails, [evt.target.name]: evt.target.value });
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { gameName, tags, newPlayersWelcome, freeToPlay } = gameDetails;
    console.log("submitted! gameDetails = ", gameDetails);
    let stringifiedTags = JSON.stringify(tags);
    const {data} = await axios.get(`/api/games`, {
      params: {
        gameName,
        stringifiedTags,
        newPlayersWelcome,
        freeToPlay
      }
    });
    console.log("data = ", data);
    setGames(data);
  };

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      setGameDetails({
        ...gameDetails,
        tags: [...gameDetails.tags, evt.target.value],
      });
      setTagInputValue("");
    }
  };

  const handleDelete = (tagToDelete) => {
    const newTags = gameDetails.tags.filter((tag) => tag !== tagToDelete);
    setGameDetails({ ...gameDetails, tags: newTags }); //updates UI after deleting a tag
  };

  console.log("props ", props)

  return (
    <>
      <Grid
        container
        item
        direction="column"
        xs={12}
        className="form"
        justifyContent="center"
        id="find-game"
      >
        <Grid item>
          <Typography variant="h6" component="h6" textAlign="center">
            Search Game
          </Typography>
        </Grid>
        <Grid container item direction="column" xs={6} justifyContent="center">
          <InputLabel>Enter Game Name:</InputLabel>
          <TextField
            name="gameName"
            onChange={handleChange}
            value={gameDetails.gameName}
          >
            {gameDetails.gameName}
          </TextField>
          <Grid container direction="row" sx={{ mt: 2, mb: 1 }}>
            {gameDetails.tags.map((tag, idx) => {
              console.log("game.tags = ", gameDetails.tags);
              return (
                <Chip
                  key={idx}
                  label={tag.tag_name ? tag.tag_name : tag}
                  onDelete={() => handleDelete(tag)}
                  size="medium"
                  id="tag"
                />
              );
            })}
          </Grid>
          <InputLabel>Enter Matching Keywords:</InputLabel>
          <TextField
            name="tagInputValue"
            onKeyUp={handleKeyUp}
            onChange={(evt) => setTagInputValue(evt.target.value)}
            value={tagInputValue}
          ></TextField>
          <Button sx={{alignContent:"center"}}
            className="button"
            margin="dense"
            variant="contained"
            onClick={handleSubmit}
          >
            {" "}
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid item container direction="row" justifyContent="center" id="games">
      <Grid item xs={12} >
      </Grid>
      {games.map((game, idx) => (
        <SingleGame key={idx} game={game}/>
      ))}
    </Grid>
    </>
  );
};

export default FindGame;
