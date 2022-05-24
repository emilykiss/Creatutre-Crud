const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.use(ejsLayouts);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/creatures", require("./controllers/creatures"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(5000, () => {
  console.log("New animals dropping on port 5000🤟");
});