import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import NoteCard from "../NoteCard/NoteCard";
import Button from "../UI/Button/Button";
import classes from "./NotesList.module.css";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const { sendRequest, isLoading, error, clearError } = useHttp();

  useEffect(() => {
    const fetchNotes = async () => {
      console.log(`${import.meta.env.VITE_API_URL}/api/v1/notes`);
      const data = await sendRequest(
        `${import.meta.env.VITE_API_URL}/api/v1/notes`
      );

      setNotes(data.content);
    };

    fetchNotes();
  }, []);

  return (
    <div className={classes["notes-list"]}>
      <div>
        <h1>NotesList</h1>
        <div>
          <Button>Create Note</Button>
          <Button>Create Category</Button>
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
