import express from "express";
import Game from "../entities/Game";
import Tag from "../entities/Tag";
import User from "../entities/User";
import { requireToken } from "./auth";
import Player from "../entities/Player";
import { getManager, createQueryBuilder, SimpleConsoleLogger } from "typeorm";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.query.stringifiedTags === undefined) {
      const games = await Game.find({ relations: ["tags"] });
      res.send(games);
    } else {
      //supposed to pass a string to JSON.parse but req.query is a query object so i added "as string"
      //which will tell the compilar to consider the req.query query object as a string
      const tag_names = JSON.parse(req.query.stringifiedTags as string);

      const tagIds = await Promise.all(
        tag_names.map(async (tag_name) => {
          console.log("in promise.all map. tag_name = ", tag_name);
          //capitalize each word in the string/tag
          tag_name = tag_name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
          console.log("tag_name = ", tag_name)
          const tag = await createQueryBuilder("tag")
            .select("tag.id")
            .from(Tag, "tag")
            .where("tag.tag_name like :tag_name", { tag_name: `%${tag_name}` })
            .getOne();
          console.log("tag = ", tag);
          return tag.id;
        })
      );
      //use tagIds to query the game_tags junction table
      //(we use a raw query here because game_tags was automatically created by typeorm and I don't have a custom module for it)
      //the games associated with each tag the user gave will be stored in an array
      const gamesAssociatedWithGivenTags = await Promise.all(
        tagIds.map(async (tagId) => {
          console.log("in game id promise.all, ", tagId);
          const games = await getManager().query(
            `SELECT game from game_tags WHERE tag = $1`,
            [tagId]
          );
          console.log("games = ", games);
          return games;
        })
      );
      console.log("games result = ", gamesAssociatedWithGivenTags);
      let flattenedGameArray = [];
      gamesAssociatedWithGivenTags.map((game, idx) => {
        console.log("game in flatten loop = ", game);
        console.log("indx = ", idx)
        game.map(gameObject => {
          console.log("game object = ", gameObject);
          flattenedGameArray.push(gameObject.game);
        })
      });
      console.log("flattened game ids = ", flattenedGameArray);

      const gameDetails = await Promise.all(
        flattenedGameArray.map(async (gameId) => {
          console.log("game_id = ", gameId);
          const game = await Game.findOne({
            where: {
              id: gameId,
            },
          });
          return game;
        })
      );

      res.send(gameDetails);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id/admin", async (req, res, next) => {
  try {
    const game = await Game.findOne(req.params.id, {
      relations: ["players"]
    });
    const admin = game.players.filter(player => player.admin === true)[0];
    const adminDetails = await User.findOne({select: ['id', 'username'], where: {
      id: admin.player_id
    }})
    res.send(adminDetails);
  } catch(err) {
    next(err);
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const game = await Game.findOne(req.params.id, {
      relations: ["tags", "players"]
    });
    //let admin = game.players.filter(player => player.admin === true)[0];
    //console.log("admin = ", admin)
    res.send(game);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req: any, res, next) => {
  try {
    if (req.user) {
      console.log("in if statement");
      const game = await Game.create({
        imageUrl: req.body.game.imageUrl,
        game_name: req.body.game.game_name,
        game_type: req.body.game.game_type,
        genre: req.body.game.genre,
        description: req.body.game.description,
      }).save();
      console.log("Game = ", game);
      const createdGame = await Game.findOne({
        where: { id: game.id },
        relations: ["tags", "players"],
      });
      console.log("createdGame = ", createdGame);
      const { userId } = req.body;
      console.log("user id = ", userId);
      const user = await User.findOne({
        where: { id: userId },
      });
      console.log("PLAYER CREATING GAME = ", user);
      //create player for that game and make them admin since they created it
      //passing game because createdGame caused an error, not sure why?
      const newPlayer = await Player.create({
        player_id: user.id,
        game_id: createdGame.id,
        admin: true,
      }).save();
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
