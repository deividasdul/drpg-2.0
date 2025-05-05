"use client";

import React, { useEffect, useState } from "react";
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
import { useSnackbar } from "notistack";

const BASE_PIXELA_URL = "https://pixe.la/";
const BASE_API_URL = "http://localhost:3000/api/users";

// TODO: SNACKBAR AFTER CREATING USER
// TODO: DELETION ONLY 25%
// TODO: FIELD VALIDATION
// TODO: SNACKBAR FOR DELETING USER
// TODO: SNACKBAR FOR UPDATING USER AND CLEARING FIELD

const Pixela = () => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [input, setInput] = useState({
    token: "",
    username: "",
    agreeTermsOfService: "no",
    notMinor: "no",
  });

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

  const handleClickVariant = (message, variant) => () => {
    enqueueSnackbar({ message }, { variant });
  };

  const createUser = async () => {
    try {
      const _ = await fetch(`${BASE_PIXELA_URL}v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(input),
      });

      try {
        const userData = {
          link: `https://pixe.la/@${input.username}`,
          username: input.username,
          token: input.token,
        };
        const _ = await fetch(BASE_API_URL, {
          method: "POST",
          body: JSON.stringify(userData),
        });
        fetchUser();
        handleClickVariant("Pixela user successfully created", "success");
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

    setInput({
      token: "",
      username: "",
      agreeTermsOfService: "",
      notMinor: "",
    });
  };

  const deleteUser = async () => {
    try {
      for (let i = 0; i < 8; i++) {
        const _ = await fetch(
          `${BASE_PIXELA_URL}v1/users/${user[0].username}`,
          {
            method: "DELETE",
            headers: {
              "X-USER-TOKEN": `${user[0]?.token}`,
            },
            body: JSON.stringify(user[0]?.username),
          }
        );
      }

      try {
        const _ = await fetch(BASE_API_URL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(user[0]?.username),
        });
        fetchUser();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const _ = await fetch(`${BASE_PIXELA_URL}v1/users/${user[0]?.username}`, {
        method: "PUT",
        headers: {
          "X-USER-TOKEN": user[0]?.token,
        },
        body: JSON.stringify({ newToken: token }),
      });

      try {
        const data = {
          token: token,
          username: user[0].username,
        };
        const _ = await fetch(BASE_API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data),
        });
        fetchUser();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(BASE_API_URL);
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        />
        <TextField
          label="Username"
          name="username"
          value={input.username}
          onChange={handleChange}
          disabled={user[0]}
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
          onClick={createUser}
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
          onClick={deleteUser}
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
          onClick={updateUser}
        >
          Update
        </Button>
      </Stack>
    </Navigation>
  );
};

export default Pixela;
