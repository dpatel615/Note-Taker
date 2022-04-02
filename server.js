// requiring express module 
const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4 : uuidv4} = require('uuid')

// if port is any route or 3001
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));

//parse incoming JSON data
app.use(express.json());

// middleware for public files
app.use(express.static('public'));


// request data
var notes = require('./db/db.json');
console.log(notes.notes);
// data from req.body and adding it to our animals.json 
function CurrentNewNote (bodyNotes, notesArray) {
    const note = bodyNotes;
    console.log(note);
    notesArray.push(note);
  //  console.log(notesArray);
    // path to write file
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes : notesArray})
    );

    // return finished code to post route for reponse
    return note;
}

// validating data
function validateNote (note) {
    if (!note.title || typeof note.title !== 'string'){
        return false;
    }

    if (!note.text || typeof note.text !== 'string'){
        return false;
    }

    return true;
};

// route GET 

app.get('/api/notes', (req, res) => {
   return res.json(notes.notes);
   
});

// route to server to accept data to be used or stored server-side
app.post('/api/notes' , (req, res) => {

    // set id based on what the next index of the array will be
    req.body.id = uuidv4();
  

    // if any data in req.body is incorrect, send error
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted. ');

    } else{

        // add note to json file and animals array in this function
        const note = CurrentNewNote(req.body, notes.notes);

        res.json(note);
    }
    
});

// delete notes

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;

    notes.notes.map((Element, index) => {
        
        if(Element.id === id){
            console.log(Element, "this is from if statement");
            note = Element
           NewArraynotes = notes.notes.splice(index,index);
            console.log(index);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify({notes : NewArraynotes})
            );
            return res.json(note);
        }
    })
});


// route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// route to notes.heml
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// chain listen() method onto our servers
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});









































