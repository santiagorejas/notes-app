package com.example.backend.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class NoteDetailsResponse {

    private String noteId;
    private String title;
    private String content;
    private Date createdAt;
    private Date lastEdited;
    private List<CategoryResponse> categories;


}
