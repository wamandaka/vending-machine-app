# 🥤 Vending Machine Web App

Simulasi **Vending Machine berbasis web** yang memungkinkan pengguna membeli produk dengan nominal uang tertentu serta menyediakan **Admin Panel** untuk mengelola produk (CRUD).

Project ini dibuat sebagai **Frontend Test Case** menggunakan **Next.js App Router** dan **json-server** sebagai mock backend.

## ✨ Fitur Utama

### 👤 User (Vending Machine)

- Menampilkan daftar produk
- Menampilkan harga & stok produk
- Memasukkan uang dengan nominal tertentu:
  - Rp2.000
  - Rp5.000
  - Rp10.000
  - Rp20.000
  - Rp50.000
- Total uang ditampilkan secara real-time
- Validasi pembelian:
  - Uang belum dimasukkan
  - Uang tidak cukup
  - Stok habis
- Menampilkan **kembalian setelah pembelian**
- Tombol **kembalikan uang (refund)** sebelum pembelian
- Transaksi pembelian disimpan ke backend (json-server)

### 🛠️ Admin Panel

- Halaman admin terpisah (`/admin`)
- CRUD produk:
  - Create produk
  - Update produk
  - Delete produk
- Form menggunakan **react-hook-form**

## 🧱 Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **react-hook-form**
- **json-server** (mock backend)
- **LocalStorage** (menyimpan uang sementara)

## ⚙️ Instalasi & Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd vending-machine
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Jalankan json-server

```bash
npx json-server --watch db.json --port 3001
```

Endpoint:

- `http://localhost:3001/products`
- `http://localhost:3001/transactions`

### 4️⃣ Jalankan Aplikasi Next.js

```bash
npm run dev
```

Akses:

- User: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## 📄 Environment Variables (`.env`)

Tambahkan environment variable untuk mengatur **API endpoint**.

File `.env`

```bash
NEXT_PUBLIC_API_URL=
```

## 🧠 Catatan Implementasi

- Uang hanya diterima dengan **nominal tertentu** (sesuai simulasi vending machine nyata)
- Validasi pembelian dilakukan **saat tombol Buy ditekan**
- Kembalian dihitung **setelah transaksi berhasil**
- Tombol **kembalikan uang** berfungsi sebagai pembatalan sebelum pembelian
- Currency formatting menggunakan helper reusable (`lib/utils.ts`)
- Logic dipisahkan dari UI (service & utils)
