// Dependencies
// =============================================================
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const dbJSON = require("./db.json");
const path = require("path");
const htmlRoutes = require("./routes/html");
const apiRoutes = require("./routes/api");
const store = require('./store.js');
const router = require("./routes/html");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/", htmlRoutes)
//app.use("/api", apiRoutes)

// Routes
// =============================================================
//app.use(htmlRoutes)

// app.get("/", function (req, res) { 
//   res.sendFile(path.join(__dirname, "public/index.html"));
// }); 
// app.get("/notes", function (req, res) { 
//   res.sendFile(path.join(__dirname, "public/notes.html"));
// }); 


//app.use(apiRoutes)


app.get("/api/note", function(req, res) {
res.json(dbJSON);
 });

app.post("/api/note", function(req, res) {
  // Validate request body
  if(!req.body.title) {
    return res.json({error: "Missing required title"});
  }

  // Copy request body and generate ID
  const note = {...req.body, id: uuidv4()}

  // Push note to dbJSON array - saves data in memory
  dbJSON.push(note);

  // Saves data to file by persisting in memory variable dbJSON to db.json file.
  // This is needed because when we turn off server we loose all memory data like pbJSON variable.
  // Saving to file allows us to read previous notes (before server was shutdown) from file.
  fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(dbJSON), (err) => {
    if (err) {
      return res.json({error: "Error writing to file"});
    }

    return res.json(note);
  });
});

// app.delete("api/notes/:id"), (req, res) => {
//   store
//   .removeNote(req.params.id)
//   .then(() => res.json({ok: true}))
//   .catch((err) => res.status(500).json(err));
// };

app.get("*", function(req, res) {
  res.send("Sending you the homepage");
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
