const columnsCatalogue = [
  { field: 'catalogue_id', headerName: 'ID Katalog', minWidth: 200 },
  { field: 'name', headerName: 'Nama', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'category', headerName: 'Kategori', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'total_quantity', headerName: 'Total Jumlah', minWidth: 200 },
  { field: 'unit', headerName: 'Satuan', minWidth: 200 },
]

const columnsInventory = [
  { field: 'supplier_id', headerName: 'ID Supplier', minWidth: 200 },
  { field: 'received_date', headerName: 'Tanggal Diterima', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Tanggal Kadaluarsa', minWidth: 200 },
  { field: 'quantity', headerName: 'Jumlah', minWidth: 200 },
  { field: 'unit_price', headerName: 'Harga Per Satuan', minWidth: 200 },
  { field: 'storage_location', headerName: 'Lokasi Penyimpanan', minWidth: 200 },
  { field: 'note', headerName: 'Catatan', minWidth: 800, valueFormatter: (x) => decodeURI(x) },
]

const columnsUsers = [
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'user_role_name', headerName: 'Peran', minWidth: 200 },
  { field: 'created_at', headerName: 'Tanggal Dibuat', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
]

const columnsSuppliers = [
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
  { field: 'supplier_name', headerName: 'Supplier Name', minWidth: 200 },
  { field: 'phone_number', headerName: 'Phone Number', minWidth: 200 },
  { field: 'email', headerName: 'Email', minWidth: 200 },
  { field: 'address', headerName: 'Address', minWidth: 200 },
  { field: 'username', headerName: 'Username', minWidth: 200 },
]

export {
  columnsCatalogue,
  columnsInventory,
  columnsUsers,
  columnsSuppliers,
};
