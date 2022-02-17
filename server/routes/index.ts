import { RouterRounded } from "@mui/icons-material";
import express from "express";
const router = express.Router();

router.use("/games", require("./games"));
//router.use("/users", require("."))

module.exports = router;