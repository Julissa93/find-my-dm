import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";

const SignUp = () => {
  const [user, setUser] = useState({email: "", firstname: "", lastname: "", username: "", password: "",  });

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    console.log("submitted! ", user);
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
        Sign Up
      </Typography>
      <TextField
        variant="outlined"
        name="firstname"
        label="First Name"
        margin="dense"
        value={user.username}
        onChange={handleChange}
      ></TextField>
      <TextField
        variant="outlined"
        name="lastname"
        label="Last Name"
        margin="dense"
        value={user.lastname}
        onChange={handleChange}
      ></TextField>
      <TextField
        variant="outlined"
        name="email"
        label="Email"
        margin="dense"
        value={user.email}
        onChange={handleChange}
      ></TextField>
      <TextField
        variant="outlined"
        name="username"
        label="Username"
        margin="dense"
        value={user.username}
        onChange={handleChange}
      ></TextField>
      <TextField
        variant="outlined"
        name="password"
        label="Password"
        type="password"
        margin="dense"
        value={user.password}
        onChange={handleChange}
      ></TextField>
      <Button
        margin="dense"
        className="button"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Grid>
  );
};

export default SignUp;
