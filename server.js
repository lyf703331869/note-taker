const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// POST notes to database
app.post("/api/notes", (req, res) => {
  let newNote = req.body;

  fs.readFile("/db/db.json", (err, notes) => {
    if (err) throw err;
    const notesArr = JSON.parse(notes);
    notesArr.push(newNote);
    // write files
    fs.writeFile("/db/db.json", JSON.stringify(notesArr)),
      "utf8",
      (err) => {
        if (err) console.log(err);
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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
