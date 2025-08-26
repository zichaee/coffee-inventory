import {
  CustomPaper,
} from "../components.jsx"
import {
  fetchGet,
} from "../controller.jsx"

import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Alert,
  Button,
} from "@mui/material";

export default function Home() {
  const [emptyProducts, setEmptyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetchGet(`/api/get/empty/${token}`)
      .then((data) => {
        setEmptyProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching empty catalogue items data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Selamat Datang di Sistem Informasi Tani Coffee Indonesia</Typography>
      <Stack spacing={2}>
        <CustomPaper>
          <Stack spacing={2}>
            <Typography variant="body1">
              Sistem Informasi Pengelolaan Inventaris Produk Kopi Lokal dengan Teknologi Terintegrasi
            </Typography>
          </Stack>
        </CustomPaper>
        <Stack
          spacing={{ xs: 2, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", alignItems: "stretch" }}
        >
          <CustomPaper>
            <Stack spacing={2}>
              <Typography variant="h6" >Tentang Sistem</Typography>
              <Typography variant="body1">
                Sistem ini dirancang untuk membantu startup Tani Coffee Indonesia dalam mengelola rantai pasok dan stok produk secara akurat. Dibangun dengan metode Extreme Programming (XP) untuk memastikan pengembangan cepat, kolaboratif, dan berorientasi pada kebutuhan pengguna.
              </Typography>
            </Stack>
          </CustomPaper>
          <CustomPaper>
            <Typography variant="h6" >Fitur Utama</Typography>
            <Typography variant="body1">
              <ul>
                <li>Monitoring Stok: Pantau ketersediaan barang secara real-time dan akurat.</li>
                <li>Pencatatan Mutasi Stok: Catatan riwayat keluar-masuknya barang-barang stok.</li>
              </ul>
            </Typography>
          </CustomPaper>
        </Stack>
        <CustomPaper>
          <Typography variant="h6" >Notifikasi</Typography>
          <Stack spacing={1}>
            {
              emptyProducts.length === 0
                ? "Anda sedang tidak memiliki notifikasi sekarang."
                : emptyProducts.map((x) => {
                  return (
                    <Alert
                      severity="error"
                      action={
                        <Button color="inherit" size="small" href={`/inventory/${x.catalogue_id}`}>
                          See Stock
                        </Button>
                      }
                    >
                      Stok untuk produk '{decodeURI(x.name)}' (ID Katalog: {x.catalogue_id}) telah habis.
                    </Alert>
                  );
              })
            }
          </Stack>
        </CustomPaper>
      </Stack>
    </Stack>
  );
}
