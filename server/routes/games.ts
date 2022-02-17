import express from "express";
import Game from "../entities/Game";
import Tag from "../entities/Tag";
import GameTags from "../entities/GameTags";
import { getConnection } from "typeorm";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const games = await Game.find();
    res.send(games);
  } catch (err) {
    console.log("Something went wrong!", err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const game = await Game.findOne(req.params.id, {
      relations: ["game_tags"],
    });
    const tagIds = [];
    for (const key in game.game_tags) {
      console.log("game tag = ", game.game_tags[key].tagId);
      tagIds.push(game.game_tags[key].tagId);
    }
    const foundGameTags = await Tag.findByIds(tagIds);
    const tags = [];
    for (const key in foundGameTags) {
      tags.push(foundGameTags[key].tag_name);
    }
    res.send({ ...game, tags });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("POST REQ BODY = ", req.body);
    const game = await Game.create({
      imageUrl: req.body.imageUrl,
      game_name: req.body.game_name,
      game_type: req.body.game_type,
      genre: req.body.genre,
      description: req.body.description,
    }).save();

    req.body.tags.forEach(async (tagName) => {
      //TODO: Look for possible better solution that's not O(n^2)
      const existingTag = await Tag.findOne({ tag_name: tagName });
      if (existingTag === undefined) {
        let tag = await Tag.create({ tag_name: tagName }).save();
        await GameTags.create({ tagId: tag.id, gameId: game.id }).save();
      } else {
        await GameTags.create({
          tagId: existingTag.id,
          gameId: game.id,
        }).save();
      }
    });

    res.send(game);
  } catch (err) {
    console.log("Something went wrong!", err);
  }
});

router.put("/:id", async (req, res, next) => {
  console.log("IN PUT ROUTE");
  const { id, imageUrl, game_name, game_type, genre, description, tags } =
    req.body.game;
  const { tagsToDelete } = req.body;
  try {
    //console.log("req.body = ", req.body)
    const gameToUpdate = await Game.findOne(req.params.id);
    //console.log("Game to Update = ", gameToUpdate)
    if (gameToUpdate.id) {
      const updatedGame = await getConnection()
        .createQueryBuilder()
        .update(Game)
        .set({ imageUrl, game_name, game_type, genre, description })
        .where("id= :id", { id: req.params.id })
        .execute();
      tags.map(async (tag) => {
        console.log("tag = ", tag);
        let foundTag = await Tag.findOne({ where: { tag_name: tag } });
        if (foundTag === undefined) {
          foundTag = await Tag.create({ tag_name: tag }).save();
        }
        console.log("Found Tag = ", foundTag);
        let foundGameTag = await GameTags.findOne({
          tagId: foundTag.id,
          gameId: Number(req.params.id),
        })
        console.log("found game tag relation = ", foundGameTag)
        if(foundGameTag === undefined) {
          await GameTags.create({
            tagId: foundTag.id,
            gameId: Number(req.params.id),
          }).save();
        }
      });
      //deleting relations if a user deletes a tag for their game.
      //need to find the tag by name to delete which is stored in req.body.tagsToDelete
      //delete the relation in game_tags
      if (tagsToDelete.length > 0) {
        tagsToDelete.forEach(async (tag) => {
          const retrievedTag = await Tag.findOne({ where: { tag_name: tag } });
          const retrievedGameTag = await GameTags.findOne({
            where: { gameId: id, tagId: retrievedTag.id },
          });
          await GameTags.delete({id: retrievedGameTag.id});
        });
      }
      res.send(updatedGame);
    }
  } catch (err) {
    console.log("Something Went Wrong!!!", err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Game.delete(req.params.id);
    res.send(204);
  } catch(err) {
    console.log("Something went wrong! ", err);
  }
})

module.exports = router;
