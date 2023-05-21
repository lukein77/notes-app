package com.challenge.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.challenge.backend.dto.NoteRequest;
import com.challenge.backend.exception.ResourceNotFoundException;
import com.challenge.backend.model.Category;
import com.challenge.backend.model.Note;
import com.challenge.backend.repository.CategoryRepository;
import com.challenge.backend.repository.NoteRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/")
public class NoteController {
    
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/notes")
    public List<Note> getActiveNotes() {
        return this.noteRepository.findByArchived(false);
    }

    @GetMapping("/notes/archived")
    public List<Note> getArchivedNotes() {
        return this.noteRepository.findByArchived(true);
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: "+id));
        return ResponseEntity.ok(note);
    }
    
    @GetMapping("/notes/category={category}")
    public List<Note> getNotesByCategory(@PathVariable String category) {
        return noteRepository.findByCategory(category);
    }

    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(@RequestBody NoteRequest request) {
        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setArchived(false);

        List<Category> categories = new ArrayList<>();
        for (String categoryName : request.getCategories()) {
            Category category = categoryRepository.findByName(categoryName);  
            if (category == null) {
                category = new Category();
                category.setName(categoryName);
                categoryRepository.save(category);
            }
            categories.add(category);
        }
        note.setCategories(new HashSet<>(categories));
        
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody NoteRequest request) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: "+id));

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setArchived(request.isArchived());

        note.getCategories().clear();

        List<Category> categories = new ArrayList<>();
        for (String categoryName : request.getCategories()) {
            Category category = categoryRepository.findByName(categoryName);  
            if (category == null) {
                category = new Category();
                category.setName(categoryName);
                categoryRepository.save(category);
            }
            categories.add(category);
        }
        note.setCategories(new HashSet<>(categories));
        
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    @PutMapping("/notes/{id}/archive={value}")
    public ResponseEntity<Note> archiveNote(@PathVariable Long id, @PathVariable boolean value) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: "+id));

        note.setArchived(value);

        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteNote(@PathVariable Long id) {

        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Note doesn't exist with id: "+id));

        noteRepository.delete(note);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }
}
