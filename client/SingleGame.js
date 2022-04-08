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

const SingleGame = ( props ) => {
    const { game } = props;
    const navigate = useNavigate();
    return ( 
        <Grid item xs={12} md={6} lg={4} id="card">
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={game.imageUrl}
              alt="game image"
            />
            <CardContent sx={{pb: 1}}>
              <Grid container justifyContent="center">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  textAlign="center"
                >
                  {game.game_name}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  color="text.secondary"
                  id="description"
                  align="center"
                >
                  {game.description}
                </Typography>
              </Grid>
            </CardContent>
           { <CardContent sx={{ mt: 0, mb: 0, pt: 0, pb: 0 }}>
              <Grid container direction="row" justifyContent="flex-end">
                {game.tags.map((tag, idx) => {
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
              </CardContent>}
            <CardActions sx={{pr: 2}}>
              <Grid container direction="row" justifyContent="flex-end">
                <Button size="small">Share</Button>
                <Button
                  size="small"
                  onClick={() => navigate(`/games/${game.id}`)}
                >
                  Learn More
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
    )
}

export default SingleGame;