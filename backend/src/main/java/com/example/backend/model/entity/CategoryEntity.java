package com.example.backend.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

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

}
