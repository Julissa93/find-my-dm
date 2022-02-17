"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Game_1 = __importDefault(require("../entities/Game"));
const router = express_1.default.Router();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HOWDY");
    try {
        console.log("REQ BODY = ", req.body);
        const game = yield Game_1.default.create({
            game_name: req.body.name,
            game_type: req.body.type,
            genre: req.body.genre,
            tags: req.body.tags,
            description: req.body.description
        });
        yield game.save();
        res.send(game);
    }
    catch (err) {
        console.log("Something went wrong!", err);
    }
}));
module.exports = router;
//# sourceMappingURL=games.js.map