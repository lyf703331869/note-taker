const fs = require("fs");
const express = require("express");
const notes = require("./db/db.json");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// POST to create note to notes database
app.post("/api/notes", (req, res) => {
  let newNote = req.body;

  fs.readFile("/db/db.json", (err, notes) => {
    if (err) throw err;
    const notesArr = JSON.parse(notes);
    notesArr.push(newNote);
    // write files
    fs.writeFile("./db/db.json", JSON.stringify(notesArr, null, 2)),
      "utf8",
      (err) => {
        if (err) return console.log(err);
        res.json(newNote);
      };
  });
});

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET to read all current notes from database
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
  const index = req.params.id;
  res.json(notes[index]);
});

// GET Route return to homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
