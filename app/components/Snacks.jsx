"use client";

import React from "react";
import { SnackbarProvider } from "notistack";

const Snacks = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default Snacks;
