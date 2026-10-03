# POS Kawal Stok

Sistem pencatatan pesanan (Point of Sale) dan manajemen inventaris berbasis web yang dibangun dengan standar *modern web design*. Aplikasi ini dirancang khusus untuk memfasilitasi distributor dalam mencatat pesanan agen/reseller dan mengontrol ketersediaan barang secara real-time.

## Fitur Utama

- **Buat Pesanan (Order Form):** Form dinamis untuk membuat pesanan baru dari reseller. Dilengkapi dengan perhitungan otomatis (subtotal, diskon grosir, grand total) serta badge khusus untuk item berstatus promo.
- **Pengecekan Stok (Inventory Monitoring):** Pemantauan ketersediaan stok barang secara seketika (*real-time*). Dilengkapi dengan kontrol manual untuk menyesuaikan jumlah stok fisik (tambah/kurang stok).
- **Manajemen Pesanan (Order List):** Menampilkan daftar riwayat pesanan yang sudah masuk berserta status pesanannya.
- **Auto Stock Deduction:** Sistem terintegrasi cerdas di mana stok barang akan otomatis berkurang dengan sendirinya apabila pesanan baru berhasil dibuat. Terdapat validasi jika stok tidak mencukupi untuk mencegah overselling.
- **Premium UI/UX:** Antarmuka pengguna (UI) modern yang cantik dan intuitif dengan arsitektur navigasi *sidebar*, *glassmorphism effects*, dan desain interaktif menggunakan **Tailwind CSS**.

## Teknologi yang Digunakan

- **Framework Frontend:** Angular (versi 21)
- **Styling:** Tailwind CSS (Modern Utility-first CSS)
- **Logika & State Management:** RxJS (Observables, Reactive Programming)
- **Form Management:** Angular Reactive Forms

## Cara Menjalankan Project

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di lingkungan pengembangan lokal (*local environment*):

1. **Pastikan Node.js terinstal**
   Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) versi LTS terbaru di sistem Anda.

2. **Clone atau Download Project**
   Masuk ke direktori project melalui terminal:
   ```bash
   cd pos-kawal-stok
   ```

3. **Instal Dependensi (Dependencies)**
   Jalankan perintah ini untuk menginstal semua *library* yang diperlukan:
   ```bash
   npm install
   ```

4. **Jalankan Aplikasi Server Lokal**
   Gunakan Angular CLI untuk menjalankan development server (dijadwalkan di port 3000):
   ```bash
   ng serve --port 3000
   ```
   > **Catatan:** Aplikasi ini secara default dikonfigurasi untuk tidak memiliki *delay* dari sisi API (*mock api synchronous*), sehingga semua data akan dimuat dengan sangat cepat.

5. **Buka di Browser**
   Buka web browser pilihan Anda (Chrome, Firefox, Edge, Safari) dan akses ke alamat berikut:
   `http://localhost:3000`

## Struktur Folder Utama

- `src/app/components/` - Kumpulan UI komponen utama (seperti `item-list`, `order-form`, dan `order-list`).
- `src/app/services/` - Kumpulan logika dan simulasi *backend data* (seperti `pos.service.ts` sebagai simulasi API Mock tanpa delay).
- `src/app/app.html` - Struktur utama layout *sidebar* navigasi.
- `src/app/app.routes.ts` - Konfigurasi perutean (routing) halaman.

---
*Dibuat untuk mempermudah distribusi barang dan manajemen logistik.*
