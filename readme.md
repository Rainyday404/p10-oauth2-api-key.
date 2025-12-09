# PRAKTIKUM #10: SIMULASI API KEY & OAUTH 2.0 (WEB SERVICE ENGINEERING)

Proyek ini adalah implementasi simulasi keamanan API menggunakan **Node.js**, **Express**, dan **MongoDB**. Proyek ini mendemonstrasikan dua lapisan keamanan: **API Key** untuk akses publik (Read-Only) dan **OAuth 2.0 (JWT)** untuk akses privat (CRUD) dengan otorisasi berbasis peran (Admin).

## SKENARIO APLIKASI
Sistem Manajemen Produk dengan dua level akses:
1.  **Akses Publik (API Key):** Klien hanya dapat melihat daftar produk.
2.  **Akses Privat (OAuth 2.0/JWT):** Pengguna terotentikasi dengan peran Admin dapat menambahkan, mengedit, dan menghapus produk.

## TOOLS ATAU ALAT
* **Backend:** Node.js & Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Autentikasi:** JSON Web Tokens (JWT) & API Key
* **Keamanan:** bcryptjs untuk hashing password
* **Tools:** Postman/Insomnia untuk pengujian

## STRUKTUR PROYEK
```text
p10-oauth2-api-key-nimanda/
├── controllers/      # Logika handler (Auth & Product)
├── middleware/       # Validasi API Key & Token JWT
├── models/           # Skema Mongoose (User, Product, ApiKey)
├── routes/           # Definisi endpoint API
├── seeders/          # Script inisialisasi data awal
├── utils/            # Fungsi utilitas (Generate Token)
├── evidence/         # Bukti screenshot pengujian
├── .env              # Variabel lingkungan (Credentials)
├── package.json      # Dependencies
└── server.js         # Entry point aplikasi
````

## CARA INSTALASI & MENJALANKAN

### 1\. Prasyarat

Pastikan Anda telah menginstal Node.js dan memiliki akun MongoDB Atlas.

### 2\. Instalasi Dependencies

Jalankan perintah berikut di terminal root proyek:

```bash
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken
```

### 3\. Konfigurasi Lingkungan (.env)

Buat file `.env` di root folder dan isi dengan konfigurasi berikut (gunakan kredensial database Anda sendiri):

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=rahasia-super-aman-simulasi-jwt
```

### 4\. Database Seeding (Data Awal)

Sebelum menjalankan server, isi database dengan data awal (User, Produk, dan API Key) menggunakan script seeder:

```bash
node seeders/seed.js
```

*Pastikan output menunjukkan "Proses Seeding Database Berhasil\!".*

### 5\. Menjalankan Server

Jalankan server aplikasi:

```bash
node server.js
```

Server akan berjalan di `http://localhost:3000`

-----

## KREDENSIAL PENGUJIAN (SEEDER DATA)

Gunakan data berikut untuk pengujian di Postman:

**1. User Admin**

  * Username: `admin`
  * Password: `password123`
  * Role: `admin`
  * Keterangan: Bisa melakukan CRUD (POST, PUT, DELETE)

**2. User Biasa**

  * Username: `userbiasa`
  * Password: `userpass`
  * Role: `user`
  * Keterangan: Hanya bisa Login, tidak bisa CRUD

**3. API Key**

  * Key: `PRACTICUM_API_KEY_A_1234567890`
  * Keterangan: Masukkan di Header `x-api-key`

-----

## DOKUMENTASI HASIL PENGUJIAN API

Berikut adalah rangkuman hasil pengujian API untuk Praktikum 10 Web Service Engineering. Pengujian mencakup fitur otentikasi dan validasi hak akses (RBAC) pada operasi CRUD.

### 1. Skenario Otentikasi (Authentication)

#### A. Login Berhasil (Role: Admin)
* **Endpoint:** `POST /api/v1/auth/token`
* **Hasil:** Status `200 OK`. Server berhasil memvalidasi kredensial admin dan mengembalikan *access token* serta data user dengan role admin.

#### B. Login Berhasil (Role: User Biasa)
* **Endpoint:** `POST /api/v1/auth/token`
* **Hasil:** Status `200 OK`. Server berhasil memvalidasi kredensial user biasa dan mengembalikan *access token* dengan role user.

#### C. Login Gagal (Password Salah)
* **Endpoint:** `POST /api/v1/auth/token`
* **Hasil:** Status `401 Unauthorized`. Sistem keamanan berhasil menolak permintaan login karena password yang dikirimkan tidak sesuai.

---

### 2. Skenario Create Data (POST)

#### A. Admin Membuat Produk (Sukses)
* **Endpoint:** `POST /api/v1/products/private`
* **Auth:** Bearer Token (Admin)
* **Hasil:** Status `201 Created`. Data produk baru berhasil ditambahkan ke database MongoDB karena token memiliki hak akses admin.

#### B. User Biasa Membuat Produk (Gagal - Akses Ditolak)
* **Endpoint:** `POST /api/v1/products/private`
* **Auth:** Bearer Token (User)
* **Hasil:** Status `403 Forbidden`. Permintaan ditolak oleh middleware. User biasa tidak memiliki izin untuk menambahkan data.

#### C. Akses Tanpa Token (Gagal)
* **Endpoint:** `POST /api/v1/products/private`
* **Auth:** No Auth
* **Hasil:** Status `403 Forbidden`. Endpoint private berhasil terlindungi; permintaan tanpa token valid otomatis ditolak.

---

### 3. Skenario Update Data (PUT)

#### A. Admin Mengupdate Produk (Sukses)
* **Endpoint:** `PUT /api/v1/products/private/{id}`
* **Auth:** Bearer Token (Admin)
* **Hasil:** Status `200 OK`. Perubahan data (harga dan deskripsi) berhasil disimpan oleh admin.

#### B. User Biasa Mengupdate Produk (Gagal)
* **Endpoint:** `PUT /api/v1/products/private/{id}`
* **Auth:** Bearer Token (User)
* **Hasil:** Status `403 Forbidden`. Middleware berhasil mencegah user dengan role "user" untuk mengubah data produk yang ada.

---

### 4. Skenario Delete Data (DELETE)

#### A. Admin Menghapus Produk (Sukses)
* **Endpoint:** `DELETE /api/v1/products/private/{id}`
* **Auth:** Bearer Token (Admin)
* **Hasil:** Status `200 OK`. Produk berhasil dihapus sepenuhnya dari database oleh admin.

#### B. User Biasa Menghapus Produk (Gagal)
* **Endpoint:** `DELETE /api/v1/products/private/{id}`
* **Auth:** Bearer Token (User)
* **Hasil:** Status `403 Forbidden`. Validasi role berfungsi dengan baik; user biasa tidak diizinkan melakukan operasi penghapusan data.

-----

**Dosen Pengampu:** Muhayat, M.IT

````

---