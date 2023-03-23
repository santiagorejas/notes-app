package com.example.backend.service;

import com.example.backend.dto.NoteDto;

public interface NoteService {
    NoteDto createNote(NoteDto noteDto);
}
