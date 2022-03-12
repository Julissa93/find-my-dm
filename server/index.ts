import path from "path";
import express from "express";
import morgan from "morgan";
import { createConnection, Connection } from "typeorm";
const app = express();
const PORT = 8080;

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
