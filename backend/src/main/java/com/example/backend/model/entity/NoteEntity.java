package com.example.backend.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "notes")
public class NoteEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 36)
    private String noteId;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Date createdAt;

    @Column(nullable = false)
    private Date lastEdited;

    @Column(nullable = false)
    private boolean archived;

}
