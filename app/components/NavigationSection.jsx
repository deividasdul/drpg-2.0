"use client";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

const NavigationSection = ({ title, items }) => {
  const { user } = useContext(UsersContext);

  return (
    <>
      <List>
        <Typography variant="h6" gutterBottom textAlign={"center"}>
          {title}
        </Typography>
        {items.map(({ label, href, icon }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton disabled={index != 0 && !user} href={href}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default NavigationSection;
