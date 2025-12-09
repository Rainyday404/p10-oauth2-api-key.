PRAKTIKUM #10: SIMULASI API KEY & OAUTH 2.0 (WEB SERVICE ENGINEERING)
=====================================================================

Proyek ini adalah implementasi simulasi keamanan API menggunakan Node.js, Express, dan MongoDB. Proyek ini mendemonstrasikan dua lapisan keamanan: API Key untuk akses publik (Read-Only) dan OAuth 2.0 (JWT) untuk akses privat (CRUD) dengan otorisasi berbasis peran (Admin).

SKENARIO APLIKASI
-----------------
Sistem Manajemen Produk dengan dua level akses:
1. Akses Publik (API Key): Klien hanya dapat melihat daftar produk.
2. Akses Privat (OAuth 2.0/JWT): Pengguna terotentikasi dengan peran Admin dapat menambahkan, mengedit, dan menghapus produk.

TOOLS ATAU ALAT
---------------
- Backend: Node.js & Express.js
- Database: MongoDB Atlas (Mongoose ODM)
- Autentikasi: JSON Web Tokens (JWT) & API Key
- Keamanan: bcryptjs untuk hashing password
- Tools: Postman/Insomnia untuk pengujian

STRUKTUR PROYEK
---------------
p10-oauth2-api-key-nimanda/
|-- controllers/      # Logika handler (Auth & Product)
|-- middleware/       # Validasi API Key & Token JWT
|-- models/           # Skema Mongoose (User, Product, ApiKey)
|-- routes/           # Definisi endpoint API
|-- seeders/          # Script inisialisasi data awal
|-- utils/            # Fungsi utilitas (Generate Token)
|-- .env              # Variabel lingkungan (Credentials)
|-- package.json      # Dependencies
|-- server.js         # Entry point aplikasi

CARA INSTALASI & MENJALANKAN
----------------------------
1. Prasyarat
   Pastikan Anda telah menginstal Node.js dan memiliki akun MongoDB Atlas.

2. Instalasi Dependencies
   Jalankan perintah berikut di terminal root proyek:
   npm init -y
   npm install express mongoose dotenv bcryptjs jsonwebtoken

3. Konfigurasi Lingkungan (.env)
   Buat file .env di root folder dan isi dengan konfigurasi berikut:

   PORT=3000
   # Username: rainyday404error_db_user | Password: 2GaLCOPzUQ0wJVI9
   # Host: cluster0.v53kzbe.mongodb.net (Punya Rain)
   MONGODB_URI=mongodb+srv://rainyday404error_db_user:2GaLCOPzUQ0wJVI9@cluster0.v53kzbe.mongodb.net/p10_db?retryWrites=true&w=majority

   JWT_SECRET=rahasia-super-aman-simulasi-jwt-rain

4. Database Seeding (Data Awal)
   Sebelum menjalankan server, isi database dengan data awal (User, Produk, dan API Key) menggunakan script seeder:
   node seeders/seed.js

   Pastikan output menunjukkan "Proses Seeding Database Berhasil!".

5. Menjalankan Server
   Jalankan server aplikasi:
   node server.js

   Server akan berjalan di http://localhost:3000

KREDENSIAL PENGUJIAN (SEEDER DATA)
----------------------------------
Gunakan data berikut untuk pengujian di Postman:

1. User Admin
   - Username: admin
   - Password: password123
   - Role: admin
   - Keterangan: Bisa melakukan CRUD (POST, PUT, DELETE)

2. User Biasa
   - Username: userbiasa
   - Password: userpass
   - Role: user
   - Keterangan: Hanya bisa Login, tidak bisa CRUD

3. API Key
   - Key: PRACTICUM_API_KEY_A_1234567890
   - Keterangan: Masukkan di Header x-api-key

DOKUMENTASI API
---------------
1. Autentikasi (Mendapatkan Token)
   - Endpoint: POST /api/v1/auth/token
   - Deskripsi: Login untuk mendapatkan JWT Access Token.
   - Body (JSON):
     {
       "username": "admin",
       "password": "password123"
     }
   - Response: Mengembalikan access_token.

2. Produk (Publik)
   - Endpoint: GET /api/v1/products/public
   - Akses: Memerlukan API Key.
   - Headers:
     x-api-key: PRACTICUM_API_KEY_A_1234567890
   - Response: Daftar semua produk.

3. Produk (Privat - Admin Only)
   Semua endpoint di bawah ini memerlukan header Authorization dengan format: Bearer <access_token>.

   - POST   /api/v1/products/private       (Tambah Produk Baru)
   - PUT    /api/v1/products/private/:id   (Update Produk)
   - DELETE /api/v1/products/private/:id   (Hapus Produk)

   Contoh Body untuk POST/PUT:
   {
     "name": "Produk Baru",
     "price": 50000,
     "stock": 10,
     "description": "Deskripsi produk baru"
   }

CHECKLIST PENGUJIAN
-------------------
Berikut adalah skenario yang harus diuji untuk memastikan sistem berjalan dengan baik:

[ ] GET Public tanpa Key: Harus return 401 Unauthorized.
[ ] GET Public dengan Key Valid: Harus return 200 OK.
[ ] POST Login (Admin): Harus return 200 OK dan Token.
[ ] POST Private (Tanpa Token): Harus return 403 Forbidden.
[ ] POST Private (Token User Biasa): Harus return 403 Forbidden (Role restriction).
[ ] POST Private (Token Admin): Harus return 201 Created.

Dosen Pengampu: Muhayat, M.IT