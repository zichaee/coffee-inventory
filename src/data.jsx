//import {
  //Button,
//} from "@mui/material";
//import EditIcon from '@mui/icons-material/Edit';
//import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//const columnsSuppliers = [
  //{
    //field: 'actions',
    //headerName: '',
    //sortable: false,
    //renderCell: ({ row }) =>
      //<>
        //<Button onClick={() => console.log('Hello world')}>
          //<EditIcon/>
        //</Button>
        //<Button color='error' onClick={() => console.log('Hello world')}>
          //<DeleteForeverIcon/>
        //</Button>
      //</>,
    //minWidth: 150,
  //},

const columnsSuppliers = [
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
  { field: 'supplier_name', headerName: 'Supplier Name', minWidth: 200 },
  { field: 'phone_number', headerName: 'Phone Number', minWidth: 200 },
  { field: 'email', headerName: 'Email', minWidth: 200 },
  { field: 'address', headerName: 'Address', minWidth: 200 },
  { field: 'username', headerName: 'Username', minWidth: 200 },
]

const columnsInventory = [
  { field: 'product_id', headerName: 'Product ID', minWidth: 200 },
  { field: 'product_name', headerName: 'Product Name', minWidth: 200 },
  { field: 'category', headerName: 'Category', minWidth: 200 },
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
  { field: 'unit', headerName: 'Unit', minWidth: 200 },
  { field: 'unit_price', headerName: 'Unit Price', minWidth: 200 },
  { field: 'quantity', headerName: 'Quantity', minWidth: 200 },
  { field: 'received_date', headerName: 'Received Date', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Expiration Date', minWidth: 200 },
]

const columnsOrders = [
  { field: 'order_id', headerName: 'Order ID', minWidth: 200 },
  { field: 'created_date', headerName: 'Created Date', minWidth: 200 },
  { field: 'rejected_date', headerName: 'Rejected Date', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
  { field: 'note', headerName: 'Note', minWidth: 200 },
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
]

const columnsOrderDetails = [
  { field: 'order_detail_id', headerName: 'Order Detail ID', minWidth: 200 },
  { field: 'order_id', headerName: 'Order ID', minWidth: 200 },
  { field: 'product_name', headerName: 'Product Name', minWidth: 200 },
  { field: 'unit', headerName: 'Unit', minWidth: 200 },
  { field: 'quantity', headerName: 'Quantity', minWidth: 200 },
]

const columnsInvoices = [
  { field: 'invoice_id', headerName: 'Invoice ID', minWidth: 200 },
  { field: 'created_date', headerName: 'Created Date', minWidth: 200 },
  { field: 'approved_date', headerName: 'Rejected Date', minWidth: 200 },
  { field: 'paid_date', headerName: 'Rejected Date', minWidth: 200 },
  { field: 'rejected_date', headerName: 'Rejected Date', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
  { field: 'note', headerName: 'Note', minWidth: 200 },
  { field: 'rejection_note', headerName: 'Rejection Note', minWidth: 200 },
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
]

const columnsInvoiceDetails = [
  { field: 'invoice_detail_id', headerName: 'Invoice Detail ID', minWidth: 200 },
  { field: 'invoice_id', headerName: 'Invoice ID', minWidth: 200 },
  { field: 'product_name', headerName: 'Product Name', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Expiration Date', minWidth: 200 },
  { field: 'unit', headerName: 'Unit', minWidth: 200 },
  { field: 'unit_price', headerName: 'Unit Price', minWidth: 200 },
  { field: 'quantity', headerName: 'Quantity', minWidth: 200 },
]

const columnsSales = [
  { field: 'sale_id', headerName: 'Sale ID', minWidth: 200 },
  { field: 'customer_name', headerName: 'Customer Name', minWidth: 200 },
  { field: 'sale_date', headerName: 'Transaction Date', minWidth: 200 },
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
]

const columnsSaleDetails = [
  { field: 'sale_detail_id', headerName: 'Sale Detail ID', minWidth: 200 },
  { field: 'sale_id', headerName: 'Sale ID', minWidth: 200 },
  { field: 'product_name', headerName: 'Product Name', minWidth: 200 },
  { field: 'category', headerName: 'Category', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Expiration Date', minWidth: 200 },
  { field: 'unit', headerName: 'Unit', minWidth: 200 },
  { field: 'unit_price', headerName: 'Unit Price', minWidth: 200 },
  { field: 'quantity', headerName: 'Quantity', minWidth: 200 },
]

const columnsUsers = [
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'user_role_name', headerName: 'Role', minWidth: 200 },
  { field: 'created_at', headerName: 'Created At', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
]

export {
  columnsSuppliers,
  columnsInventory,
  columnsOrders,
  columnsOrderDetails,
  columnsInvoices,
  columnsInvoiceDetails,
  columnsSales,
  columnsSaleDetails,
  columnsUsers
};
