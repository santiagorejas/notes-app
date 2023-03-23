import React from "react";
import { TextField } from "@mui/material";
import Button from "../UI/Button/Button";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

const CreateCategoriesForm = () => {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values, actions) => {
      actions.resetForm({ initialValues: { name: "" } });
      createCategoryMutation.mutate(values.name);
    },
  });

  const createCategoryMutation = useMutation(
    async (name) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        formik.resetForm();
      },
    }
  );

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <TextField
        placeholder="Insert category name..."
        id="name"
        name="name"
        initialValues={formik.values.name}
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <Button>Create</Button>
    </form>
  );
};

export default CreateCategoriesForm;
