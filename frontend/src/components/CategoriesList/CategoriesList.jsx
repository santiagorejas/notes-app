import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CategoryCard from "../CategoryCard/CategoryCard";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import classes from "./CategoriesList.module.css";

const CategoriesList = () => {
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
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className={classes["categories-list"]}>
          {isError ? (
            <p className="text-error">{error.message}</p>
          ) : (
            categories.map((category) => (
              <CategoryCard
                ket={category.categoryId}
                {...category}
                onDeleteCategory={deleteCategoryMutation.mutate}
              />
            ))
          )}
        </ul>
      )}
    </>
  );
};

export default CategoriesList;
