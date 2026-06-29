# UAS-WEB2
PROJECT E-INVENTORY 
# 📦 E-Inventory

E-Inventory adalah aplikasi manajemen inventaris barang berbasis web yang dibangun menggunakan **CodeIgniter 4** sebagai REST API dan **Vue.js** sebagai Single Page Application (SPA). Aplikasi ini digunakan untuk mengelola data barang, kategori, dan supplier dengan sistem autentikasi menggunakan token.

---

# 📋 Daftar Isi

- Tentang Proyek
- Fitur
- Teknologi yang Digunakan
- Struktur Project
- Instalasi
- Konfigurasi Database
- Menjalankan Aplikasi
- Login Default
- REST API
- Struktur Database
- Screenshot
- Pengembang

---

# 📖 Tentang Proyek

Aplikasi ini dibuat sebagai tugas akhir/UAS mata kuliah Pemrograman Web.

Konsep yang digunakan:

- REST API
- Single Page Application (SPA)
- Authentication Token
- CRUD Data
- Axios
- Vue Router

---

# ✨ Fitur

## Authentication

- Login
- Logout
- Token Authentication

## Dashboard

- Halaman Dashboard

## Manajemen Barang

- Tambah Barang
- Edit Barang
- Hapus Barang
- Lihat Barang

## Manajemen Kategori

- Tambah Kategori
- Edit Kategori
- Hapus Kategori

## Manajemen Supplier

- Tambah Supplier
- Edit Supplier
- Hapus Supplier

---

# 🛠 Teknologi

## Backend

- PHP 8.x
- CodeIgniter 4
- MySQL

## Frontend

- Vue.js
- Vue Router
- Axios
- Tailwind CSS

## Database

- MySQL
- phpMyAdmin

---

# 📁 Struktur Project

```
UAS_WEB2/
│
├── backend-api/
│   ├── app/
│   │   ├── Controllers/
│   │   ├── Filters/
│   │   ├── Models/
│   │   ├── Config/
│   │   └── Views/
│   │
│   ├── public/
│   ├── writable/
│   ├── .env
│   └── spark
│
└── frontend-spa/
    ├── js/
    │   ├── components/
    │   ├── services/
    │   ├── app.js
    │   └── router.js
    │
    └── index.html
```

---

# ⚙️ Instalasi

## 1. Clone Repository

```bash
git clone https://github.com/username/e-inventory.git
```

---

## 2. Masuk Folder Backend

```bash
cd backend-api
```

---

## 3. Install Dependency

```bash
composer install
```

---

## 4. Copy File Environment

```bash
cp env .env
```

atau rename

```
env
```

menjadi

```
.env
```

---

## 5. Konfigurasi Database

Edit file

```
.env
```

ubah menjadi

```env
database.default.hostname = localhost
database.default.database = e_inventory
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
```

---

## 6. Jalankan Backend

```bash
php spark serve
```

Output

```
CodeIgniter development server started

http://localhost:8080
```

---

## 7. Jalankan Frontend

Buka folder

```
frontend-spa
```

Menggunakan

- Live Server VS Code

atau

- XAMPP

kemudian akses

```
http://localhost/frontend-spa/
```

---

# 👤 Login Default

Username

```
admin
```

Password

```
admin123
```

---

# 🔑 REST API

## Login

```
POST /api/login
```

Body

```json
{
    "username":"admin",
    "password":"admin123"
}
```

Response

```json
{
    "status":200,
    "message":"Login berhasil",
    "token":"xxxxxxxxxxxxxxxx"
}
```

---

## Barang

| Method | Endpoint |
|---------|----------|
| GET | /api/barang |
| POST | /api/barang |
| PUT | /api/barang/{id} |
| DELETE | /api/barang/{id} |

---

## Kategori

| Method | Endpoint |
|---------|----------|
| GET | /api/kategori |
| POST | /api/kategori |
| PUT | /api/kategori/{id} |
| DELETE | /api/kategori/{id} |

---

## Supplier

| Method | Endpoint |
|---------|----------|
| GET | /api/supplier |
| POST | /api/supplier |
| PUT | /api/supplier/{id} |
| DELETE | /api/supplier/{id} |

---

# 🗄 Struktur Database

## users

| Field | Type |
|---------|------|
| id | int |
| username | varchar |
| password | varchar |
| token | varchar |

---

## kategori

- id
- nama_kategori

---

## supplier

- id
- nama_supplier
- alamat
- telepon

---

## barang

- id
- nama_barang
- kategori_id
- supplier_id
- stok
- harga

---

# 🔐 Authentication

Setelah login berhasil, aplikasi akan menyimpan token ke Local Storage.

```
localStorage.token
```

Setiap request API akan mengirimkan

```
Authorization: Bearer {token}
```

menggunakan Axios Interceptor.

---

# 📸 Screenshot

Tambahkan screenshot aplikasi berikut:

- Login
- Dashboard
- Data Barang
- Data Kategori
- Data Supplier

---

# 👨‍💻 Pengembang

Nama : **Andi Putra Malba Syaggaf**

Program Studi : **Teknik Informatika**

Universitas : **(Isi Nama Universitas Anda)**

Tahun : **2026**

---

# 📄 Lisensi

Project ini dibuat untuk memenuhi tugas mata kuliah Pemrograman Web dan hanya digunakan untuk keperluan akademik.
