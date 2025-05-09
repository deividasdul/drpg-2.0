import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  disabled = false,
  color = "primary",
  action,
  label,
}) => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color={color}
      size="large"
      onClick={action}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
