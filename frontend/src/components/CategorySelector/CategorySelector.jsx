import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useQuery } from "react-query";
import classes from "./CategorySelector.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

const CategorySelector = (props) => {
  const { category, setCategory } = props;

  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useQuery(
    "categories",
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/categories`
      );

      const data = await response.json();

      return data;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <div className={classes["category-selector-container"]}>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className="text-error">{error.message}</p>
      ) : (
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="categories-label">Categories</InputLabel>
          <Select
            labelId="categories-label"
            id="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoWidth
            label="Categories"
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>Filter by category</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem ket={category.categoryId} value={category.categoryId}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default CategorySelector;
