import React from "react";
import CategoriesList from "../CategoriesList/CategoriesList";
import CreateCategoriesForm from "../CreateCategoriesForm/CreateCategoriesForm";
import Modal from "../UI/Modal/Modal";

const EditCategoriesModal = (props) => {
  const { onClose } = props;

  return (
    <Modal onClose={onClose}>
      <h1 className="modal-title">Edit Categories</h1>
      <h2 className="modal-subtitle">Create category</h2>
      <CreateCategoriesForm />
      <h2 className="modal-subtitle">Delete categories</h2>
      <CategoriesList />
    </Modal>
  );
};

export default EditCategoriesModal;
