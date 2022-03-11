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
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({limit: '50mb', extended: true }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

//app.use('/users', require('./entities/User.ts'))
app.use("/api", require("./routes/index"));

app.use((req, res, next) => {
  if(path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "./public/index.html"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal Server Error.");
});

app.listen(PORT, async () => {
  const connect = async () => {
    await createConnection({
      type: "postgres",
      synchronize: true, 
      url: "root:julissa@localhost:5432/findmydm",
      entities: [__dirname + '/entities/*.ts'],
    });
    
  };
  await connect();
  console.log(`App listening on PORT: ${PORT}`);
});
