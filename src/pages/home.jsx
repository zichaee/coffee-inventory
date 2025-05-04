import {
  CustomPaper,
} from "../components.jsx"

import {
  Typography,
  Stack,
} from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={2} sx={{ textAlign: "left" }}>
      <Typography variant="h4" >Selamat Datang di Sistem Informasi Tani Coffee Indonesia</Typography>
      <Stack spacing={2}>
        <CustomPaper>
          <Stack spacing={2}>
            <Typography variant="body1">
              Meningkatkan Efisiensi Pengelolaan Inventaris Produk Kopi Lokal dengan Teknologi Terintegrasi
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
                Sistem ini dirancang untuk membantu startup Tani Coffee Indonesia dalam mengelola rantai pasok dan stok produk secara efisien dan akurat. Dibangun dengan metode Extreme Programming (XP) untuk memastikan pengembangan cepat, kolaboratif, dan berorientasi pada kebutuhan pengguna.
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
      </Stack>
    </Stack>
  );
}
