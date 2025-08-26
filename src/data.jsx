const columnsCatalogue = [
  { field: 'catalogue_id', headerName: 'ID Katalog', minWidth: 200 },
  { field: 'name', headerName: 'Nama', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'category', headerName: 'Kategori', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'total_quantity', headerName: 'Total Jumlah', minWidth: 200 },
  { field: 'unit', headerName: 'Satuan', minWidth: 200 },
]

const grader = (x) => {
  if (typeof x === "undefined" || x === null) {
    return "Belum dinilai";
  }
  else {
    if (x >= 12) {
      return "Grade 3";
    }
    else if (x >= 2 && x < 12) {
      return "Grade 2";
    }
    else {
      return "Grade 1";
    }
  }
};

const columnsInventory = [
  { field: 'water_content', headerName: 'Grade', minWidth: 200, valueFormatter: grader },
  { field: 'storage_location', headerName: 'Lokasi Penyimpanan', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'quantity', headerName: 'Jumlah', minWidth: 200 },
  { field: 'received_date', headerName: 'Tanggal Diterima', minWidth: 200 },
  { field: 'expiration_date', headerName: 'Tanggal Kadaluarsa', minWidth: 200 },
  { field: 'unit_price', headerName: 'Harga Per Satuan', minWidth: 200 },
  { field: 'supplier_id', headerName: 'ID Supplier', minWidth: 200 },
  { field: 'supplier_name', headerName: 'Nama Supplier', minWidth: 200 },
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
  { field: 'supplier_name', headerName: 'Supplier Name', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'phone_number', headerName: 'Phone Number', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'email', headerName: 'Email', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'address', headerName: 'Address', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'username', headerName: 'Username', minWidth: 200 },
]

const columnsOrders = [
  { field: 'order_id', headerName: 'Order ID', minWidth: 200 },
  { field: 'created_date', headerName: 'Created Date', minWidth: 200 },
  { field: 'note', headerName: 'Note', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'username', headerName: 'Username', minWidth: 200 },
  { field: 'supplier_id', headerName: 'Supplier ID', minWidth: 200 },
]

const columnsOrderDetails = [
  { field: 'catalogue_id', headerName: 'Catalogue ID', minWidth: 200 },
  { field: 'name', headerName: 'Catalogue Name', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'category', headerName: 'Category', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'unit', headerName: 'Unit', minWidth: 200 },
  { field: 'quantity', headerName: 'Quantity', minWidth: 200 },
]

const columnsHistory = [
  { field: 'history_id', headerName: 'History ID', minWidth: 200 },
  { field: 'product_id', headerName: 'Product ID', minWidth: 200 },
  { field: 'type', headerName: 'Type', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'timestamp', headerName: 'Timestamp', minWidth: 200 },
  { field: 'category', headerName: 'Category', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
  { field: 'username', headerName: 'Username', minWidth: 200, valueFormatter: (x) => decodeURI(x) },
]

export {
  columnsCatalogue,
  columnsInventory,
  columnsUsers,
  columnsOrders,
  columnsOrderDetails,
  columnsSuppliers,
};
