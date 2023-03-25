import { useQuery } from "react-query";
import formatDate from "../../utils/format-date";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./ViewNoteDetailsModal.module.css";

const ViewNoteDetailsModal = (props) => {
  const { noteId, onClose } = props;

  const {
    data: notes,
    isLoading,
    error,
    isError,
  } = useQuery(["notes-details", { noteId }], async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}`
    );

    const data = await response.json();

    return data;
  });

  return (
    <Modal onClose={onClose}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {isError ? (
            <p className="text-error">{error.message}</p>
          ) : (
            <>
              <h1 className="modal-title">{notes.title}</h1>
              <div className={classes["note-details__dates"]}>
                <span className={classes["note-details__date"]}>
                  Last edited: {formatDate(notes.lastEdited)}
                </span>
                <span className={classes["note-details__date"]}>
                  Created at: {formatDate(notes.createdAt)}
                </span>
              </div>
              <p className={classes["note-details__description"]}>
                {notes.content}
              </p>
              <h3 className="modal-subtitle">Categories</h3>
              <ul className={classes["note-details__categories"]}>
                {notes.categories.map((category) => (
                  <li>{category.name}</li>
                ))}
              </ul>
            </>
          )}
          <Button onClick={onClose}>Close</Button>}
        </>
      )}
    </Modal>
  );
};

export default ViewNoteDetailsModal;
