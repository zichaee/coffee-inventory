import { fetchGet, fetchPut } from "../controller.jsx"
import {
  CustomPaper,
  CustomDataGrid,
  FormDialog,
} from "../components.jsx"
import {
  columnsOrders,
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
import { Add, Remove } from "@mui/icons-material";

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState([""]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierName, setSupplierName] = useState('');

  const handleChangeSupplierName = (event) => {
    setSupplierName(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSupplierName('');
  };
  const onSubmitContent = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPut(`/api/put/orders/${token}/${formJson.note}/${formJson.supplier_id}`)
      .then((response) => {
        const maxItemNumber = Math.max(...Object.keys(formJson)
          .filter(key => key.startsWith('item_name_'))
          .map(key => parseInt(key.replace('item_name_', '')))) + 1;

        for (let i = 0; i < maxItemNumber; i++) {
          fetchPut(`/api/put/order_details/${token}/${response.meta.last_row_id}/${formJson['item_name_' + i]}/${formJson['quantity_' + i]}/${formJson['unit_' + i]}`)
            .then((_) => {})
            .catch((error) => {
              console.error('Error creating order details: ', error);
            });
        }

        handleClose();
        location.reload();
      })
      .catch((error) => {
        console.error('Error creating order: ', error);
      });

    handleClose();
  }
  const handleAddField = () => {
    setFields([...fields, ""]);
  };
  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/orders/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/suppliers/${token}`)
      .then((data) => {
        setSupplierNames(data)
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {});
  }, []);

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
        <CustomDataGrid
          columns={columnsOrders}
          rows={rows}
          getRowId={(row) => row.order_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          Create Order
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Create Order'
          contentText="The order you submit will appear in the selected supplier's dashboard. Based on your order, the supplier can then create an invoice, which you can choose to approve or deny."
          content={
            <Box>
              <FormControl autoFocus variant="filled" margin="dense" fullWidth required>
                <InputLabel id="supplier-name-label">Supplier Name</InputLabel>
                <Select
                  labelId="supplier-name-label"
                  label="Supplier Name"
                  value={supplierName}
                  onChange={handleChangeSupplierName}
                  name="supplier_id"
                >
                  {[...supplierNames].map((_, i) =>
                    <MenuItem value={supplierNames[i].supplier_id}>{`${supplierNames[i].supplier_id} - ${supplierNames[i].supplier_name}`}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <TextField
                multiline
                rows={5}
                maxRows={50}
                fullWidth
                margin="dense"
                variant="filled"
                name="note"
                label="Note to Supplier"
              />
              <Stack>
                <Typography variant='h6' sx={{ mt: 2 }}>
                  Items
                </Typography>
                {fields.map((field, index) => (
                  <Box key={index}>
                    <CustomPaper sx={{ mt: 1 }}>
                      <Stack>
                        <Typography variant='overline'>
                          {`Item ${index + 1}`}
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`item_name_${index}`}
                          label={`Name`}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`quantity_${index}`}
                          label={`Quantity`}
                          type="number"
                        />
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`unit_${index}`}
                          label={`Unit`}
                        />
                      </Stack>
                      <Button sx={{ mt: 1.5 }} variant="text" disabled={fields.length === 1} startIcon={<Remove />} onClick={() => handleRemoveField(index)} color="error">
                        Remove Item
                      </Button>
                    </CustomPaper>
                  </Box>
                ))}
                <Button sx={{ mt: 1 }} variant="outlined" startIcon={<Add />} onClick={handleAddField}>
                  Add More Item
                </Button>
              </Stack>
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Submit'
        />
      </Stack>
    </Stack>
  );
}
