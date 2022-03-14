import express from "express";
import Game from "../entities/Game";
import Tag from "../entities/Tag";
import User from "../entities/User";
import { requireToken } from "./auth";
import Player from "../entities/Player";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const games = await Game.find();
    res.send(games);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const game = await Game.findOne(req.params.id, {
      relations: ["tags"],
    });
    res.send(game);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req: any, res, next) => {
  try {
    if (req.user) {
      console.log("in if statement")
      const game = await Game.create({
        imageUrl: req.body.game.imageUrl,
        game_name: req.body.game.game_name,
        game_type: req.body.game.game_type,
        genre: req.body.game.genre,
        description: req.body.game.description,
      }).save();
      console.log("Game = ", game)
      const createdGame = await Game.findOne({
        where: { id: game.id },
        relations: ["tags", "players"],
      });
      console.log("createdGame = ", createdGame)
      const { userId } = req.body;
      console.log("user id = ", userId);
      const user = await User.findOne({
        where: { id: userId }
      });
      console.log("PLAYER CREATING GAME = ", user)
      //create player for that game and make them admin since they created it 
      //passing game because createdGame caused an error, not sure why?
      const newPlayer = await Player.create({player_id: user.id, game_id: createdGame.id, admin: true}).save();
      createdGame.players = [...createdGame.players, newPlayer];
      user.games = [...user.games, newPlayer];
      let tags = await Promise.all(
        req.body.game.tags.map(async (tag) => {
          let foundTag = await Tag.findOne({ where: { tag_name: tag } });
          if (!foundTag) {
            foundTag = await Tag.create({ tag_name: tag }).save();
          }
          return foundTag;
        })
      );
      createdGame.tags = tags;
      await createdGame.save();
      res.send(createdGame);
    } else {
      res.status(500).send("Unauthorized Request.");
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req: any, res, next) => {
  const { imageUrl, game_name, game_type, genre, description, tags } = req.body;
  const { id } = req.params;
  try {
    if (req.user) {
      const game = await Game.findOne({ where: { id } });
      //add tags
      let newTags = await Promise.all(
        tags.map(async (tag) => {
          if (!tag.id) {
            let foundTag = await Tag.findOne({ where: { tag_name: tag } });
            if (!foundTag) {
              tag = await Tag.create({ tag_name: tag }).save();
            }
            tag = foundTag;
          }
          return tag;
        })
      );
      console.log("new tags = ", newTags);
      game.tags = newTags;
      game.imageUrl = imageUrl;
      game.game_name = game_name;
      game.game_type = game_type;
      game.genre = genre;
      game.description = description;
      await game.save();
      console.log("UPDATED GAME = ", game);
      res.send(game);
    } else {
      res.status(500).send("Unauthorized Request.");
    }
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await Game.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
