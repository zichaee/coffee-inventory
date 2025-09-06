import companyLogo from "../assets/logo.png";

import {
  fetchGet,
} from "../controller.jsx"

import React, { useState, useEffect } from "react";

import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  viewer: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    border: "none",
  },
  page: {
    flexDirection: "column",
    padding: 24,
    fontSize: 9,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
    fontSize: 10,
  },
  logo: {
    height: 50,
    marginBottom: 8,
  },
  contact: {
    textAlign: "center",
    marginBottom: 4,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 24,
    marginBottom: 12,
  },
  subsectionHeader: {
    fontWeight: "bold",
    fontSize: 11,
    marginTop: 12,
    marginBottom: 12,
  },
  empty: {
    alignItems: "center",
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 9,
  },
});

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

export default function Report() {
  const [isLoading, setIsLoading] = useState(true);

  const [suppliers, setSuppliers] = useState([]);
  const [catalogue, setCatalogue] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/suppliers/${token}`)
      .then((data) => {
        setSuppliers(data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/catalogue/${token}`)
      .then((data) => {
        setCatalogue(data);
      })
      .catch((error) => {
        console.error('Error fetching catalogue data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/inventory/${token}`)
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/orders/${token}`)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={companyLogo} style={styles.logo} />
            <Text style={styles.contact}>+62 857-7310-6522</Text>
            <Text style={styles.contact}>Jalan Wanasuka, Pangalengan, Kabupaten Bandung</Text>
            <Text style={styles.contact}>Jawa Barat 40378</Text>
          </View>

          <Text style={styles.sectionHeader}>Daftar Supplier</Text>

          <View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.tableHeader]}>ID Supplier</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Nama Supplier</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Email</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Alamat</Text>
            </View>

            {suppliers.map((x, idx) => (
              <View style={styles.row} key={idx}>
                <Text style={styles.cell}>{decodeURI(x.supplier_id)}</Text>
                <Text style={styles.cell}>{decodeURI(x.supplier_name)}</Text>
                <Text style={styles.cell}>{decodeURI(x.email)}</Text>
                <Text style={styles.cell}>{decodeURI(x.address)}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeader}>Katalog Produk</Text>
          {
            catalogue.map((x, idx) => (
              <>
                <Text style={styles.subsectionHeader}>{decodeURI(x.name)}</Text>

                <View style={styles.section}>
                  <Text>ID Katalog: {decodeURI(x.catalogue_id)}</Text>
                  <Text>Kategori: {decodeURI(x.category)}</Text>
                  <Text>Kuantitas: {decodeURI(x.total_quantity)}</Text>
                  <Text>Ukuran Kuantitas: {decodeURI(x.unit)}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={[styles.cell, styles.tableHeader]}>ID Produk</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Penilaian</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Lokasi Penyimpanan</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Jumlah</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Tanggal Diterima</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Tanggal Kadaluarsa</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Harga Per Unit</Text>
                  <Text style={[styles.cell, styles.tableHeader]}>Supplier</Text>
                </View>

                {
                  inventory.filter((y) => y.catalogue_id == x.catalogue_id)
                  .map((z, idx) => (
                    <View style={styles.row} key={idx}>
                      <Text style={styles.cell}>{decodeURI(z.product_id)}</Text>
                      <Text style={styles.cell}>{grader(z.water_content)}</Text>
                      <Text style={styles.cell}>{decodeURI(z.storage_location)}</Text>
                      <Text style={styles.cell}>{decodeURI(z.quantity)}</Text>
                      <Text style={styles.cell}>{decodeURI(z.received_date)}</Text>
                      <Text style={styles.cell}>{decodeURI(z.expiration_date)}</Text>
                      <Text style={styles.cell}>{decodeURI(z.unit_price)}</Text>
                      <Text style={styles.cell}>{decodeURI(z.supplier_name)}</Text>
                    </View>
                  ))
                }
              </>
            ))
          }
          <Text style={styles.sectionHeader}>Katalog Produk</Text>

          <View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.tableHeader]}>ID Pemesanan</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Tanggal Pemesanan</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Supplier</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Email Supplier</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Total Jumlah (Kg)</Text>
            </View>

            {orders.map((x, idx) => (
              <View style={styles.row} key={idx}>
                <Text style={styles.cell}>{decodeURI(x.order_id)}</Text>
                <Text style={styles.cell}>{decodeURI(x.created_date)}</Text>
                <Text style={styles.cell}>
                  {decodeURI(suppliers.find((y) => y.supplier_id === x.supplier_id)?.supplier_name)}
                </Text>
                <Text style={styles.cell}>
                  {decodeURI(suppliers.find((y) => y.supplier_id === x.supplier_id)?.email)}
                </Text>
                <Text style={styles.cell}>{decodeURI(x.total_quantity)}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeader}>Pemesanan Dalam Proses</Text>

          <View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.tableHeader]}>ID Pemesanan</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Tanggal Pemesanan</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Supplier</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Email Supplier</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Total Jumlah (Kg)</Text>
            </View>

            {orders.map((x, idx) => (
              <View style={styles.row} key={idx}>
                <Text style={styles.cell}>{decodeURI(x.order_id)}</Text>
                <Text style={styles.cell}>{decodeURI(x.created_date)}</Text>
                <Text style={styles.cell}>
                  {decodeURI(suppliers.find((y) => y.supplier_id === x.supplier_id)?.supplier_name)}
                </Text>
                <Text style={styles.cell}>
                  {decodeURI(suppliers.find((y) => y.supplier_id === x.supplier_id)?.email)}
                </Text>
                <Text style={styles.cell}>{decodeURI(x.total_quantity)}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
