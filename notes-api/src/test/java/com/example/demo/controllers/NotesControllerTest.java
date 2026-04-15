package com.example.demo.controllers;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.entity.Note;
import com.example.demo.services.NotesService;

@ExtendWith(MockitoExtension.class)
class NotesControllerTest {
	
	@InjectMocks
	NotesController notesController;
	
	@Mock
	NotesService notesService;
	
	@Test
	void testGetNotesForSuccessfullFetch() {
		Iterable<Note> notes = new ArrayList<>();
		when(notesService.getNotes()).thenReturn(notes);
		Iterable<Note> result = notesController.getNotes();
		assertNotNull(result);
	}

	@Test
	void testAddNoteForSuccessfullAddition() {
		Note note = new Note();
		when(notesService.createNote(note)).thenReturn(note);
		Note result = notesController.addNote(note);
		assertNotNull(result);
	}

//	@Test
//	void testUpdateNoteForSuccessfulAddition() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testDeleteNote() {
//		fail("Not yet implemented");
//	}

}
