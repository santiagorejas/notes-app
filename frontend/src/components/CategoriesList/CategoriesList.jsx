import React from "react";
import { useQuery } from "react-query";
import CategoryCard from "../CategoryCard/CategoryCard";
import classes from "./CategoriesList.module.css";

const CategoriesList = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("categories", async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );

    const data = await response.json();

    return data;
  });

  return (
    <ul className={classes["categories-list"]}>
      {!isLoading &&
        categories.map((category) => <CategoryCard {...category} />)}
    </ul>
  );
};

export default CategoriesList;
