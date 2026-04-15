package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.Note;
import com.example.demo.services.NotesService;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @GetMapping
    public Iterable<Note> getNotes() {
        return notesService.getNotes();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Note addNote(@RequestBody @Valid Note note) {
        return notesService.createNote(note);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Note updateNote(@PathVariable Long id, @RequestBody Note note) {
        return notesService.updateNote(id, note);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable Long id) {
        notesService.deleteNote(id);
    }
}