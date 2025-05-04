import { fetchGet, fetchPut } from "../controller.jsx"
import {
  CustomPaper,
  CustomDataGrid,
  FormDialog,
} from "../components.jsx"
import {
  columnsCatalogue,
} from "../data.jsx"

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";

export default function View() {
  let productID = window.location.href.split('/').pop();

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Orders</Typography>
      <Stack spacing={2}>
        <Stack
          spacing={{ xs: 2, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", alignItems: "stretch" }}
        >
          <CustomPaper>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </CustomPaper>
          <CustomPaper>
            <Typography variant="body1">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </CustomPaper>
        </Stack>
        <CustomPaper>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CustomPaper>
      </Stack>
      <CustomDataGrid
        columns={columnsCatalogue}
        rows={rows}
        getRowId={(row) => row.catalogue_id}
        onRowSelectionModelChange={() => {}}
        sx={{ maxWidth: 'calc(100vw - 112px)' }}
      />
    </Stack>
  );
}
