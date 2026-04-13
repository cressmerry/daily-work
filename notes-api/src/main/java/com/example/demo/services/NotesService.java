package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Note;

@Service
public class NotesService {
	public Note getNotes() {
		Note note =  new Note();
		note.setId(1234);
		note.setTitle("Test Note Title");
		note.setContent("Test Note Content");
		return note;
	}

	public void createNote(Note note) {
		System.out.println(note.getId());
		System.out.println(note.getTitle());
	}
}
