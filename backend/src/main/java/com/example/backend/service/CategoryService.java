package com.example.backend.service;

import com.example.backend.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    CategoryDto createCategory(CategoryDto categoryDto);

    List<CategoryDto> getCategories();

    void deleteCategory(String categoryId);
}
