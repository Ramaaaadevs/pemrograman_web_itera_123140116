# 📝 Aplikasi Manajemen Tugas Mahasiswa  

Aplikasi web sederhana buat bantu mahasiswa ngatur daftar tugas kuliah mereka. Dibikin pakai **HTML, CSS, dan JavaScript murni**, aplikasi ini bisa buat kamu nambah, liat, edit, dan hapus tugas langsung dari browser.  
Data tugasnya disimpen pakai **localStorage**, jadi nggak bakal hilang walau browser ditutup.  

---

## 📸 Screenshot Aplikasi  
Berikut beberapa tampilan dari aplikasi **Manajemen Tugas Mahasiswa** (ganti placeholder di bawah ini sama screenshot aplikasimu ya 👇):  

1. **Tampilan Utama + Form Tambah Tugas**  
   ![Tampilan Utama](screenshot1.png)

2. **Daftar Tugas Setelah Ditambah**  
   ![Daftar Tugas](screenshot2.png)

3. **Fitur Filter Tugas (Contoh: Menampilkan yang Udah Selesai)**  
   ![Filter Tugas](screenshot3.png)

---

## 🚀 Cara Menjalankan Aplikasi  

Aplikasinya ringan banget dan nggak butuh install apa-apa. Cukup ikutin langkah ini:  

1. Buat folder baru (misal: `manajemen-tugas`)  
2. Di dalamnya, bikin tiga file:  
   - `index.html`  
   - `style.css`  
   - `script.js`  
3. Copy semua kode ke file yang sesuai  
4. Klik dua kali `index.html` buat buka di browser  
5. Udah deh! Aplikasi siap dipakai 😎  

---

## ✨ Fitur yang Tersedia  

- **Tambah Tugas Baru** → Isi nama tugas, mata kuliah, dan deadline  
- **Lihat Daftar Tugas** → Semua tugas tampil rapi dalam list  
- **Tandai Selesai/Belum** → Bisa centang buat tandai tugas yang udah kelar  
- **Edit Tugas** → Ubah data tugas lewat prompt sederhana  
- **Hapus Tugas** → Hilangkan tugas yang udah nggak dibutuhin  
- **Penyimpanan Lokal (localStorage)** → Data tetap tersimpan walau browser ditutup  
- **Filter Tugas** → Bisa tampilkan semua, yang belum, atau yang udah selesai  
- **Statistik Tugas** → Lihat jumlah tugas yang belum selesai secara langsung  
- **Validasi Form** → Nggak bisa submit form kalau ada kolom yang kosong  

---

## 🔧 Penjelasan Teknis  

### 1. localStorage  
Aplikasi ini nyimpen semua data tugas di browser pakai **localStorage**.  
Jadi setiap kali kamu nambah, edit, hapus, atau ubah status tugas, datanya langsung disimpan dalam bentuk **JSON string**.  

```js
// Simpan data
localStorage.setItem('tasks', JSON.stringify(tasks));
