package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Note;
import com.example.demo.services.NotesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/notes")
public class NotesController {

	@Autowired
	NotesService notesService;

	@GetMapping
	Iterable<Note> getNotes() {
		return notesService.getNotes();
	}
	
	@PostMapping
	void addNote(@RequestBody @Valid Note note) {
		notesService.createNote(note);
	}
}
