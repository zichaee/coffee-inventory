import companyLogo from "../assets/logo.png";

import {
  fetchGet,
  fetchPut,
  fetchPost,
  fetchDelete,
} from "../controller.jsx"
import {
  columnsOrderDetails,
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
import PrintIcon from '@mui/icons-material/Print';
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";

export default function OrderDetails() {
  const orderID = window.location.href.split('/').pop();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClickDeleteOpen = (params) => {
    const orderDetailID = params.row.order_detail_id;
    localStorage.setItem('current_order_detail_id', orderDetailID);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    localStorage.removeItem('current_order_detail_id');
    setDeleteOpen(false);
  };
  const onSubmitDelete = (event) => {
    const token = localStorage.getItem('auth_token');

    fetchDelete(`/api/delete/order_details/${token}/${localStorage.getItem('current_order_detail_id')}`)
      .then((_) => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting order details data: ', error);
      });
  };

  const handlePrint = () => {
    window.print();
  }

  // Add the action buttons
  const columnsOrderDetailsWithActions = [{
    field: 'actions',
    type: 'actions',
    sortable: false,
    getActions: (params) => [
      <GridActionsCellItem icon={<DeleteForeverIcon />} label="Delete" onClick={() => handleClickDeleteOpen(params)} />,
    ],
  }].concat(columnsOrderDetails);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/order_details/${token}`)
      .then((data) => {
        setRows(data.filter(x => x.order_id == orderID));
        setOrderDetails(data.filter(x => x.order_id == orderID));
      })
      .catch((error) => {
        console.error('Error fetching order details data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/orders/${token}`)
      .then((data) => {
        setCurrentOrder(data.find(x => x.order_id == orderID)) })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {});
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
        <Button variant="contained" startIcon={<ArrowBackIosIcon/>} href="/orders" fullWidth="false" >
          Daftar Purchase Order
        </Button>
      </Stack>
      <Typography variant="h4" >Detail Purchase Order</Typography>
      <Stack spacing={2}>
        <CustomDataGrid
          columns={columnsOrderDetailsWithActions}
          rows={rows}
          getRowId={(row) => row.order_detail_id}
          onRowSelectionModelChange={() => {}}
          sx={{ maxWidth: 'calc(100vw - 112px)' }}
        />
        <Button variant="contained" startIcon={<PrintIcon/>} onClick={handlePrint}>
          Cetak Purchase Order
        </Button>
        <Box sx={{ display: 'block' }} visibility="hidden" position="absolute">
          <div id="print-area">
            <Stack spacing={2} alignItems="start">
              <Stack spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <img src={companyLogo} alt="Company Logo" style={{ height: 80 }} />
                <Typography variant="subtitle2">+62 857-7310-6522</Typography>
                <Stack spacing={0} alignItems="center">
                  <Typography variant="subtitle2">Jalan Wanasuka, Pangalengan, Kabupaten Bandung</Typography>
                  <Typography variant="subtitle2">Jawa Barat 40378</Typography>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Typography>
                  <ListItem dense={true}>
                    <ListItemText primary={`Order ID: ${orderID}`} />
                  </ListItem>
                  <ListItem dense={true}>
                    <ListItemText primary={`Supplier ID: ${currentOrder.supplier_id}`} />
                  </ListItem>
                  <ListItem dense={true}>
                    <ListItemText primary={`Tanggal Pesanan Dibuat: ${currentOrder.created_date}`} />
                  </ListItem>
                </Typography>
                <Stack spacing={2} direction='row' sx={{ minWidth: 1000 }}>
                  <Typography>
                    <ListItem dense={true}>
                      <ListItemText primary='ID Katalog Produk' />
                    </ListItem>
                    {orderDetails.map((x) => {
                      return (
                        <ListItem dense={true}>
                          <ListItemText primary={x.catalogue_id} />
                        </ListItem>
                      );
                    })}
                  </Typography>
                  <Typography>
                    <ListItem dense={true}>
                      <ListItemText primary='Nama Katalog Produk' />
                    </ListItem>
                    {orderDetails.map((x) => {
                      return (
                        <ListItem dense={true}>
                          <ListItemText primary={decodeURI(x.name)} />
                        </ListItem>
                      );
                    })}
                  </Typography>
                  <Typography>
                    <ListItem dense={true}>
                      <ListItemText primary='Jumlah' />
                    </ListItem>
                    {orderDetails.map((x) => {
                      return (
                        <ListItem dense={true}>
                          <ListItemText primary={x.quantity} />
                        </ListItem>
                      );
                    })}
                  </Typography>
                  <Typography>
                    <ListItem dense={true}>
                      <ListItemText primary='Satuan Ukuran' />
                    </ListItem>
                    {orderDetails.map((x) => {
                      return (
                        <ListItem dense={true}>
                          <ListItemText primary={decodeURI(x.unit)} />
                        </ListItem>
                      );
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </div>
        </Box>
        <FormDialog
          onSubmitContent={onSubmitDelete}
          open={deleteOpen}
          title='Delete Product'
          contentText="Apakah Anda yakin ingin menghapus produk ini dari purchase order?"
          content={<></>}
          handleClose={handleDeleteClose}
          submitLabel='Delete Product'
        />
      </Stack>
    </Stack>
  );
}
