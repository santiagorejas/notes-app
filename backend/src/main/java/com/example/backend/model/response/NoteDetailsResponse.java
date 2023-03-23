package com.example.backend.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NoteDetailsResponse {

    private String noteId;
    private String title;
    private String content;
    private List<CategoryResponse> categories;


}
