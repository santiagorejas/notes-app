package com.example.backend.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArchiveRequest {

    @NotNull(message = "Archive field is required.")
    private Boolean archive;

}
