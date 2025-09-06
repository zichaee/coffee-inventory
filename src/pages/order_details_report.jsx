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

export default function Report() {
  const [isLoading, setIsLoading] = useState(true);

  const orderID = window.location.href.split('/').pop();
  const [suppliers, setSuppliers] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});

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
    fetchGet(`/api/get/order_details/${token}`)
      .then((data) => {
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
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={companyLogo} style={styles.logo} />
            <Text style={styles.contact}>+62 857-7310-6522</Text>
            <Text style={styles.contact}>Jalan Wanasuka, Pangalengan, Kabupaten Bandung</Text>
            <Text style={styles.contact}>Jawa Barat 40378</Text>
          </View>

          <View style={styles.section}>
            <Text>ID Pemesanan: {decodeURI(orderID)}</Text>
            <Text>ID Supplier: {decodeURI(currentOrder.supplier_id)}</Text>
            <Text>
              Nama Supplier: {decodeURI(suppliers.find((x) => x.supplier_id === currentOrder.supplier_id)?.supplier_name)}
            </Text>
            <Text>
              Email Supplier: {decodeURI(suppliers.find((x) => x.supplier_id === currentOrder.supplier_id)?.email)}
            </Text>
            <Text>Tanggal Pesanan Dibuat: {decodeURI(currentOrder.created_date)}</Text>
          </View>

          <View>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.tableHeader]}>ID Katalog Produk</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Nama Katalog Produk</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Jumlah</Text>
              <Text style={[styles.cell, styles.tableHeader]}>Satuan Ukuran</Text>
            </View>

            {orderDetails.map((x, idx) => (
              <View style={styles.row} key={idx}>
                <Text style={styles.cell}>{decodeURI(x.catalogue_id)}</Text>
                <Text style={styles.cell}>{decodeURI(x.name)}</Text>
                <Text style={styles.cell}>{decodeURI(x.quantity)}</Text>
                <Text style={styles.cell}>{decodeURI(x.unit)}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
