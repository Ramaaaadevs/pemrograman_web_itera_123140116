# 📝 Aplikasi Manajemen Tugas Mahasiswa  

Aplikasi web sederhana untuk membantu mahasiswa mengatur daftar tugas kuliah mereka. Dikembangkan menggunakan **HTML, CSS, dan JavaScript dasar**, aplikasi ini bisa melakukan tambah, lihat, edit, dan hapus tugas langsung dari browser.  
Data tugasnya tersimpan pakai **localStorage**, jadi jadwal tugas tidak akan hilang walau browser ditutup.  

---

## 📸 Screenshot Aplikasi  
Berikut beberapa tampilan dari aplikasi **Manajemen Tugas Mahasiswa**:  

1. **Tampilan Utama + Form Tambah Tugas**  
   ![Tampilan Utama](./Assets/ss1.png)

2. **Daftar Tugas Setelah Ditambah**  
   ![Daftar Tugas](./Assets/ss2.png)

3. **Fitur Filter Tugas (Contoh: Menampilkan yang Udah Selesai)**  
   ![Filter Tugas](./Assets/ss3.png)

---

##  Cara Menjalankan Aplikasi  

Aplikasi webnya ringan dan hanya dijalankan di lokal. Ikutin langkah ini:  

1. Buat folder baru (misal: `manajemen-tugas`)  
2. Di dalamnya, bikin tiga file:  
   - `index.html`  
   - `style.css`  
   - `script.js`  
3. Copy semua kode ke file yang sesuai  
4. Klik go live pada file `index.html` untuk dibuka di browser  
5. Aplikasi web sudah dapat dijalankan!

---

## ✨ Fitur yang Tersedia  

- **Tambah Tugas Baru** → Isi nama tugas, mata kuliah, dan deadline  
- **Lihat Daftar Tugas** → Semua tugas tampil rapih dalam list  
- **Tandai Selesai/Belum** → Bisa centang buat tandai tugas yang udah selesai 
- **Edit Tugas** → Ubah data tugas lewat prompt sederhana  
- **Hapus Tugas** → Hilangkan tugas yang udah nggak dibutuhin  
- **Penyimpanan Lokal (localStorage)** → Data tetap tersimpan walau browser ditutup  
- **Filter Tugas** → Bisa tampilkan semua, yang belum, atau yang udah selesai  
- **Statistik Tugas** → Lihat jumlah tugas yang belum selesai secara langsung  
- **Validasi Form** → Nggak bisa submit form kalau ada kolom yang kosong  

---

## 🔧 Penjelasan Teknis  

### 1. localStorage  
Aplikasi ini menyimpan data tugas di browser pakai **localStorage**.  
Jadi setiap kali menambah, edit, hapus, atau ubah status tugas, datanya langsung disimpan dalam bentuk **JSON string**.  

```js
// Simpan data
localStorage.setItem('tasks', JSON.stringify(tasks));
```

### 2. Validasi Form
Sebelum tugas baru ditambah, aplikasi akan mengecek terlebih dahulu apakah semua kolom udah diisi.
jika ada yang kosong, maka akan muncul alert agar form diisi dulu semuanya.

```js
  taskForm.addEventListener('submit', (e) => {
  const name = taskNameInput.value.trim();
  const course = taskCourseInput.value.trim();
  const deadline = taskDeadlineInput.value;

  if (name === '' || course === '' || deadline === '') {
    alert('Harap isi semua kolom dulu ya!');
    return;
  }

  // lanjut nambah tugas kalau valid
});

