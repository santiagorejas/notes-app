package com.example.backend.controller;

import com.example.backend.dto.NoteDto;
import com.example.backend.dto.PagedDto;
import com.example.backend.model.request.NoteRequest;
import com.example.backend.model.response.NoteResponse;
import com.example.backend.model.response.PagedResponse;
import com.example.backend.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notes")
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<PagedResponse<NoteResponse>> getNotes(@RequestParam(name = "page", defaultValue = "0") int page,
                                                                @RequestParam(name = "size", defaultValue = "20") int size,
                                                                @RequestParam(name = "archived", defaultValue = "false") boolean archived) {

        PagedDto<NoteDto> pagedDto = this.noteService.getNotes(page, size, archived);

        ModelMapper modelMapper = new ModelMapper();
        Type mapType = new TypeToken<PagedResponse<NoteResponse>>() {}.getType();
        PagedResponse<NoteResponse> notesResponse = modelMapper.map(pagedDto, mapType);

        return ResponseEntity.ok(notesResponse);


    }

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@Valid @RequestBody NoteRequest note) {

        ModelMapper modelMapper = new ModelMapper();
        NoteDto noteDto = modelMapper.map(note, NoteDto.class);

        NoteDto createdNoteDto = this.noteService.createNote(noteDto);

        NoteResponse noteResponse = modelMapper.map(createdNoteDto, NoteResponse.class);

        return ResponseEntity.ok(noteResponse);
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<NoteResponse> updateNote(@Valid @RequestBody NoteRequest note,
                                                   @PathVariable String noteId) {

        ModelMapper modelMapper = new ModelMapper();
        NoteDto noteDto = modelMapper.map(note, NoteDto.class);
        noteDto.setNoteId(noteId);

        NoteDto updatedNoteDto = this.noteService.updateNote(noteDto);

        NoteResponse noteResponse = modelMapper.map(updatedNoteDto, NoteResponse.class);

        return ResponseEntity.ok(noteResponse);
    }



}
