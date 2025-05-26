import {
  fetchGet,
  fetchPut,
  fetchPost,
  fetchDelete,
} from "../controller.jsx"
import {
  columnsInventory,
} from "../data.jsx"
import {
  CustomDataGrid,
  CustomPaper,
  FormDialog,
} from "../components.jsx"
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NumbersIcon from '@mui/icons-material/Numbers';
import AbcIcon from '@mui/icons-material/Abc';
import CategoryIcon from '@mui/icons-material/Category';
import ScaleIcon from '@mui/icons-material/Scale';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GradingIcon from '@mui/icons-material/Grading';
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";

export default function Inventory() {
  const catalogueID = window.location.href.split('/').pop();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/catalogue/${token}`)
      .then((data) => {
        setProducts(data);
        setCurrentProduct(data.find(x => x.catalogue_id == catalogueID)) })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      })
      .finally(() => {});
  }, []);

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
    const type = "Add"

    fetchPut(`/api/put/inventory/${token}/${formJson.supplier_id}/${convertDateFormat(formJson.received_date)}/${convertDateFormat(formJson.expiration_date)}/${formJson.quantity}/${formJson.unit_price}/${formJson.storage_location}/${formJson.note}/${catalogueID}`)
      .then((response) => {
        fetchPut(`/api/put/history/${token}/${response.meta.last_row_id}/${type}`)
          .then((_) => {
            location.reload();
          })
          .catch((error) => {
            console.error('Error appending history: ', error);
          });
      })
      .catch((error) => {
        console.error('Error adding product data: ', error);
      });
  };

  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierName, setSupplierName] = useState('');

  const handleChangeSupplierName = (event) => {
    setSupplierName(event.target.value);
  }

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

  const [addOpen, setAddOpen] = useState(false);
  const [subtractOpen, setSubtractOpen] = useState(false);
  const [gradingOpen, setGradingOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClickAddOpen = (params) => {
    const productID = params.row.product_id;
    localStorage.setItem('current_product_id', productID);
    setAddOpen(true);
  };
  const handleClickSubtractOpen = (params) => {
    const productID = params.row.product_id;
    localStorage.setItem('current_product_id', productID);
    setSubtractOpen(true);
  };
  const handleClickGradingOpen = (params) => {
    const productID = params.row.product_id;
    const details = rows.find(x => x.product_id == productID);
    localStorage.setItem('current_product_id', productID);
    localStorage.setItem('current_water_content', details.water_content);
    setGradingOpen(true);
  }
  const handleClickEditOpen = (params) => {
    const productID = params.row.product_id;
    const details = rows.find(x => x.product_id == productID);
    localStorage.setItem('current_product_id', productID);
    localStorage.setItem('current_product_received_date', details.received_date);
    localStorage.setItem('current_product_expiration_date', details.expiration_date);
    localStorage.setItem('current_product_quantity', details.quantity);
    localStorage.setItem('current_product_unit_price', details.unit_price);
    localStorage.setItem('current_product_storage_location', details.storage_location);
    localStorage.setItem('current_product_note', details.note);
    setEditOpen(true);
  };
  const handleClickDeleteOpen = (params) => {
    const productID = params.row.product_id;
    localStorage.setItem('current_product_id', productID);
    setDeleteOpen(true);
  };
  const handleAddClose = () => {
    localStorage.removeItem('current_product_id');
    setAddOpen(false);
  };
  const handleSubtractClose = () => {
    localStorage.removeItem('current_product_id');
    setSubtractOpen(false);
  };
  const handleGradingClose = () => {
    localStorage.removeItem('current_product_id');
    localStorage.removeItem('current_water_content');
    setGradingOpen(false);
  };
  const handleEditClose = () => {
    localStorage.removeItem('current_product_id');
    setEditOpen(false);
  };
  const handleDeleteClose = () => {
    localStorage.removeItem('current_product_id');
    setDeleteOpen(false);
  };
  const onSubmitDelete = (event) => {
    const token = localStorage.getItem('auth_token');

    fetchDelete(`/api/delete/inventory/${token}/${localStorage.getItem('current_product_id')}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting product data: ', error);
      });
  };
  const onSubmitGrading = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPost(`/api/post/grading/${token}/${formJson.water_content}/${localStorage.getItem('current_product_id')}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error adding grading data: ', error);
      });
  };
  const onSubmitEdit = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPost(`/api/post/inventory/${token}/${convertDateFormat(formJson.received_date)}/${convertDateFormat(formJson.expiration_date)}/${formJson.quantity}/${formJson.storage_location}/${formJson.unit_price}/${formJson.note}/${localStorage.getItem('current_product_id')}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error adding product data: ', error);
      });
  };

  function convertDateFormat(dateStr) {
    const [mm, dd, yyyy] = dateStr.split('/');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Add the action buttons
  const columnsInventoryWithActions = [{
    field: 'actions',
    type: 'actions',
    sortable: false,
    minWidth: 150,
    getActions: (params) => [
      <GridActionsCellItem icon={<GradingIcon />} label="Grading" onClick={() => handleClickGradingOpen(params)} />,
      <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleClickEditOpen(params)} />,
      <GridActionsCellItem icon={<DeleteForeverIcon />} label="Delete" onClick={() => handleClickDeleteOpen(params)} />,
    ],
  }].concat(columnsInventory);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/inventory/${token}`)
      .then((data) => {
        setRows(data.filter(x => x.catalogue_id == catalogueID));
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
      <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
        <Button variant="contained" startIcon={<ArrowBackIosIcon/>} href="/catalogue" fullWidth="false" >
          Katalog
        </Button>
      </Stack>
      <Typography variant="h4" >Detail Produk</Typography>
      <Stack spacing={2}>
        <CustomPaper>
          <Typography variant="body1">
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <NumbersIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="ID Produk" secondary={currentProduct.catalogue_id} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AbcIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nama Produk" secondary={decodeURI(currentProduct.name)} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CategoryIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Kategori Produk" secondary={decodeURI(currentProduct.category)} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ScaleIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Satuan Ukur" secondary={decodeURI(currentProduct.unit)} />
            </ListItem>
          </Typography>
        </CustomPaper>
        <CustomDataGrid
          columns={columnsInventoryWithActions}
          rows={rows}
          getRowId={(row) => row.product_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="contained" onClick={handleClickOpen}>
          Tambahkan Produk
        </Button>
        <FormDialog
          onSubmitContent={onSubmitContent}
          open={open}
          title='Tambahkan Produk'
          contentText="Anda dapat memasukkan detail-detail produk yang ingin ditambahkan di sini."
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{
                    textField: {
                      margin: "dense",
                      id: "received_date",
                      name: "received_date",
                      label: "Tanggal Diterima",
                      fullWidth: true,
                      variant: "filled",
                      required: true,
                    }
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{
                    textField: {
                      margin: "dense",
                      id: "expiration_date",
                      name: "expiration_date",
                      label: "Tanggal Kadaluarsa",
                      fullWidth: true,
                      variant: "filled",
                      required: true,
                    }
                  }}
                />
              </LocalizationProvider>
              <TextField
                required
                margin="dense"
                id="quantity"
                name="quantity"
                label="Jumlah"
                type="number"
                fullWidth
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">{currentProduct.unit}</InputAdornment>,
                  },
                }}
              />
              <TextField
                required
                margin="dense"
                id="unit_price"
                name="unit_price"
                label="Harga Per Satuan"
                type="number"
                fullWidth
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  },
                }}
              />
              <TextField
                required
                fullWidth
                margin="dense"
                variant="filled"
                name="storage_location"
                label="Lokasi Penyimpanan"
              />
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
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Tambahkan Produk'
        />
        <FormDialog
          onSubmitContent={onSubmitGrading}
          open={gradingOpen}
          title='Grading Produk'
          contentText="Masukkan kadar air dari biji kopi untuk keperluan grading di sini."
          content={
            <Box>
              <TextField
                required
                margin="dense"
                id="water_content"
                name="water_content"
                label="Kadar Air"
                type="number"
                fullWidth
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  },
                }}
                defaultValue={localStorage.getItem('current_water_content')}
              />
            </Box>
          }
          handleClose={handleGradingClose}
          submitLabel='Beri Nilai Pada Produk'
        />
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
          onSubmitContent={onSubmitEdit}
          open={editOpen}
          title='Ubah Detail Produk'
          contentText="Anda dapat mengubah detail mengenai produk Anda di sini."
          content={
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{
                    textField: {
                      margin: "dense",
                      id: "received_date",
                      name: "received_date",
                      label: "Tanggal Diterima",
                      fullWidth: true,
                      variant: "filled",
                      required: true,
                    }
                  }}
                  defaultValue={dayjs(localStorage.getItem('current_product_received_date'))}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{
                    textField: {
                      margin: "dense",
                      id: "expiration_date",
                      name: "expiration_date",
                      label: "Tanggal Kadaluarsa",
                      fullWidth: true,
                      variant: "filled",
                      required: true,
                    }
                  }}
                  defaultValue={dayjs(localStorage.getItem('current_product_expiration_date'))}
                />
              </LocalizationProvider>
              <TextField
                required
                margin="dense"
                id="quantity"
                name="quantity"
                label="Jumlah"
                type="number"
                fullWidth
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">{currentProduct.unit}</InputAdornment>,
                  },
                }}
                defaultValue={localStorage.getItem('current_product_quantity')}
              />
              <TextField
                required
                margin="dense"
                id="unit_price"
                name="unit_price"
                label="Harga Per Satuan"
                type="number"
                fullWidth
                variant="filled"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                  },
                }}
                defaultValue={localStorage.getItem('current_product_unit_price')}
              />
              <TextField
                required
                fullWidth
                margin="dense"
                variant="filled"
                name="storage_location"
                label="Lokasi Penyimpanan"
                defaultValue={decodeURI(localStorage.getItem('current_product_storage_location'))}
              />
              <TextField
                multiline
                rows={5}
                maxRows={50}
                fullWidth
                margin="dense"
                variant="filled"
                name="note"
                label="Catatan"
                defaultValue={decodeURI(localStorage.getItem('current_product_note'))}
              />
            </Box>
          }
          handleClose={handleEditClose}
          submitLabel='Ubah Detail'
        />
      </Stack>
    </Stack>
  );
}
