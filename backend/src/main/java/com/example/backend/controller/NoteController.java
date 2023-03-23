package com.example.backend.controller;

import com.example.backend.dto.NoteDto;
import com.example.backend.model.request.NoteRequest;
import com.example.backend.model.response.NoteResponse;
import com.example.backend.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notes")
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity createNote(@Valid @RequestBody NoteRequest note) {

        ModelMapper modelMapper = new ModelMapper();
        NoteDto noteDto = modelMapper.map(note, NoteDto.class);

        NoteDto createdNoteDto = this.noteService.createNote(noteDto);

        NoteResponse noteResponse = modelMapper.map(createdNoteDto, NoteResponse.class);

        return ResponseEntity.ok(noteResponse);
    }

}
