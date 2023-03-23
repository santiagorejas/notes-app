package com.example.backend.repository;

import com.example.backend.model.entity.NoteEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<NoteEntity, Long> {

    Optional<Page<NoteEntity>> findAllByArchived(boolean archived, Pageable pageable);

}
