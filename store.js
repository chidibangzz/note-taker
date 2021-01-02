const util = require('util');
const fs = require('fs');
//const uuid = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)



class Store {
    read() {
        return readFileAsync("db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((note) => {
            let parseNotes = [].concat(JSON.parse(notes))

            return parseNotes
        })
    }
    removeNote(id) {
        return this.getNotes()
        .then((notes) => notes.fitler((note) => note.id !==id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store()