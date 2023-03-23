import React from "react";
import { AiFillFolderOpen, AiFillEdit, AiFillDelete } from "react-icons/ai";
import formatDate from "../../utils/format-date";
import { useHttp } from "../../hooks/use-http";
import classes from "./NoteCard.module.css";

const NoteCard = (props) => {
  const { title, lastEdited, archived, noteId, onRemoveArchivedNote } = props;
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const onArchiveHandler = async () => {
    try {
      const data = await sendRequest(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}/archive`,
        "PUT",
        JSON.stringify({
          archive: !archived,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      onRemoveArchivedNote(noteId, !archived);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className={classes["note-card"]}>
      <div className={classes["note-card__left-side"]}>
        <h1>{title}</h1>
        <p className={classes["note-card__last-edited"]}>
          Last edited: {formatDate(lastEdited)}
        </p>
      </div>
      <div className={classes["note-card__right-side"]}>
        <button onClick={onArchiveHandler}>
          <AiFillFolderOpen />
        </button>
        <button>
          <AiFillEdit />
        </button>
        <button>
          <AiFillDelete />
        </button>
      </div>
    </li>
  );
};

export default NoteCard;
