package com.example.backend.service;

import com.example.backend.dto.NoteDto;
import com.example.backend.dto.PagedDto;

public interface NoteService {
    NoteDto createNote(NoteDto noteDto);

    PagedDto<NoteDto> getNotes(int page, int size, boolean archived, String category);

    NoteDto updateNote(NoteDto noteDto);

    void deleteNote(String noteId);

    void archiveNote(String noteId, boolean archive);

    NoteDto getNoteDetails(String noteId);
}
