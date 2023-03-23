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
        noteEntity.setLastEdited(new Date());
        noteEntity.setNoteId(UUID.randomUUID().toString());

        NoteEntity createdNodeEntity = this.noteRepository.save(noteEntity);

        NoteDto createdNodeDto = modelMapper.map(createdNodeEntity, NoteDto.class);

        return createdNodeDto;
    }

    @Override
    public PagedDto<NoteDto> getNotes(int page, int size, boolean archived) {

        Pageable pageable = PageRequest.of(page, size);

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
}
