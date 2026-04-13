package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Note;
import com.example.demo.services.NotesService;

@RestController
@RequestMapping(path = "/notes")
public class NotesController {

	@Autowired
	NotesService notesService;

	@GetMapping
	Note getNotes() {
		return notesService.getNotes();
	}
	
	@PostMapping
	void setNote(@RequestParam Note note) {
		notesService.setNote(note);
	}
}
