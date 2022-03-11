import express from "express";
import Game from "../entities/Game";
import Tag from "../entities/Tag";
import User from "../entities/User";
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
    if(username) res.send({username, games});
    res.status(404);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
