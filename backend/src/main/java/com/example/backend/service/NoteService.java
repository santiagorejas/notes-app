package com.example.backend.service;

import com.example.backend.dto.NoteDto;
import com.example.backend.dto.PagedDto;

public interface NoteService {
    NoteDto createNote(NoteDto noteDto);

    PagedDto<NoteDto> getNotes(int page, int size, boolean archived);

    NoteDto updateNote(NoteDto noteDto);

    void deleteNote(String noteId);
}
