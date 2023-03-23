import React from "react";
import { Button } from "@mui/material";
import classes from "./CategoryCard.module.css";

const CategoryCard = (props) => {
  const { name, categoryId, onDeleteCategory } = props;

  return (
    <li className={classes["category-card"]}>
      <h3>{name}</h3>
      <Button variant="outlined" onClick={() => onDeleteCategory(categoryId)}>
        Delete
      </Button>
    </li>
  );
};

export default CategoryCard;
