package com.example.backend.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteResponse {

    private String noteId;
    private String title;
    private String content;

}
