import { useEffect, useState } from "react";
import {
  Grid,
  Textlabel,
  TextField,
  Select,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const types = ["One Shot", "Campaign"];
const genres = [
  "High Fantasy",
  "Mystery",
  "Swashbuckling",
  "Political",
  "Comedy",
  "Horror",
  "Western",
];

const CreateGame = (props) => {
  console.log("props = ", props)
  const [game, setGame] = useState({
    imageUrl:
      "data:image/png;base64,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",
    game_name: "",
    game_type: "",
    genre: "",
    tags: [],
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagsToDelete, setTagsToBeDeleted] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if(props.id) {
      setGame(props);
    }
  }, []);

  const handleChange = (evt) => {
    console.log('evt = ', evt.target.value)
    if(evt.target.name === "imageUrl") {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploadedImage = reader.result;
        setGame({...game, imageUrl: uploadedImage})
      });
      reader.readAsDataURL(evt.target.files[0]);
    }
    console.log('before set game call')
    setGame({ ...game, [evt.target.name]: evt.target.value });
    console.log('after set game call')
  };

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      setGame({...game, tags: [...game.tags, evt.target.value]});
      setTagInputValue("");
    }
  };

  const handleDelete = (tagToDelete) => {
    console.info("You clicked the delete icon. ", tagToDelete);
    const newTags = game.tags.filter(tag => tag !== tagToDelete);
    setTagsToBeDeleted([...tagsToDelete, tagToDelete]);
    setGame({...game, tags: newTags}); //updates UI after deleting a tag
    console.log("new tags = ", newTags);
    console.log("tags to be deleted = ", tagsToDelete);

  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    alert("Game created!");
    console.log("GAME: ", game);
    //when the form is submitted,if there is a tag in the game object that also exists in the tagsToDelete array 
    //then delete that tag from the tagsToDelete array
    let updatedTags = []
    game.tags.map(gameTag => {
      updatedTags = tagsToDelete.filter(tag => tag !== gameTag)
    })
    console.log("UPDATED TAGS AFTER SUBMIT = ", updatedTags)
    setTagsToBeDeleted(updatedTags)

    try {
      if(props.editGame === true) {
        await axios.put(`/api/games/${props.id}`, {game, tagsToDelete});
        //navigate(`/games/${props.id}`);
        console.log("Props after put request sent ", props);
        props.setEditGame(false);
      } else {
        const res = await axios.post("/api/games", game);
      } 
    } catch(err) {
        console.error(err);
      }

    setSubmitted(true);
    setGame({
      imageUrl: "",
      game_name: "",
      game_type: "",
      genre: "",
      tags: [],
      description: "",
    });
  };

  if (submitted) {
    navigate(`/games/${props.id}`)
  }
  return (
    <Grid
      container
      item
      direction="column"
      xs={12}
      justifyContent="center"
      id="create-game-form"
    >
      <Typography variant="h6" component="h6" textAlign="center">
      {props.editGame === true ? "Edit Game" : "Create Game"}
      </Typography>
      <Grid container direction="column">
        <InputLabel>Upload Game Image</InputLabel>
        <Grid item container>
          <Grid item>
            <img id="image" src={game.imageUrl} xs={6} />
          </Grid>
          <Grid item justifyContent="flex-end">
            <label xs={6}>
              <input type="file" name="imageUrl" onChange={handleChange} id="image-upload" multiple />
              <Button
                component="span"
                className="button"
              >
                Upload Image
              </Button>
            </label>
          </Grid>
        </Grid>
      </Grid>
      <TextField
        margin="dense"
        variant="outlined"
        name="game_name"
        label="Name"
        value={game.game_name}
        onChange={handleChange}
      />

      <InputLabel>Type</InputLabel>
      <Select
        margin="dense"
        variant="outlined"
        name="game_type"
        defaultValue="Type"
        value={game.game_type}
        label="Type"
        onChange={handleChange}
      >
        {types.map((type, idx) => (
          <MenuItem key={idx} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>

      <InputLabel>Genre</InputLabel>
      <Select
        margin="dense"
        variant="outlined"
        name="genre"
        value={game.genre}
        label="Genre"
        onChange={handleChange}
      >
        {genres.map((genre, idx) => (
          <MenuItem value={genre} key={idx}>
            {genre}
          </MenuItem>
        ))}
      </Select>
      {console.log('GAME TAGS = ', game.tags)}
      {console.log("Tags to be deleted = ", tagsToDelete)}
      
      <Grid container direction="row">
        {game.tags.map((tag, idx) => {
          return (
            <Chip
              key={idx}
              label={tag}
              onDelete={() => handleDelete(tag)}
              size="medium"
              id="tag"
            />
          );
        })}
      </Grid> 
      

      <TextField
        margin="dense"
        variant="outlined"
        name="tagInputValue"
        value={tagInputValue}
        label="Tags"
        onKeyUp={handleKeyUp}
        onChange={(evt) => setTagInputValue(evt.target.value)}
      />

      <TextField
        margin="dense"
        variant="outlined"
        name="description"
        value={game.description}
        label="Description"
        multiline
        minRows={3}
        onChange={handleChange}
      />
      <Button
        className="button"
        margin="dense"
        onClick={handleSubmit}
        variant="contained"
      >
        {props.editGame === true ? "Edit Game" : "Create Game"}
        
      </Button>
    </Grid>
  );
};

export default CreateGame;