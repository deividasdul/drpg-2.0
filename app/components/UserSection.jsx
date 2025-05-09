import { Stack, Typography } from "@mui/material";
import React from "react";

const UserSection = ({ title, children }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Stack gap={4} p={4} m={4} width={"50vw"}>
        {children}
      </Stack>
    </>
  );
};

export default UserSection;
