import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Grid, TextField, Button, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const { id, username, setUser } = useContext(UserContext);

  const handleChange = (evt) => {
    setUserInput({ ...userInput, [evt.target.name]: evt.target.value });
  };

  const attemptTokenLogin = async () => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if (token) {
      const { data } = await axios.get(`/api/auth`, {
        headers: {
          authorization: token.accessToken,
        },
      });
      setUser({id: data.id, username: data.username})
      setAuth(data);
    }
  };

  const handleSubmit = async (evt) => {
    try {
      const { data } = await axios.post("/api/auth", userInput);
      if (data) window.localStorage.setItem("token", JSON.stringify(data));
      await attemptTokenLogin();
      navigate("/mygames");
    } catch (err) {
      console.error("Something Went Wrong!", err);
    }
  };

  return (
      <Grid
        container
        item
        xs={6}
        direction="column"
        justifyContent="center"
        id="login"
        spacing={8}
      >
        <Typography variant="h6" component="h6" textAlign="center">
          Log In
        </Typography>
        <TextField
          variant="outlined"
          name="username"
          label="Username"
          margin="dense"
          value={userInput.username}
          onChange={handleChange}
        ></TextField>
        <TextField
          variant="outlined"
          name="password"
          label="Password"
          type="password"
          margin="dense"
          value={userInput.password}
          onChange={handleChange}
        ></TextField>
        <Button
          margin="dense"
          className="button"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <Typography align="center" variant="p">Need an account? <a href="/#/signup">SIGN UP HERE</a></Typography>
      </Grid>
  );
};

export default Login;