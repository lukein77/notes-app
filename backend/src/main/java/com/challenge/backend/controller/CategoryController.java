package com.challenge.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.challenge.backend.model.Category;
import com.challenge.backend.repository.CategoryRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/")
public class CategoryController {
    
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> getActiveNotes() {
        return this.categoryRepository.findAll();
    }
}
