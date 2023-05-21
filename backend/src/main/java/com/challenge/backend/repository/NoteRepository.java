package com.challenge.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.challenge.backend.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>{
    List<Note> findByArchived(boolean archived);

    @Query("SELECT n FROM Note n JOIN n.categories c WHERE c.name = :category")
    List<Note> findByCategory(@Param("category") String category);
}
