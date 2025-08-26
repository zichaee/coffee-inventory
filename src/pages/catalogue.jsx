import {
  fetchGet,
  fetchPut,
  fetchDelete,
} from "../controller.jsx"
import {
  columnsCatalogue,
} from "../data.jsx"
import {
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
  Autocomplete,
  Alert,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";

const handleSeeDetails = (params) => {
  const catalogueID = params.row.catalogue_id;
  window.location.assign(`/inventory/${catalogueID}`);
};

export default function Catalogue() {
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

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState('');
  const handleChangeProductName = (event) => {
    setProductName(event.target.value);
  }

  const [productCategory, setProductCategory] = useState('');
  const handleChangeProductCategory = (event) => {
    setProductCategory(event.target.value);
  }

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/catalogue/${token}`)
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {});
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const successAlert = (message) => {
    return (
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    );
  };

  const onSubmitContent = (event) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const token = localStorage.getItem('auth_token');

    fetchPut(`/api/put/catalogue/${token}/${formJson.name}/${formJson.category}/${formJson.unit}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error adding catalogue data: ', error);
      });
  };

  const handleDeleteClose = () => {
    localStorage.removeItem('current_catalogue_id');
    setDeleteOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClickDeleteOpen = (params) => {
    const catalogueID = params.row.catalogue_id;
    localStorage.setItem('current_catalogue_id', catalogueID);
    setDeleteOpen(true);
  };
  const onSubmitDelete = (event) => {
    const token = localStorage.getItem('auth_token');

    fetchDelete(`/api/delete/catalogue/${token}/${localStorage.getItem('current_catalogue_id')}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting product data: ', error);
      });
  };

  // Add the action buttons
  let actions = (params) => []

  if (permissions.access_catalogue_write == 1) {
    actions = (params) => [
        <GridActionsCellItem icon={<VisibilityIcon />} label="See Details" onClick={() => handleSeeDetails(params)} />,
        <GridActionsCellItem icon={<DeleteForeverIcon />} label="Delete" onClick={() => handleClickDeleteOpen(params)} />,
      ]
  }
  else {
    actions = (params) => [
        <GridActionsCellItem icon={<VisibilityIcon />} label="See Details" onClick={() => handleSeeDetails(params)} />,
      ]
  }

  const columnsCatalogueWithActions = [{
    field: 'actions',
    type: 'actions',
    sortable: false,
    getActions: (params) => actions(params),
  }].concat(columnsCatalogue);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/catalogue/${token}`)
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching catalogue data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Katalog Produk</Typography>
      <Stack spacing={2}>
        <CustomDataGrid
          columns={columnsCatalogueWithActions}
          rows={rows}
          getRowId={(row) => row.catalogue_id}
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
              <Autocomplete
                freeSolo
                options={products.map((option) => decodeURI(option.name))}
                onChange={handleChangeProductName}
                renderInput={(params) =>
                    <TextField
                      {...params}
                      name="name"
                      label="Nama Produk"
                      type="text"
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      fullWidth
                      variant="filled"
                    />}
              />
              <Autocomplete
                freeSolo
                options={products.map((option) => decodeURI(option.category))}
                onChange={handleChangeProductCategory}
                renderInput={(params) =>
                    <TextField
                      {...params}
                      name="category"
                      label="Kategori"
                      type="text"
                      autoFocus
                      required
                      margin="dense"
                      id="product_category"
                      fullWidth
                      variant="filled"
                    />}
              />
              <TextField
                required
                margin="dense"
                id="unit"
                name="unit"
                label="Satuan"
                type="text"
                fullWidth
                variant="filled"
              />
            </Box>
          }
          handleClose={handleClose}
          submitLabel='Tambahkan Produk'
        />
        <FormDialog
          onSubmitContent={onSubmitDelete}
          open={deleteOpen}
          title='Hapus Produk'
          contentText="Apakah Anda yakin ingin menghapus produk ini dari katalog?"
          content={<></>}
          handleClose={handleDeleteClose}
          submitLabel='Hapus Produk dari Katalog'
        />
      </Stack>
    </Stack>
  );
}
