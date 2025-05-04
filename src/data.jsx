const columnsCatalogue = [
  { field: 'catalogue_id', headerName: 'ID Katalog', minWidth: 200 },
  { field: 'name', headerName: 'Nama', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'category', headerName: 'Kategori', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'total_quantity', headerName: 'Total Jumlah', minWidth: 200 },
  { field: 'unit', headerName: 'Satuan', minWidth: 200 },
]

const columnsInventory = [
  { field: 'received_date', headerName: 'Tanggal Diterima', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Tanggal Kadaluarsa', minWidth: 200 },
  { field: 'quantity', headerName: 'Jumlah', minWidth: 200 },
  { field: 'unit_price', headerName: 'Harga Per Satuan', minWidth: 200 },
  { field: 'note', headerName: 'Catatan', minWidth: 800, valueFormatter: (x) => decodeURI(x) },
]

const columnsUsers = [
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'user_role_name', headerName: 'Peran', minWidth: 200 },
  { field: 'created_at', headerName: 'Tanggal Dibuat', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
]

export {
  columnsCatalogue,
  columnsInventory,
  columnsUsers
};
