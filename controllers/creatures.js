const express = require("express");
const req = require("express/lib/request");
const fs = require("fs");
const router = express.Router();
// Index route
router.get("/", (req, res) => {
  let creatures = fs.readFileSync("./creatures.json");
  let creatureData = JSON.parse(creatures);

  let typeFilter = req.query.typeFilter;
  if (typeFilter) {
     creatureData = creatureData.filter(
      (animal) => animal.type.toLowerCase() === typeFilter.toLowerCase()
    );
  }

  res.render("creatures/creaturesIndex.ejs", { myCreatures: creatureData });
});
// Create new creature
router.get("/new", (req, res) => {
  res.render("creatures/new.ejs");
});

// Show route
router.get("/:id", (req, res) => {
  let creatures = fs.readFileSync("./creatures.json");
  let creatureData = JSON.parse(creatures);
  // identify the index of the dino in question
  let creatureIndex = req.params.id;
  console.log(`The creature you are searching for is ${creatureIndex}`);
  // isolate the dino in question
  console.log(creatureData[creatureIndex]);
  res.render("creatures/show.ejs", { animal: creatureData[creatureIndex] });
});

// Create new route

router.post("/", (req, res) => {
  let creatures = fs.readFileSync("./creatures.json");
  let creatureData = JSON.parse(creatures);
  creatureData.push(req.body);
  fs.writeFileSync("./creatures.json", JSON.stringify(creatureData))
  res.redirect("/creatures")
})
// edit
router.get("/edit/:id", (req, res) => {
  const creatures = fs.readFileSync("./creatures.json");
  const creatureData = JSON.parse(creatures);
  //render edit forrm
  res.render("creatures/edit.ejs", {
    creatureId: req.params.id,
    creature: creatureData[req.params.id]
  });
});
// next
router.put("/:id", (req, res) => {
  const creatures = fs.readFileSync("./creatures.json");
  const creatureData = JSON.parse(creatures);
  console.log(req.params.id, req.body)
  creatureData[req.params.id].type = req.body.type
  creatureData[req.params.id].img_url = req.body.img_url
  console.log(creatureData)
  fs.writeFileSync("./creatures.json", JSON.stringify(creatureData));
  res.redirect("/creatures")
})

const creatures = fs.readFileSync("./creatures.json");
const creatureData = JSON.parse(creatures);

//Delete a creature
router.delete("/:id", (req, res) => {
  const creatures = fs.readFileSync("./creatures.json");
  const creatureData = JSON.parse(creatures);
  creatureData.splice(req.params.id, 1);
  fs.writeFileSync("./creatures.json", JSON.stringify(creatureData));
  res.redirect("/creatures");
});

module.exports = router;
