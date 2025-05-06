"use client";

import React, { useContext, useState } from "react";
import Navigation from "../components/Navigation";
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UsersContext } from "../context/UsersContext";
import Snack from "../components/Snack";
import DialogAlert from "../components/DialogAlert";

// TODO: FIX SNACKBARS FOR ERRORS
// TODO: DELETION ONLY 25%
// TODO: FIELD VALIDATION
// TODO: ENCRYPT TOKEN

const Pixela = () => {
  const { user, createUser, updateUser, deleteUser } = useContext(UsersContext);

  const [token, setToken] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [input, setInput] = useState({
    token: "",
    username: "",
    agreeTermsOfService: "no",
    notMinor: "no",
  });

  const [openSnack, setSnackOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogOptions, setDialogOptions] = useState({
    title: "",
    content: "",
    action: null,
  });

  const handleSnackClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClosse = () => {
    setSnackOpen(false);
  };

  const handleDialogClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const create = () => {
    createUser(input);

    setInput({
      token: "",
      username: "",
      agreeTermsOfService: "",
      notMinor: "",
    });

    setSnackMessage("User successfully created");
    handleSnackClick();
  };

  const update = () => {
    updateUser(token);

    setToken("");

    setSnackMessage("User successfully updated");
    handleSnackClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToken = (e) => {
    setToken(e.target.value);
  };

  return (
    <Navigation>
      <Typography variant="h3" gutterBottom>
        Create a new Pixela user
      </Typography>
      <Stack gap={4} p={4} m={4} width={"50vw"}>
        <TextField
          label="Token"
          name="token"
          value={input.token}
          onChange={handleChange}
          disabled={user[0]}
          helperText="The token shall consist of at least 8 characters"
          required
        />
        <TextField
          label="Username"
          name="username"
          value={input.username}
          onChange={handleChange}
          disabled={user[0]}
          required
        />
        <FormControl>
          <InputLabel>Agree Terms of Service</InputLabel>
          <Select
            label="Agree Terms of Service"
            name="agreeTermsOfService"
            value={input.agreeTermsOfService}
            onChange={handleChange}
            disabled={user[0]}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Not Minor</InputLabel>
          <Select
            label="Not Minor"
            name="notMinor"
            value={input.notMinor}
            onChange={handleChange}
            disabled={user[0]}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={
            user[0] ||
            input.agreeTermsOfService !== "yes" ||
            input.notMinor !== "yes"
          }
          variant="contained"
          color="success"
          size="large"
          onClick={create}
        >
          Create
        </Button>
      </Stack>
      <Typography variant="h3" gutterBottom>
        Pixela user {user[0]?.username}
      </Typography>
      <Stack gap={4} p={4} m={4} width={"50vw"}>
        <Link
          variant="h4"
          target="_blank"
          href={user[0] && user[0].pixela_user}
        >
          {user[0] ? user[0].pixela_user : "You do not have a Pixela user"}
        </Link>
        <Button
          variant="contained"
          color="error"
          size="large"
          disabled={!user[0]}
          onClick={() => {
            handleDialogClick();
            setDialogOptions({
              title: "Do you want to delete this user?",
              content:
                "By clicking accept, you confirm that your user will be permanently deleted from both our system and pixela",
              action: deleteUser,
            });
          }}
        >
          Delete user
        </Button>
      </Stack>
      <Typography variant="h3" gutterBottom>
        Update user token
      </Typography>
      <Stack gap={4} p={4} m={4} width={"50vw"}>
        <TextField
          label="Token"
          name="newToken"
          value={token}
          onChange={handleToken}
          disabled={!user[0]}
          helperText="The token shall consist of at least 8 characters"
        />
        <Button
          variant="contained"
          size="large"
          disabled={!user[0]}
          onClick={update}
        >
          Update
        </Button>
      </Stack>
      <Snack
        open={openSnack}
        handleClose={handleSnackClosse}
        message={snackMessage}
      />
      <DialogAlert
        open={openDialog}
        handleClose={handleDialogClose}
        title={dialogOptions.title}
        content={dialogOptions.content}
        action={dialogOptions.action}
      />
      ;
    </Navigation>
  );
};

export default Pixela;
