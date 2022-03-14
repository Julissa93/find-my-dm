import express from "express";
import Game from "../entities/Game";
import Tag from "../entities/Tag";
import User from "../entities/User";
import Player from "../entities/Player";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("in route");
    const users = await User.find({select: ["username", "games"]});
    console.log("users = ", users);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {username, games} = await User.findOne({ where: { id } });
    const fetchedGames = await Promise.all(games.map(async (game) => {
      const {game_id} = game;
      return await Game.findOne({where: {id: game_id}})
    }));
    if(username) res.send({username, games: fetchedGames});
    res.status(404);
  } catch (err) {
    next(err);
  }
});

export default router;
