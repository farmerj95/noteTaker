const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

let savedNote = [];

fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    savedNote = (JSON.parse(data));
});

editNote = function () {
    fs.writeFile("./db/db.json", JSON.stringify(savedNote), (err) => {
        if (err) throw err;
    });
}

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        res.json(savedNote);
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body
        newNote.id = (uuidv4());
        savedNote.push(newNote);
        editNote();
        res.send(savedNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        idDelete = req.params.id

        for (let i = 0; i < savedNote.length; i++) {
            if (savedNote[i].id === idDelete) {
                savedNote.splice(i, 1);
                editNote();
                res.send(savedNote);
                return;
            }
        }
    });
}