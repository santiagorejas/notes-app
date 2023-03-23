package com.example.backend.service.impl;

import com.example.backend.dto.CategoryDto;
import com.example.backend.model.entity.CategoryEntity;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {

        ModelMapper modelMapper = new ModelMapper();
        CategoryEntity categoryEntity = modelMapper.map(categoryDto, CategoryEntity.class);
        categoryEntity.setCategoryId(UUID.randomUUID().toString());

        CategoryEntity createdCategoryEntity = this.categoryRepository.save(categoryEntity);

        CategoryDto createdCategoryDto = modelMapper.map(createdCategoryEntity, CategoryDto.class);

        return createdCategoryDto;
    }

    @Override
    public List<CategoryDto> getCategories() {


        List<CategoryEntity> categoriesEntities = this.categoryRepository
                .findAll();

        ModelMapper modelMapper = new ModelMapper();
        List<CategoryDto> categoriesDtos = categoriesEntities
                .stream()
                .map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDto.class))
                .toList();

        return categoriesDtos;
    }

    @Override
    public void deleteCategory(String categoryId) {

        CategoryEntity categoryEntity = this.categoryRepository
                .findByCategoryId(categoryId)
                .orElseThrow();

        this.categoryRepository.delete(categoryEntity);

    }
}
