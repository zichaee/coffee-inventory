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
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Add, Remove } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);

  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/user_role/${token}`)
      .then((data) => {
        setPermissions(data);
      })
      .catch((error) => {
        console.error('Error fetching permissions data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (permissions.access_orders_read == 0) {
    return;
  }

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState([""]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const [productNames, setProductNames] = useState([]);

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
          fetchPut(`/api/put/order_details/${token}/${response.meta.last_row_id}/${formJson['item_name_' + i]}/${formJson['quantity_' + i]}`)
            .then((_) => {
              handleClose();
              location.reload();
            })
            .catch((error) => {
              console.error('Error creating order details: ', error);
            });
        }
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

  const handleSeeDetails = (params) => {
    const orderID = params.row.order_id;
    window.location.assign(`/order-details/${orderID}`);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClickDeleteOpen = (params) => {
    const orderDetailID = params.row.order_detail_id;
    localStorage.setItem('current_order_id', orderDetailID);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    localStorage.removeItem('current_order_id');
    setDeleteOpen(false);
  };
  const onSubmitDelete = (event) => {
    const token = localStorage.getItem('auth_token');

    fetchDelete(`/api/delete/orders/${token}/${localStorage.getItem('current_order_id')}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting orders data: ', error);
      });
  };

  // Add the action buttons
  const columnsOrdersWithActions = [{
    field: 'actions',
    type: 'actions',
    sortable: false,
    getActions: (params) => [
      <GridActionsCellItem icon={<VisibilityIcon />} label="See Details" onClick={() => {handleSeeDetails(params)}} />,
      <GridActionsCellItem icon={<DeleteForeverIcon />} label="Delete" onClick={() => handleClickDeleteOpen(params)} />,
    ],
  }].concat(columnsOrders);

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
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/catalogue/${token}`)
      .then((data) => {
        setProductNames(data)
      })
      .catch((error) => {
        console.error('Error fetching catalogue data:', error);
      })
      .finally(() => {});
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Daftar Purchase Order</Typography>
      <Stack spacing={2}>
        <CustomDataGrid
          columns={columnsOrdersWithActions}
          rows={rows}
          getRowId={(row) => row.order_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="contained" onClick={handleClickOpen}>
          Buat Purchase Order
        </Button>
        <FormDialog
          onSubmitContent={onSubmitDelete}
          open={deleteOpen}
          title='Delete Product'
          contentText="Apakah Anda yakin ingin menghapus produk ini dari katalog?"
          content={<></>}
          handleClose={handleDeleteClose}
          submitLabel='Delete Product'
        />
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Buat Purchase Order'
          contentText="Anda dapat memasukkan data pesanan Anda di sini. Surat Purchase Order dapat dicetak setelah pesanan dibuat."
          content={
            <Box>
              <FormControl autoFocus variant="filled" margin="dense" fullWidth required>
                <InputLabel id="supplier-name-label">Nama Supplier</InputLabel>
                <Select
                  labelId="supplier-name-label"
                  label="Nama Supplier"
                  value={supplierName}
                  onChange={handleChangeSupplierName}
                  name="supplier_id"
                >
                  {[...supplierNames].map((_, i) =>
                    <MenuItem value={supplierNames[i].supplier_id}>{`${decodeURI(supplierNames[i].supplier_id)} - ${decodeURI(supplierNames[i].supplier_name)}`}</MenuItem>
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
                label="Catatan"
              />
              <Stack>
                <Typography variant='h6' sx={{ mt: 2 }}>
                  Produk-Produk
                </Typography>
                {fields.map((field, index) => (
                  <Box key={index}>
                    <CustomPaper sx={{ mt: 1 }}>
                      <Stack>
                        <Typography variant='overline'>
                          {`Produk ${index + 1}`}
                        </Typography>
                        <FormControl autoFocus size="small" variant="filled" margin="dense" fullWidth required>
                          <InputLabel id="product-name-label">Nama Produk</InputLabel>
                          <Select
                            labelId="product-name-label"
                            label="Nama Produk"
                            name={`item_name_${index}`}
                          >
                            {[...productNames].map((_, i) =>
                              <MenuItem value={productNames[i].catalogue_id}>
                                {`${productNames[i].catalogue_id} - ${decodeURI(productNames[i].name)} (${decodeURI(productNames[i].unit)})`}
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                        <TextField
                          size="small"
                          fullWidth
                          required
                          margin="dense"
                          variant="filled"
                          name={`quantity_${index}`}
                          label="Jumlah"
                          type="number"
                        />
                      </Stack>
                      <Button sx={{ mt: 1.5 }} variant="text" disabled={fields.length === 1} startIcon={<Remove />} onClick={() => handleRemoveField(index)} color="error">
                        Hapus Produk
                      </Button>
                    </CustomPaper>
                  </Box>
                ))}
                <Button sx={{ mt: 1 }} variant="contained" startIcon={<Add />} onClick={handleAddField}>
                  Tambahkan Produk
                </Button>
              </Stack>
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Buat Purchase Order'
        />
      </Stack>
    </Stack>
  );
}
