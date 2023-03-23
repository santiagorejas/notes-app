import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteNoteModal from "../Modals/DeleteNoteModal";
import NoteCard from "../NoteCard/NoteCard";
import Button from "../UI/Button/Button";
import classes from "./NotesList.module.css";

const NotesList = () => {
  const [showArchived, setShowArchived] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(1);
  const [clickedNote, setClickedNote] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <>
      {isDeleting && (
        <DeleteNoteModal
          {...clickedNote}
          onClose={() => setIsDeleting(false)}
        />
      )}
      <div className={classes["notes-list"]}>
        <div className={classes["notes-list__header"]}>
          <h1 className={classes["notes-list__title"]}>NotesList</h1>
          <div className={classes["notes-list__buttons"]}>
            <Button>Create Note</Button>
            <Button>Create Category</Button>
            <button
              className={classes["notes-list__archived-btn"]}
              onClick={() => {
                setShowArchived((pre) => !pre);
                setPage(1);
              }}
            >
              {showArchived ? "Show unarchived" : "Show archived"}
            </button>
          </div>
        </div>
        <ul className={classes["notes-container"]}>
          {!isLoading &&
            notes.map((note) => (
              <NoteCard
                key={note.noteId}
                {...note}
                onArchiveHandler={archiveNoteMutation.mutate}
                onDeleteHandler={onDeleteHandler}
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
