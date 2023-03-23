import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
  } = useQuery("categories", async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );

    const data = await response.json();

    return data;
  });

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
      title: title || "",
      content: content || "",
      categories: categories || [],
    },
    onSubmit: async (values, actions) => {
      editNoteMutation.mutate({
        note: values,
        noteId,
      });
      actions.resetForm();
    },
  });

  return (
    <Modal onClose={onClose}>
      <h1 className="modal-title">{editing ? "Edit note" : "Create note"}</h1>
      {!isLoading && (
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            label="Content"
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          <FormControl>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              labelId="categories-label"
              id="categories"
              name="categories"
              multiple
              value={formik.values.categories}
              input={<OutlinedInput label="Categories" />}
              MenuProps={MenuProps}
              onChange={(e) =>
                formik.setFieldValue("categories", e.target.value)
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
