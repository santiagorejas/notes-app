import React from "react";
import classes from "./NoteCard.module.css";

const NoteCard = (props) => {
  const { title } = props;

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>Last edited: </p>
      </div>
      <div>
        <button>Archive</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
