"use client";

import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { UsersContext } from "../context/UsersContext";

const BASE_PIXELA_URL = "https://pixe.la";

// TODO: FIX CONTEXT API

const UserProfile = () => {
  const { user, userProfile } = useContext(UsersContext);

  const [input, setInput] = useState({
    displayName: "",
    gravatarIconEmail: "",
    title: "",
    timezone: "",
    aboutURL: "",
    // contributeURLs: "",
    pinnedGraphID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateProfile = async () => {
    const data = {
      ...input,
      id: user[0].id,
    };
    try {
      for (let i = 0; i < 8; i++) {
        await fetch(`${BASE_PIXELA_URL}/@${user[0]?.username}`, {
          method: "PUT",
          headers: {
            "X-USER-TOKEN": user[0]?.token,
          },
          body: JSON.stringify(input),
        });
      }
      try {
        await fetch(`/api/users/profiles`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setInput({
        displayName: userProfile.display_name || "",
        gravatarIconEmail: userProfile.gravatar_icon_email || "",
        title: userProfile.title || "",
        timezone: userProfile.timezone || "",
        aboutURL: userProfile.about_url || "",
        // contributeURLs: profile.contribute_urls || "",
        pinnedGraphID: userProfile.pinned_graph_id || "",
      });
    } else {
      // Set empty defaults if no profile
      setInput({
        displayName: "",
        gravatarIconEmail: "",
        title: "",
        timezone: "",
        aboutURL: "",
        // contributeURLs: "",
        pinnedGraphID: "",
      });
    }
  }, [userProfile]); // Re-run when profile changes

  return (
    <Navigation>
      <Typography variant="h3" gutterBottom>
        Update profile
      </Typography>
      <Stack gap={4} p={4} m={4} width={"50vw"}>
        <Typography variant="subtitle1" gutterBottom>
          Reference photo with the numbers that change after editing the profile
        </Typography>
        <img
          src={
            "https://cdn-ak.f.st-hatena.com/images/fotolife/a/a-know/20201015/20201015183011.png"
          }
          alt="Reference image"
        />
        <TextField
          label="Display Name"
          name="displayName"
          value={input.displayName}
          onChange={handleChange}
          helperText="(1) Your public display name"
        />
        <TextField
          label="Gravatar Icon Email"
          name="gravatarIconEmail"
          value={input.gravatarIconEmail}
          onChange={handleChange}
          helperText="(2) Email for your Gravatar profile picture"
        />
        <TextField
          label="Title"
          name="title"
          value={input.title}
          onChange={handleChange}
          helperText="(3) Your title or role (supporters only)"
          disabled
        />
        <TextField
          label="Timezone"
          name="timezone"
          value={input.timezone}
          onChange={handleChange}
          helperText="(4) Your time zone (affects daily tracking)"
        />
        <TextField
          label="About URL"
          name="aboutURL"
          value={input.aboutURL}
          onChange={handleChange}
          helperText="(5) One external link to show on your profile"
          disabled
        />
        {/* <TextField
          label="Contribute URLs"
          name="contributeURLs"
          value={input.contributeURLs}
          onChange={handleChange}
          helperText="(6) Links to your Pixela-related projects or articles"
          disabled
        /> */}
        <TextField
          label="Pinned Graph ID"
          name="pinnedGraphID"
          value={input.pinnedGraphID}
          onChange={handleChange}
          helperText="(7) ID of the graph to pin on your profile"
        />
        <Button variant="contained" size="large" onClick={updateProfile}>
          Update
        </Button>
      </Stack>
    </Navigation>
  );
};

export default UserProfile;
