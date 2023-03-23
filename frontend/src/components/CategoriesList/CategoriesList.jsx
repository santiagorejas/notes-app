import React from "react";
import { useQuery } from "react-query";
import CategoryCard from "../CategoryCard/CategoryCard";

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
    <div>
      <h2 className="modal-subtitle">CategoriesList</h2>
      <ul>
        {!isLoading &&
          categories.map((category) => <CategoryCard {...category} />)}
      </ul>
    </div>
  );
};

export default CategoriesList;
