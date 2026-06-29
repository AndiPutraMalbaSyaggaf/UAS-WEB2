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
git clone https://github.com/AndiPutraMalbaSyaggaf/UAS-WEB2.git
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

- XAMPP

kemudian akses

```
http://localhost/uas_web2/frontend-spa
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
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b20c41c9-7aee-4c64-ad9a-759b6adf869d" />

---

## kategori

- id
- nama_kategori
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/25ff20d6-ebb2-45a1-87b9-739a682379b6" />

---

## supplier

- id
- nama_supplier
- alamat
- telepon
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4f8dadd4-cb6e-48ec-8f52-382547503342" />

---

## barang

- id
- nama_barang
- kategori_id
- supplier_id
- stok
- harga
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3c45bfc2-7b1e-4a89-ab43-14952b4f2161" />

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
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8f0b1891-1c71-42e7-b1e5-f7fb0b7fbe4e" />


- Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3870d08c-c2c8-4294-817f-cb38d8c46b79" />


- Data Barang
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/73aaa801-7a6d-4d40-b049-0167d20ad93c" />


- Data Kategori
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ec32498b-f9bd-4743-8b4f-43cbcf8d37e5" />


- Data Supplier
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/740b91e8-b5cb-4d30-bb44-ada18c4862e1" />

---

# 👨‍💻 Pengembang

Nama : **Andi Putra Malba Syaggaf**

Program Studi : **Teknik Informatika**

Universitas : **Universitas Pelita Bangsa**

Tahun : **2026**

link video : **https://youtu.be/7j3nfTtn98c**

---
