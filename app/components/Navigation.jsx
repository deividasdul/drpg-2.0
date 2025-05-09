import React from "react";
import { AppBar, Divider, Drawer, Toolbar, Box } from "@mui/material";
import pixelaItems from "../constants/NavigationItems";
import NavigationSection from "./NavigationSection";

const Navigation = ({ children }) => {
  const drawerWidth = 240;

  return (
    <Box display={"flex"}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar />
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
      >
        <Toolbar />
        <Divider />
        <NavigationSection title={"Pixela"} items={pixelaItems} />
        <NavigationSection title={"Sheety"} items={[]} />
      </Drawer>
      <Box p={4} flexGrow={1}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Navigation;
