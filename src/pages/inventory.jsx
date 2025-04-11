import { fetchGet } from "../controller.jsx";
import {
  columnsInventory,
} from "../data.jsx"
import {
  CustomPaper,
  CustomDataGrid,
} from "../components.jsx"

import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
} from "@mui/material";

export default function Inventory() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/inventory/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Inventory</Typography>
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
        <CustomDataGrid
          columns={columnsInventory}
          rows={rows}
          getRowId={(row) => row.inventory_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
      </Stack>
    </Stack>
  );
}
