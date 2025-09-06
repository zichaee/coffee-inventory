import {
  fetchGet,
} from "../controller.jsx"
import {
  columnsOrderDetails,
} from "../data.jsx"
import {
  CustomDataGrid,
  FormDialog,
} from "../components.jsx"

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Stack,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PrintIcon from '@mui/icons-material/Print';
import {
  GridActionsCellItem,
} from "@mui/x-data-grid";

export default function OrderDetails() {
  const orderID = window.location.href.split('/').pop();

  const [rows, setRows] = useState([]);

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

  const handleSeeReport = () => {
    window.location.assign(`/order-details-report/${orderID}`)
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
        <Button variant="contained" startIcon={<PrintIcon/>} onClick={handleSeeReport}>
          Cetak Purchase Order
        </Button>
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
