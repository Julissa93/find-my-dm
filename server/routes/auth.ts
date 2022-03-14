import express from "express";
import User from "../entities/User";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ConstructionOutlined } from "@mui/icons-material";

interface IUserRequest extends express.Request {
  user: any;
}

export const requireToken = async (req, res, next) => {
  console.log("in require token");
  try {
    const token = req.headers.authorization;
    console.log("token from front end = ", token);
    const payload: any = await jwt.verify(token, process.env.JWT);
    console.log("payload = ", payload);
    let user = {};
    if (payload) {
      user = await User.findOne({ where: { id: payload.id } });
      console.log("UserfromDB = ", user);
    }
    console.log("USER = ", user);
    req.user = user;
    console.log("REQ.USER = ", req.user);
    next();
  } catch (err) {
    next(err);
  }
};

router.post("/", async (req, res, next) => {
  console.log("IN AUTH ROUTE");
  try {
    const { username, password } = req.body;
    //authentication
    const user = await User.findOne({ where: { username } });
    console.log("user = ", user);
    //check if password entered is a match with hashed password stored in DB
    const match = await bcrypt.compare(password, user.password);
    console.log("match = ", match)
    let accessToken;
    if (match) {
      //generate token
      accessToken = await jwt.sign({ id: user.id }, process.env.JWT);
      console.log("accessToken = ", accessToken);
    }
    //send user info so we can retrieve their data, and accesstoken for any requests that require a token
    //such as a user's games for example, or to create a game
    res.send({ userId: user.id, username: user.username, accessToken });
  } catch (err) {
    next(err);
  }
});

router.get("/", requireToken, async (req: IUserRequest, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(404);
  }
});

export default router;
