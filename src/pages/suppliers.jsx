import { fetchGet, fetchPut } from "../controller.jsx"
import {
  columnsSuppliers,
} from "../data.jsx"
import {
  CustomPaper,
  CustomDataGrid,
  FormDialog,
} from "../components.jsx"

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
} from "@mui/material";

export default function Suppliers() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitContent = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPut(`/api/put/suppliers/${token}/${formJson.name}/${formJson.phone_number}/${formJson.email}/${formJson.address}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error adding supplier data: ', error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/suppliers/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Suppliers</Typography>
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
          columns={columnsSuppliers}
          rows={rows}
          getRowId={(row) => row.supplier_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Supplier
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Add Supplier'
          contentText="You can add or edit the details of your suppliers here."
          content={
            <Box>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="phone_number"
                label="Phone Number"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="email"
                label="Email"
                type="text"
                fullWidth
                variant="filled"
              />
              <TextField
                required
                margin="dense"
                id="name"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="filled"
              />
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Add Supplier'
        />
      </Stack>
    </Stack>
  );
}
