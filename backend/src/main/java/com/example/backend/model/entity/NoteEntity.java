package com.example.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "notes_categories",
            joinColumns = {@JoinColumn(name = "category_id")},
            inverseJoinColumns = {@JoinColumn(name = "note_id")}
    )
    private List<CategoryEntity> categories = new ArrayList<>();

}
