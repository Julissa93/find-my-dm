var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;
const { getConnection } = require("typeorm");
const Game = require("./entities/Game.ts");
const User = require("./entities/User.ts");
const morgan = require("morgan");
const connect = require("./db");
const { createConnection, Connection } = require("typeorm");
app.use(morgan("dev"));
// body parsing middleware
app.use(express.json()); //is this still needed?
app.use(express.urlencoded({ extended: true }));
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));
//app.use('/users', require('./entities/User.ts'))
app.use("/games", require("./routes/games"));
app.post("/login", (req, res, next) => {
    try {
    }
    catch (err) {
        console.log("Error message: ", err.message);
    }
});
// sends index.html
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "./public/index.html"));
});
app.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
    const connect = () => __awaiter(this, void 0, void 0, function* () {
        yield createConnection({
            type: "postgres",
            url: "root:julissa@localhost:5432/findmydm",
            synchronize: true,
            entities: [Game, User]
        });
    });
    yield connect();
    console.log(`App listening on PORT: ${PORT}`);
}));
//# sourceMappingURL=index.js.map