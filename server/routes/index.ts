import express from "express";
import games from "./games";
import auth from "./auth";
import users from "./users";
const router = express.Router();

router.use("/games", games);
router.use("/auth", auth);
router.use("/users", users);

module.exports = router;