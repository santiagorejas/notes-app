import React from "react";
import { AiFillFolderOpen, AiFillEdit, AiFillDelete } from "react-icons/ai";
import formatDate from "../../utils/format-date";
import classes from "./NoteCard.module.css";

const NoteCard = (props) => {
  const {
    title,
    lastEdited,
    archived,
    noteId,
    onArchiveHandler,
    onDeleteHandler,
    onUpdateHandler,
    onSeeDetailsHandler,
  } = props;

  return (
    <li className={classes["note-card"]}>
      <div className={classes["note-card__left-side"]}>
        <h1
          className={classes["note-card__title"]}
          onClick={() => onSeeDetailsHandler(props)}
        >
          {title}
        </h1>
        <p className={classes["note-card__last-edited"]}>
          Last edited: {formatDate(lastEdited)}
        </p>
      </div>
      <div className={classes["note-card__right-side"]}>
        <button
          onClick={() => onArchiveHandler({ noteId, archive: !archived })}
        >
          <AiFillFolderOpen />
        </button>
        <button onClick={() => onUpdateHandler(props)}>
          <AiFillEdit />
        </button>
        <button onClick={() => onDeleteHandler(props)}>
          <AiFillDelete />
        </button>
      </div>
    </li>
  );
};

export default NoteCard;
