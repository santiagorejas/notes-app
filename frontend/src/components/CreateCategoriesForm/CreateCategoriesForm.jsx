import React from "react";
import { TextField } from "@mui/material";
import Button from "../UI/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";

const CreateCategoriesForm = () => {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required()
        .max(30, "Category name must be less than 30 characters."),
    }),
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
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name && (
        <p className="text-error">{formik.errors.name}</p>
      )}
      <Button>Create</Button>
    </form>
  );
};

export default CreateCategoriesForm;
