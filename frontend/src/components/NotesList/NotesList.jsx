import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import NoteCard from "./NoteCard/NoteCard";
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
    <div>
      <h1>NotesList</h1>
      {notes.map((note) => (
        <NoteCard key={note.noteId} {...note} />
      ))}
    </div>
  );
};

export default NotesList;
