import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

const CreateNoteModal = (props) => {
  const { editing, title, content, categories, onClose, noteId } = props;

  const {
    data: fetchedCategories,
    isLoading,
    error,
    isError,
  } = useQuery("categories", async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );

    const data = await response.json();

    return data;
  });

  const { data: noteDetails, isLoading: loadingNoteDetails } = useQuery(
    ["notes-details", { noteId }],
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/${noteId}`
      );

      const data = await response.json();

      return data;
    },
    { enabled: editing }
  );

  const queryClient = useQueryClient();

  const editNoteMutation = useMutation(
    async ({ note, noteId }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notes${
          editing ? `/${noteId}` : ""
        }`,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        }
      );
    },
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      categoriesId: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      content: Yup.string().max(
        255,
        "Content must be less than 255 characters."
      ),
    }),
    onSubmit: async (values, actions) => {
      editNoteMutation.mutate({
        note: values,
        noteId,
      });
      actions.resetForm();
    },
  });

  useEffect(() => {
    if (noteDetails) {
      formik.setFieldValue("title", noteDetails.title);
      formik.setFieldValue("content", noteDetails.content);
      formik.setFieldValue(
        "categoriesId",
        noteDetails.categories.map((category) => category.categoryId)
      );
    }
  }, [noteDetails]);

  return (
    <Modal onClose={onClose}>
      <h1 className="modal-title">{editing ? "Edit note" : "Create note"}</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p className="text-error">{error.message}</p>
      ) : (
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-error">{formik.errors.title}</p>
          )}
          <TextField
            label="Content"
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.content && formik.touched.content && (
            <p className="text-error">{formik.errors.content}</p>
          )}
          <FormControl>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              labelId="categories-label"
              id="categoriesId"
              name="categoriesId"
              multiple
              value={formik.values.categoriesId}
              input={<OutlinedInput label="Categories" />}
              MenuProps={MenuProps}
              onChange={(e) =>
                formik.setFieldValue("categoriesId", e.target.value)
              }
            >
              {fetchedCategories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit">{editing ? "Edit" : "Create"}</Button>
          <Button onClick={onClose}>Close</Button>
        </form>
      )}
    </Modal>
  );
};

export default CreateNoteModal;
