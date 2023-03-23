package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoteDto {

    private Long id;
    private String noteId;
    private String title;
    private String content;
    private Date createdAt;
    private Date lastEdited;
    private boolean archived;

}
