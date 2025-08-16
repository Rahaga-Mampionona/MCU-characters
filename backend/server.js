
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = __dirname + "/characters.json";

app.get("/characters", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(data.characters);
});

app.post("/characters", (req, res) => {
  const { name, realName, universe } = req.body;
  let data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

  const newCharacter = {
    id: data.characters.length + 1,
    name,
    realName,
    universe
  };

  data.characters.push(newCharacter);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.status(201).json(newCharacter);
});

app.delete("/characters/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  const id = parseInt(req.params.id);

  data.characters = data.characters.filter(char => char.id !== id);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.json({ message: "Character deleted" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
