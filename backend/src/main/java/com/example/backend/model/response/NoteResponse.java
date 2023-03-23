package com.example.backend.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoteResponse {

    private String noteId;
    private String title;
    private Date lastEdited;

}
