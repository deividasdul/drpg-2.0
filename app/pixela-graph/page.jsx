"use client";

import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { UsersContext } from "../context/UsersContext";

const BASE_PIXELA_URL = "https://pixe.la";

const Graph = () => {
  const [graphs, setGraphs] = useState();
  const { user } = useContext(UsersContext);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [input, setInput] = useState({
    graph_id: "",
    graph_name: "",
    graph_unit: "",
    graph_type: "",
    graph_color: "",
  });

  const [currentGraph, setCurrentGraph] = useState({
    graph_name: "",
    graph_unit: "",
    graph_color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchGraphs = async () => {
    const response = await fetch("/api/graphs");
    const graphs = await response.json();
    setGraphs(graphs);
  };

  const createGraph = async () => {
    try {
      await fetch("/api/graphs", {
        method: "POST",
        body: JSON.stringify(input),
      });
      fetchGraphs();

      for (let i = 0; i < 8; i++) {
        await fetch(`${BASE_PIXELA_URL}/v1/users/${user[0].username}/graphs`, {
          method: "POST",
          headers: {
            "X-USER-TOKEN": user[0].token,
          },
          body: JSON.stringify({
            id: input.graph_id,
            name: input.graph_name,
            unit: input.graph_unit,
            type: input.graph_type,
            color: input.graph_color,
          }),
        });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  // FIXME:
  const updateGraph = async (id) => {
    try {
      await fetch(`/api/graphs/${id}`, {
        method: "PUT",
        body: JSON.stringify({}),
      });
      fetchGraphs();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGraph = async (id) => {
    try {
      for (let i = 0; i < 8; i++) {
        await fetch(
          `${BASE_PIXELA_URL}/v1/users/${user[0].username}/graphs/${id}`,
          {
            method: "DELETE",
            headers: {
              "X-USER-TOKEN": user[0].token,
            },
          }
        );
      }

      await fetch(`/api/graphs/${id}`, {
        method: "DELETE",
      });
      fetchGraphs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGraphs();
  }, []);

  return (
    <Navigation>
      <Grid container spacing={2}>
        {graphs &&
          graphs.map((graph) => {
            return (
              <Grid key={graph.id} size={{ xs: 12, sm: 12, md: 4 }}>
                <Card>
                  <CardActionArea
                    href={`${BASE_PIXELA_URL}/v1/users/${user[0]?.username}/graphs/${graph.graph_id}.html`}
                    target="_blank"
                  >
                    <CardHeader
                      title={graph.graph_name}
                      subheader={graph.graph_id}
                    />
                  </CardActionArea>
                  <Divider />
                  <CardContent>
                    <Typography variant="subtitle1">
                      Unit: {graph.graph_unit}
                    </Typography>
                    <Typography variant="subtitle1">
                      Type: {graph.graph_type}
                    </Typography>
                    <Typography variant="subtitle1">
                      Color: {graph.graph_color}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setCurrentGraph({
                          graph_name: graph.graph_name,
                          graph_unit: graph.graph_unit,
                          graph_color: graph.graph_color,
                        });
                        handleEditOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        deleteGraph(graph.graph_id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        <Grid
          size={4}
          container
          sx={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" color="success" onClick={handleClickOpen}>
            Add new graph
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new graph</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            <TextField
              variant="filled"
              placeholder=""
              label="ID"
              name="graph_id"
              onChange={handleChange}
              value={input.graph_id}
              helperText="Validation rule: ^[a-z][a-z0-9-]{1,16}"
            />
            <TextField
              variant="filled"
              placeholder="Name"
              label=""
              name="graph_name"
              onChange={handleChange}
              value={input.graph_name}
            />
            <TextField
              variant="filled"
              placeholder="Unit"
              label=""
              name="graph_unit"
              helperText="commit, kilogram, calory..."
              onChange={handleChange}
              value={input.graph_unit}
            />
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                name="graph_type"
                onChange={handleChange}
                value={input.graph_type}
              >
                <MenuItem value="int">Int</MenuItem>
                <MenuItem value="float">Float</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Color</InputLabel>
              <Select
                label="Color"
                name="graph_color"
                onChange={handleChange}
                value={input.graph_color}
              >
                <MenuItem value="shibafu">Green</MenuItem>
                <MenuItem value="momiji">Red</MenuItem>
                <MenuItem value="sora">Blue</MenuItem>
                <MenuItem value="ichou">Yellow</MenuItem>
                <MenuItem value="ajisai">Purple</MenuItem>
                <MenuItem value="kuro">Black</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" variant="contained" onClick={createGraph}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Add new graph</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            <TextField
              variant="filled"
              placeholder="Name"
              label=""
              name="graph_name"
              onChange={handleChange}
              value={currentGraph.graph_name}
            />
            <TextField
              variant="filled"
              placeholder="Unit"
              label=""
              name="graph_unit"
              helperText="commit, kilogram, calory..."
              onChange={handleChange}
              value={currentGraph.graph_unit}
            />
            <FormControl>
              <InputLabel>Color</InputLabel>
              <Select
                label="Color"
                name="graph_color"
                onChange={handleChange}
                value={currentGraph.graph_color}
              >
                <MenuItem value="shibafu">Green</MenuItem>
                <MenuItem value="momiji">Red</MenuItem>
                <MenuItem value="sora">Blue</MenuItem>
                <MenuItem value="ichou">Yellow</MenuItem>
                <MenuItem value="ajisai">Purple</MenuItem>
                <MenuItem value="kuro">Black</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              // updateGraph(graph.graph_id);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Navigation>
  );
};

export default Graph;
