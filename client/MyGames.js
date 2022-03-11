import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Grid, Typography, Avatar, IconButton } from "@mui/material";
import { UserContext } from "./UserContext";
import { useParams, useNavigate } from "react-router-dom";
import SingleGame from "./SingleGame";

export const MyGames = () => {
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({
    username: "",
    games: [],
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        let token = JSON.parse(window.localStorage.getItem("token"));
        if (token) {
          const { data } = await axios.get(`/api/users/${token.userId}`);
          setUserProfile(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserProfile();
  }, []);

  return (
    <Grid container sx={{ m: 2 }}>
      {console.log("user profile = ", userProfile)}
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid container item flexDirection="column">
          <Typography align="center" variant="h5">
            My Games
          </Typography>
          <Grid container item flexDirection="row">
            {userProfile.games.map((game, idx) => (
              <SingleGame key={idx} game={game} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
