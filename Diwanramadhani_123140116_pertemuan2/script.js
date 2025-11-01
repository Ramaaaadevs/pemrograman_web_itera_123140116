/**
 * File: script.js
 * Fungsi: Logika utama untuk aplikasi Personal Dashboard.
 * Fitur: Mengelola catatan (CRUD) dan mengambil data API (Waktu & IP).
 */

// Pastikan semua elemen HTML sudah siap (DOM loaded) sebelum menjalankan skrip.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Inisialisasi Elemen & Variabel Global
     * 'const' untuk elemen UI yang tidak akan berubah.
     * 'let' untuk data (array notes) yang akan dimanipulasi.
     */
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const noteList = document.getElementById('note-list');
    const noteEditId = document.getElementById('note-edit-id');
    const noteSubmitBtn = document.getElementById('note-submit-btn');
    const timeDisplay = document.getElementById('time-display');
    const ipDisplay = document.getElementById('ip-display');

    let notes = []; // Array untuk menyimpan semua objek catatan.

    /**
     * Class Note
     * Blueprint atau cetakan untuk membuat objek catatan baru.
     * Memastikan setiap catatan memiliki struktur data yang konsisten.
     */
    class Note {
        constructor(id, content) {
            this.id = id;       // ID unik (menggunakan timestamp)
            this.content = content; // Isi teks catatan
        }
    }

    /**
     * fetchInfo
     * Fungsi asinkron (async/await) untuk mengambil data dari API eksternal.
     * Menggunakan Promise.all agar fetch waktu dan IP berjalan paralel.
     */
    const fetchInfo = async () => {
        try {
            // Menjalankan kedua fetch secara bersamaan
            const [timeResponse, ipResponse] = await Promise.all([
                fetch('https://worldtimeapi.org/api/ip'),
                fetch('https://api.ipify.org?format=json')
            ]);

            // Cek jika salah satu request gagal
            if (!timeResponse.ok || !ipResponse.ok) {
                throw new Error('Gagal mengambil data dari API');
            }

            // Ambil data JSON dari respons
            const timeData = await timeResponse.json();
            const ipData = await ipResponse.json();

            // Format data waktu agar mudah dibaca
            const dateTime = new Date(timeData.datetime);

            // Tampilkan data ke HTML menggunakan Template Literals
            timeDisplay.textContent = `Waktu (${timeData.timezone}): ${dateTime.toLocaleString('id-ID')}`;
            ipDisplay.textContent = `Alamat IP Anda: ${ipData.ip}`;

        } catch (error) {
            // Tangani jika terjadi error saat fetch
            console.error('Error fetching info:', error);
            timeDisplay.textContent = 'Gagal memuat waktu.';
            ipDisplay.textContent = 'Gagal memuat IP.';
        }
    };

    /**
     * loadNotesFromStorage
     * Mengambil data notes (string) dari localStorage.
     * Mengubah string JSON kembali menjadi array JavaScript.
     */
    const loadNotesFromStorage = () => {
        const storedNotes = localStorage.getItem('dashboard-notes');
        if (storedNotes) {
            notes = JSON.parse(storedNotes);
        }
    };

    /**
     * saveNotesToStorage
     * Menyimpan array 'notes' ke localStorage.
     * Mengubah array JavaScript menjadi string JSON.
     */
    const saveNotesToStorage = () => {
        localStorage.setItem('dashboard-notes', JSON.stringify(notes));
    };

    /**
     * renderNotes
     * Bertanggung jawab untuk menampilkan data dari array 'notes' ke DOM (list <ul>).
     * Menggunakan template literals untuk membuat elemen <li>.
     */
    const renderNotes = () => {
        noteList.innerHTML = ''; // Kosongkan list sebelum render ulang

        // Tampilkan pesan jika tidak ada catatan
        if (notes.length === 0) {
            noteList.innerHTML = '<li>Belum ada catatan.</li>';
            return;
        }

        // Loop setiap note dan buat elemen HTML-nya
        notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${note.content}</span>
                <div class="note-actions">
                    <button class="edit-btn" data-id="${note.id}">Edit</button>
                    <button class="delete-btn" data-id="${note.id}">Hapus</button>
                </div>
            `;
            noteList.appendChild(li);
        });
    };

    /**
     * Event Listener: noteForm 'submit'
     * Menangani aksi saat form di-submit (untuk Tambah atau Update).
     */
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah halaman reload
        const noteContent = noteInput.value.trim();
        const currentEditId = noteEditId.value;

        if (noteContent === '') return; // Jangan proses jika input kosong

        if (currentEditId) {
            // === Mode Update ===
            // Cari note yang akan di-update
            const noteToUpdate = notes.find(note => note.id == currentEditId);
            if (noteToUpdate) {
                noteToUpdate.content = noteContent;
            }
            // Reset form ke mode 'Tambah'
            noteEditId.value = '';
            noteSubmitBtn.textContent = 'Tambah Catatan';
        } else {
            // === Mode Tambah Baru ===
            // Buat objek note baru menggunakan Class
            const newNote = new Note(Date.now(), noteContent);
            notes.push(newNote);
        }

        noteInput.value = ''; // Kosongkan input field
        saveNotesToStorage(); // Simpan ke localStorage
        renderNotes();        // Tampilkan ulang list di HTML
    });

    /**
     * Event Listener: noteList 'click'
     * Menggunakan Event Delegation untuk menangani klik pada tombol Edit atau Delete.
     * Ini lebih efisien daripada menambah listener di setiap tombol.
     */
    noteList.addEventListener('click', (e) => {
        const target = e.target; // Elemen yang diklik
        const noteId = target.dataset.id; // Ambil ID dari atribut 'data-id'

        // Pastikan yang diklik adalah tombol
        if (!noteId) return;

        // === Aksi Delete ===
        if (target.classList.contains('delete-btn')) {
            // Buat array baru tanpa note yang dihapus (Higher-Order Function)
            notes = notes.filter(note => note.id != noteId);
            saveNotesToStorage();
            renderNotes();
        }

        // === Aksi Edit ===
        if (target.classList.contains('edit-btn')) {
            // Cari note yang akan diedit
            const noteToEdit = notes.find(note => note.id == noteId);
            if (noteToEdit) {
                // Masukkan data note ke form
                noteInput.value = noteToEdit.content;
                noteEditId.value = noteToEdit.id;
                noteSubmitBtn.textContent = 'Update Catatan';
                noteInput.focus(); // Fokuskan kursor ke input field
            }
        }
    });

    /**
     * initializeApp
     * Fungsi utama untuk setup dan menjalankan aplikasi saat pertama kali load.
     */
    const initializeApp = () => {
        loadNotesFromStorage(); // Ambil data lama (jika ada)
        renderNotes();          // Tampilkan notes
        fetchInfo();            // Ambil data waktu & IP
    };

    // Mulai! Jalankan fungsi inisialisasi.
    initializeApp();

});