package com.example.backend.controller;

import com.example.backend.dto.CategoryDto;
import com.example.backend.model.request.CategoryRequest;
import com.example.backend.model.response.CategoryResponse;
import com.example.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest category) {

        ModelMapper modelMapper = new ModelMapper();
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);

        CategoryDto createdCategoryDto = this.categoryService.createCategory(categoryDto);

        CategoryResponse categoryResponse = modelMapper.map(createdCategoryDto, CategoryResponse.class);

        return ResponseEntity.ok(categoryResponse);

    }

}
