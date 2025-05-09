"use client";

import React, { useContext, useState } from "react";
import {
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UsersContext } from "../context/UsersContext";
import CustomButton from "../components/CustomButton";
import AlertDialog from "../components/AlertDialog";
import UserSection from "../components/UserSection";

// TODO: FIX SNACKBARS FOR ERRORS
// TODO: DELETION ONLY 25%
// TODO: FIELD VALIDATION
// TODO: ENCRYPT TOKEN

const Pixela = () => {
  const { user, createUser, updateUser, deleteUser } = useContext(UsersContext);

  const [input, setInput] = useState({
    token: "",
    username: "",
    agreeTermsOfService: "no",
    notMinor: "no",
  });
  const [newToken, setNewToken] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToken = (e) => {
    setNewToken(e.target.value);
  };

  return (
    <>
      {!user && (
        <>
          <UserSection title={"Create a new Pixela user"}>
            <TextField
              label="Token"
              name="token"
              value={input.token}
              onChange={handleChange}
              disabled={user}
              helperText="The token shall consist of at least 8 characters"
              required
            />
            <TextField
              label="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
              disabled={user}
              required
            />
            <FormControl>
              <InputLabel>Agree Terms of Service</InputLabel>
              <Select
                label="Agree Terms of Service"
                name="agreeTermsOfService"
                value={input.agreeTermsOfService}
                onChange={handleChange}
                disabled={user}
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
                disabled={user}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            <CustomButton
              disabled={
                user ||
                input.agreeTermsOfService !== "yes" ||
                input.notMinor !== "yes"
              }
              color={"success"}
              action={() => {
                createUser(input);
                setInput({
                  token: "",
                  username: "",
                  agreeTermsOfService: "",
                  notMinor: "",
                });
              }}
              label={"Create"}
            />
          </UserSection>
        </>
      )}

      <UserSection title={`Pixela user`}>
        <Link variant="h4" target="_blank" href={user && user.pixela_user}>
          {user ? user.pixela_user : "You do not have a Pixela user"}
        </Link>
        <CustomButton
          disabled={!user}
          color={"error"}
          action={() => {
            handleDialogOpen();
          }}
          label={"Delete user"}
        />

        <AlertDialog
          isOpen={isDialogOpen}
          close={handleDialogClose}
          title={"Do you want to delete this user?"}
          content={
            "By clicking accept, you confirm that your user will be permanently deleted from both our system and pixela"
          }
          action={deleteUser}
        />
      </UserSection>

      <UserSection title={"Update user token"}>
        <TextField
          label="Token"
          name="newToken"
          value={newToken}
          onChange={handleToken}
          disabled={!user}
          helperText="The token shall consist of at least 8 characters"
        />
        <CustomButton
          action={() => {
            updateUser(newToken);
            setNewToken("");
          }}
          label={"Update"}
        />
      </UserSection>
    </>
  );
};

export default Pixela;
