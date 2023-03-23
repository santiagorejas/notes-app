package com.example.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "categories")
public class CategoryEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 36)
    private String categoryId;

    @Column(nullable = false, length = 30)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    private List<NoteEntity> notes = new ArrayList<>();

}
