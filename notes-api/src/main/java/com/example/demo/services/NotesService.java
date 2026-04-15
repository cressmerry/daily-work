package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Note;
import com.example.demo.repositories.NotesRepository;

@Service
public class NotesService {
	@Autowired
	NotesRepository notesRepository;

	public Iterable<Note> getNotes() {
		return notesRepository.findAll();
	}

	@Transactional(rollbackFor = Exception.class)
	public Note createNote(Note note) {
		notesRepository.save(note);
		return note;
	}

	@Transactional(rollbackFor = Exception.class)
	public Note updateNote(Long id, Note noteDetails) {
		Note existingNote = notesRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Note not found with id: " + id));

		if (noteDetails.getTitle() != null) {
			existingNote.setTitle(noteDetails.getTitle());
		}
		if (noteDetails.getContent() != null) {
			existingNote.setContent(noteDetails.getContent());
		}
		if (noteDetails.getStatus() != null) {
			existingNote.setStatus(noteDetails.getStatus());
		}
		if (noteDetails.getPriority() != null) {
			existingNote.setPriority(noteDetails.getPriority());
		}
		if (noteDetails.getCompletion_time() != null) {
			existingNote.setCompletion_time(noteDetails.getCompletion_time());
		}

		notesRepository.save(existingNote);
		return existingNote;
	}

	public void deleteNote(Long id) {
		notesRepository.deleteById(id);

	}
}
