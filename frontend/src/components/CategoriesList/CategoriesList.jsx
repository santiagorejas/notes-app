import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation(
    async (categoryId) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/categories/${categoryId}`,
        { method: "DELETE" }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );

  return (
    <ul className={classes["categories-list"]}>
      {!isLoading &&
        categories.map((category) => (
          <CategoryCard
            ket={category.categoryId}
            {...category}
            onDeleteCategory={deleteCategoryMutation.mutate}
          />
        ))}
    </ul>
  );
};

export default CategoriesList;
