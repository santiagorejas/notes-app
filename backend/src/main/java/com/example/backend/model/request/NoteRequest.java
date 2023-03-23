package com.example.backend.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteRequest {

    @NotBlank(message = "Title is requried.")
    private String title;

    @Size(max = 255, message = "Content must be less than 255 characters.")
    private String content;

}
