"use client";

import {
  AppBar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";

import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { UsersContext } from "../context/UsersContext";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import ImageIcon from "@mui/icons-material/Image";

const pixelaItems = [
  {
    label: "User",
    href: "pixela-user",
    icon: <PersonIcon />,
  },
  {
    label: "Profile",
    href: "pixela-user-profile",
    icon: <ManageAccountsIcon />,
  },
  {
    label: "Graph",
    href: "pixela-graph",
    icon: <AutoGraphIcon />,
  },
  {
    label: "Pixel",
    href: "pixela-pixel",
    icon: <ScatterPlotIcon />,
  },
];

const Navigation = ({ children }) => {
  const { user } = useContext(UsersContext);

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            Pixela
          </Typography>
          {pixelaItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                disabled={index != 0 && !user[0]}
                href={item.href}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            Sheety
          </Typography>
          {["Temp"].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={text.toLowerCase()}>
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Navigation;
