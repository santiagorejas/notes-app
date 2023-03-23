package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class PagedDto<T> {

    private List<T> content;
    private int page;
    private long totalElements;
    private int totalPages;

}