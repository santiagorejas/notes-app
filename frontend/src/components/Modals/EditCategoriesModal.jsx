import React from "react";
import Modal from "../UI/Modal/Modal";

const EditCategoriesModal = (props) => {
  const { onClose } = props;

  return (
    <Modal onClose={onClose}>
      <h1>Edit Categories</h1>
    </Modal>
  );
};

export default EditCategoriesModal;
