"use client";

import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UsersContext } from "../context/UsersContext";

const paginationModel = { page: 0, pageSize: 10 };

const BASE_PIXELA_URL = "https://pixe.la";

const page = () => {
  const [pixels, setPixels] = useState();
  const { user } = useContext(UsersContext);
  const [graphs, setGraphs] = useState();
  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [currentPixel, setCurrentPixel] = useState({
    newQuantity: "",
    newDescription: "",
  });

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setCurrentPixel((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "graph_id", headerName: "Graph ID" },
    { field: "graph_name", headerName: "Name" },
    { field: "graph_unit", headerName: "Unit" },
    { field: "graph_type", headerName: "Type" },
    { field: "date", headerName: "Date" },
    { field: "quantity", headerName: "Quantity" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const deletePixel = async (id) => {
          try {
            for (let i = 0; i < 8; i++) {
              await fetch(
                `${BASE_PIXELA_URL}/v1/users/${user[0].username}/graphs/${params.row.graph_id}/${params.row.date}`,
                {
                  method: "DELETE",
                  headers: {
                    "X-USER-TOKEN": user[0].token,
                  },
                }
              );
            }

            await fetch(`/api/pixels/${id}`, {
              method: "DELETE",
            });
            fetchPixels();
          } catch (error) {
            console.error(error);
          }
        };

        const editPixel = async (id) => {
          try {
            for (let i = 0; i < 8; i++) {
              await fetch(
                `${BASE_PIXELA_URL}/v1/users/${user[0].username}/graphs/${params.row.graph_id}/${params.row.date}`,
                {
                  method: "PUT",
                  headers: {
                    "X-USER-TOKEN": user[0].token,
                  },
                  body: JSON.stringify({
                    quantity: currentPixel.newQuantity,
                    description: currentPixel.newDescription,
                  }),
                }
              );
            }

            await fetch(`/api/pixels/${id}`, {
              method: "PUT",
              body: JSON.stringify(currentPixel),
            });
            fetchPixels();
            handleEditClose();
          } catch (error) {
            console.error(error);
          }
        };

        return (
          <>
            <IconButton
              onClick={() => {
                setCurrentPixel({
                  newQuantity: params.row.quantity,
                  newDescription: params.row.description,
                });
                handleEditOpen();
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton>
              <DeleteIcon
                color="error"
                onClick={() => {
                  deletePixel(params.id);
                }}
              />
            </IconButton>
            <IconButton
              target="_blank"
              href={`${BASE_PIXELA_URL}/v1/users/${user[0]?.username}/graphs/${params.row.graph_id}.html`}
            >
              <VisibilityIcon color="info" />
            </IconButton>

            <Dialog open={openEdit} onClose={handleEditClose}>
              <DialogTitle>Edit pixel</DialogTitle>
              <DialogContent>
                <Stack gap={2}>
                  <TextField
                    name="newQuantity"
                    value={currentPixel.newQuantity}
                    onChange={handleEditChange}
                    variant="filled"
                    label="Quantity"
                  />
                  <TextField
                    name="newDescription"
                    value={currentPixel.newDescription}
                    onChange={handleEditChange}
                    variant="filled"
                    label="Description"
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    editPixel(params.id);
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
    },
  ];

  const [input, setInput] = useState({
    id: "", // Just the ID
    date: "",
    quantity: "",
    description: "",
  });

  const createPixel = async () => {
    try {
      await fetch("/api/pixels", {
        method: "POST",
        body: JSON.stringify(input),
      });

      const selectedGraph = graphs.find((g) => g.id === input.id);
      const graphName = selectedGraph?.graph_id || "";

      for (let i = 0; i < 8; i++) {
        await fetch(
          `${BASE_PIXELA_URL}/v1/users/${user[0].username}/graphs/${graphName}`,
          {
            method: "POST",
            headers: {
              "X-USER-TOKEN": user[0].token,
            },
            body: JSON.stringify({
              date: input.date,
              quantity: input.quantity,
              optionalData: input.description,
            }),
          }
        );
      }

      handleClose();
      fetchPixels();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const fetchPixels = async () => {
    try {
      const response = await fetch("/api/pixels");
      const pixels = await response.json();
      setPixels(pixels);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGraphs = async () => {
    const response = await fetch("/api/graphs");
    const graphs = await response.json();
    setGraphs(graphs);
  };

  useEffect(() => {
    fetchPixels();
    fetchGraphs();
  }, []);

  return (
    <Navigation>
      <Button
        variant="contained"
        color="success"
        size="large"
        fullWidth
        onClick={handleClickOpen}
      >
        Add pixel
      </Button>
      <Paper sx={{ height: "100vh", width: "100%" }}>
        <DataGrid
          rows={pixels}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoPageSize
          disableColumnMenu
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new pixel</DialogTitle>
        <DialogContent>
          <Stack gap={2} p={2} m={2}>
            <FormControl>
              <InputLabel>Graph</InputLabel>
              <Select
                label="Graph"
                name="id"
                value={input.id}
                onChange={handleChange}
              >
                {graphs &&
                  graphs.map((graph) => (
                    <MenuItem key={graph.id} value={graph.id}>
                      {graph.graph_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              variant="filled"
              label="Date"
              value={input.date}
              name="date"
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Quantity"
              value={input.quantity}
              name="quantity"
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Description"
              value={input.description}
              name="description"
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              createPixel();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Navigation>
  );
};

export default page;
