package com.example.backend.service.impl;

import com.example.backend.dto.NoteDto;
import com.example.backend.model.entity.NoteEntity;
import com.example.backend.repository.NoteRepository;
import com.example.backend.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    @Override
    public NoteDto createNote(NoteDto noteDto) {

        ModelMapper modelMapper = new ModelMapper();
        NoteEntity noteEntity = modelMapper.map(noteDto, NoteEntity.class);
        noteEntity.setLastEdited(new Date());
        noteEntity.setNoteId(UUID.randomUUID().toString());

        NoteEntity createdNodeEntity = this.noteRepository.save(noteEntity);

        NoteDto createdNodeDto = modelMapper.map(createdNodeEntity, NoteDto.class);

        return createdNodeDto;
    }
}
