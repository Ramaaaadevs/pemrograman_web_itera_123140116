# 📚 Aplikasi Manajemen Matakuliah (Pyramid API)

Aplikasi ini merupakan implementasi API RESTful untuk mengelola data Matakuliah yang mencakup operasi CRUD. Proyek menggunakan Python dengan Pyramid Web Framework, SQLite sebagai database, serta SQLAlchemy dan Alembic untuk ORM dan migrasi.

## 💻 Deskripsi Proyek
Aplikasi ini bertindak sebagai backend yang menyediakan layanan pengelolaan data Matakuliah melalui endpoint HTTP. Data dikelola menggunakan SQLite dan diakses melalui SQLAlchemy, sementara Alembic digunakan untuk mengatur migrasi database.

## Gambar



---

## 🛠️ Cara Instalasi dan Konfigurasi
Pastikan Python 3 sudah terpasang di sistem Ubuntu atau Linux.

### 1. Membuat Virtual Environment (VENV)
```bash\python3 -m venv venv
source venv/bin/activate
```

### 2. Instalasi Dependensi
Instal seluruh library yang diperlukan.
```bash
pip install pyramid sqlalchemy alembic pyramid_tm zope.sqlalchemy
```

### 3. Konfigurasi Database (Alembic)
Pastikan env.py telah mengimpor Base dari models.py dan alembic.ini sudah diarahkan ke `sqlite:///matakuliah.db`.

#### Inisialisasi Alembic (jika belum ada folder alembic)
```bash
alembic init alembic
```

#### Generate Migrasi
```bash
alembic revision --autogenerate -m "inisialisasi_tabel_matakuliah"
```

#### Jalankan Migrasi
```bash
alembic upgrade head
```

---

## ▶️ Cara Menjalankan
Setelah migrasi berhasil, jalankan server.

```bash
python3 app.py
```

Aplikasi dapat diakses melalui `http://localhost:6543`.

---

## 🔗 API Endpoints
Semua endpoint menggunakan format JSON.

| Method | URL | Deskripsi |
|--------|--------------------------|------------------------------|
| GET | /api/matakuliah | Mendapatkan semua Matakuliah |
| GET | /api/matakuliah/{id} | Mendapatkan Matakuliah berdasarkan ID |
| POST | /api/matakuliah | Menambahkan Matakuliah baru |
| PUT | /api/matakuliah/{id} | Memperbarui data Matakuliah |
| DELETE | /api/matakuliah/{id} | Menghapus Matakuliah |

---

## 🧪 Testing (Contoh Perintah cURL)
Pastikan server berjalan.

### 1. POST Menambahkan Matakuliah Baru
```bash
curl -X POST http://localhost:6543/api/matakuliah \
-H "Content-Type: application/json" \
-d '{"kode_mk": "IF101", "nama_mk": "Algoritma dan Pemrograman", "sks": 3, "semester": 1}'
```

```bash
curl -X POST http://localhost:6543/api/matakuliah \
-H "Content-Type: application/json" \
-d '{"kode_mk": "IF202", "nama_mk": "Struktur Data", "sks": 3, "semester": 3}'
```

### 2. GET Semua Matakuliah
```bash
curl -X GET http://localhost:6543/api/matakuliah
```

### 3. GET Detail Matakuliah (ID 1)
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

### 4. PUT Update Matakuliah (ID 2)
```bash
curl -X PUT http://localhost:6543/api/matakuliah/2 \
-H "Content-Type: application/json" \
-d '{"sks": 4, "semester": 4}'
```

### 5. DELETE Menghapus Matakuliah (ID 1)
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

