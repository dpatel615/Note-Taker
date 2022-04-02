var $noteTitle = $(".noteTitle");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// active Note is used to keep track of the note in textarea
var activeNote = {};

// A function for getting all notes from the db

