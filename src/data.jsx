const columnsCatalogue = [
  { field: 'catalogue_id', headerName: 'Catalogue ID', minWidth: 200 },
  { field: 'name', headerName: 'Name', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'category', headerName: 'Category', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'total_quantity', headerName: 'Total Jumlah', minWidth: 200 },
  { field: 'unit', headerName: 'Unit', minWidth: 200 },
]

const columnsInventory = [
  { field: 'received_date', headerName: 'Received Date', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Expiration Date', minWidth: 200 },
  { field: 'quantity', headerName: 'Quantity', minWidth: 200 },
  { field: 'unit_price', headerName: 'Unit Price', minWidth: 200 },
  { field: 'note', headerName: 'Note', minWidth: 800, valueFormatter: (x) => decodeURI(x) },
]

const columnsUsers = [
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'user_role_name', headerName: 'Role', minWidth: 200 },
  { field: 'created_at', headerName: 'Created At', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
]

export {
  columnsCatalogue,
  columnsInventory,
  columnsUsers
};
