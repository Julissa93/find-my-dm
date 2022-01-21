const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;

// body parsing middleware
app.use(express.json()); //is this still needed?
app.use(express.urlencoded({ extended: true }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "./public/index.html"));
});

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`))