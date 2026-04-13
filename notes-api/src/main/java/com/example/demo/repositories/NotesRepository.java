package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Note;

@Repository
public interface NotesRepository extends CrudRepository<Note, Integer>{

}
