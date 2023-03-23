import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

const DeleteNoteModal = (props) => {
  const { title, noteId, onClose } = props;

  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(
    async (noteId) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notes");
        onClose();
      },
    }
  );

  return (
    <Modal onClose={onClose}>
      <h1 className="modal-title">
        Are you sure that you want to delete '{title}' note?
      </h1>
      <div className="modal-btns">
        <Button onClick={() => deleteNoteMutation.mutate(noteId)}>
          Accept
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
