import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteNoteModal from "../Modals/DeleteNoteModal";
import EditNoteModal from "../Modals/EditNoteModal";
import NoteCard from "../NoteCard/NoteCard";
import classes from "./NotesList.module.css";

const NotesList = (props) => {
  const { showArchived, page, setPage } = props;
  const [pageSize, setPageSize] = useState(0);
  const [clickedNote, setClickedNote] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery(["notes", { page, showArchived }], async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/notes?page=${
        page - 1
      }&size=10&archived=${showArchived}`
    );

    const data = await response.json();
    setPageSize(data.totalPages);

    return data.content;
  });

  const archiveNoteMutation = useMutation(
    async ({ noteId, archive }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}/archive`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ archive: archive }),
        }
      );

      const data = await response.json();

      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const onDeleteHandler = (note) => {
    setClickedNote(note);
    setIsDeleting(true);
  };

  const onUpdateHandler = (note) => {
    setClickedNote(note);
    setIsUpdating(true);
  };

  return (
    <>
      {isDeleting && (
        <DeleteNoteModal
          {...clickedNote}
          onClose={() => setIsDeleting(false)}
        />
      )}
      {isUpdating && (
        <EditNoteModal
          noteId={clickedNote.noteId}
          onClose={() => setIsUpdating(false)}
          editing={true}
        />
      )}
      <div className={classes["notes-list"]}>
        <ul className={classes["notes-container"]}>
          {!isLoading &&
            notes.map((note) => (
              <NoteCard
                key={note.noteId}
                {...note}
                onArchiveHandler={archiveNoteMutation.mutate}
                onDeleteHandler={onDeleteHandler}
                onUpdateHandler={onUpdateHandler}
              />
            ))}
        </ul>
        <Stack mt={3.5}>
          <Pagination
            className={classes["notes-list__pagination"]}
            count={pageSize}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default NotesList;
