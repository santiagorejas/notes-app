package com.example.backend.service.impl;

import com.example.backend.dto.NoteDto;
import com.example.backend.dto.PagedDto;
import com.example.backend.model.entity.NoteEntity;
import com.example.backend.repository.NoteRepository;
import com.example.backend.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    @Override
    public NoteDto createNote(NoteDto noteDto) {

        ModelMapper modelMapper = new ModelMapper();
        NoteEntity noteEntity = modelMapper.map(noteDto, NoteEntity.class);

        Date date = new Date();
        noteEntity.setCreatedAt(date);
        noteEntity.setLastEdited(date);

        noteEntity.setNoteId(UUID.randomUUID().toString());

        NoteEntity createdNodeEntity = this.noteRepository.save(noteEntity);

        NoteDto createdNodeDto = modelMapper.map(createdNodeEntity, NoteDto.class);

        return createdNodeDto;
    }

    @Override
    public PagedDto<NoteDto> getNotes(int page, int size, boolean archived) {

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<NoteEntity> notesEntities = this.noteRepository
                .findAllByArchived(archived, pageable)
                .orElseThrow();

        ModelMapper modelMapper = new ModelMapper();
        List<NoteDto> noteDtoList = notesEntities
                .stream()
                .map(noteEntity -> modelMapper.map(noteEntity, NoteDto.class))
                .toList();

        PagedDto<NoteDto> pagedNoteDto = PagedDto
                .<NoteDto>builder()
                .content(noteDtoList)
                .page(notesEntities.getNumber())
                .totalPages(notesEntities.getTotalPages())
                .totalElements(notesEntities.getTotalElements())
                .build();

        return pagedNoteDto;
    }

    @Override
    public NoteDto updateNote(NoteDto noteDto) {


        NoteEntity noteEntity = this.noteRepository
                .findByNoteId(noteDto.getNoteId())
                .orElseThrow();

        noteEntity.setTitle(noteDto.getTitle());
        noteEntity.setContent(noteDto.getContent());
        noteEntity.setLastEdited(new Date());

        NoteEntity updatedNoteEntity = this.noteRepository.save(noteEntity);

        ModelMapper modelMapper = new ModelMapper();
        NoteDto updatedNoteDto = modelMapper.map(updatedNoteEntity, NoteDto.class);

        return updatedNoteDto;

    }

    @Override
    public void deleteNote(String noteId) {

        NoteEntity noteEntity = this.noteRepository
                .findByNoteId(noteId)
                .orElseThrow();

        this.noteRepository.delete(noteEntity);
    }

}