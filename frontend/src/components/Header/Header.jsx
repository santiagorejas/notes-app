import React, { useState } from "react";
import EditCategoriesModal from "../Modals/EditCategoriesModal";
import Button from "../UI/Button/Button";
import classes from "./Header.module.css";

const Header = (props) => {
  const { showArchived, onShowArchivedClick } = props;

  const [isEditingCategories, setIsEditingCategories] = useState(false);

  return (
    <>
      {isEditingCategories && (
        <EditCategoriesModal onClose={() => setIsEditingCategories(false)} />
      )}
      <header className={classes["header"]}>
        <h1 className={classes["header__title"]}>NotesList</h1>
        <div className={classes["header__buttons"]}>
          <Button>Create Note</Button>
          <Button onClick={() => setIsEditingCategories(true)}>
            Create Category
          </Button>
          <button
            className={classes["header__archived-btn"]}
            onClick={onShowArchivedClick}
          >
            {showArchived ? "Show unarchived" : "Show archived"}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
