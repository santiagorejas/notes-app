import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import NoteCard from "../NoteCard/NoteCard";
import Button from "../UI/Button/Button";
import classes from "./NotesList.module.css";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);

  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await sendRequest(
        `${import.meta.env.VITE_API_URL}/api/v1/notes?page=${
          page - 1
        }&size=10&archived=${showArchived}`
      );

      setNotes(data.content);
    };

    fetchNotes();
  }, [showArchived, page]);

  return (
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
            }}
          >
            {showArchived ? "Show unarchived" : "Show archived"}
          </button>
        </div>
      </div>
      <ul className={classes["notes-container"]}>
        {notes.map((note) => (
          <NoteCard key={note.noteId} {...note} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
