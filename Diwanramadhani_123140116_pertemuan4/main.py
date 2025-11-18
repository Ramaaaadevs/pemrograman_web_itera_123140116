# 1. Data Mahasiswa (minimal 5 dictionary)
data_mahasiswa = [
    {"nama": "Diwan","NIM": 123140116, "nilai_uts": 85,"nilai_uas": 90,"nilai_tugas": 80},
    {"nama": "Ramadhani","NIM": 123140117,"nilai_uts": 65,"nilai_uas": 70,"nilai_tugas": 75},
    {"nama": "Dwi","NIM": "123140118","nilai_uts": 90,"nilai_uas": 85,"nilai_tugas": 95},
    {"nama": "putra","NIM": "123140119","nilai_uts": 50,"nilai_uas": 60,"nilai_tugas": 55},
    {"nama": "ganteng","NIM": "123140110","nilai_uts": 75,"nilai_uas": 80,"nilai_tugas": 70}
]

# --- FUNGSI-FUNGSI UTAMA ---

#hitung nilai akhir bobot 30% UTS, 40% UAS, 30% Tugas.
def hitung_nilai_akhir(uts, uas, tugas):
    nilai_akhir = (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)
    return nilai_akhir

#menentukan grade berdasarkan nilai akhir
def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

# 4. Fungsi untuk menampilkan data dalam format tabel
def tampilkan_data_tabel(data):
    """Menampilkan data mahasiswa dalam format tabel."""
    print(f"| {'No':<3} | {'NIM':<10} | {'Nama':<15} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<7} | {'Nilai Akhir':<11} | {'Grade':<5} |")
    
    for i, mhs in enumerate(data):
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        
        # Tambahkan nilai_akhir dan grade ke dictionary agar bisa diakses fungsi lain
        mhs['nilai_akhir'] = nilai_akhir
        mhs['grade'] = grade

        print(f"| {i+1:<3} | {mhs['NIM']:<10} | {mhs['nama']:<15} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<7} | {mhs['nilai_akhir']:<11} | {mhs['grade']:<5} |")

#cari mahasiswa dengan nilai tertinggi/terendah
def cari_min_max_nilai(data, tipe='tertinggi'):
    """Mencari mahasiswa dengan nilai akhir tertinggi atau terendah."""
    if not data:
        return None

    #setiap dictionary memiliki 'nilai_akhir' yang sudah dihitung
    for mhs in data:
        if 'nilai_akhir' not in mhs:
             mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])

    if tipe == 'tertinggi':
        mahasiswa_target = max(data, key=lambda mhs: mhs['nilai_akhir'])
    elif tipe == 'terendah':
        mahasiswa_target = min(data, key=lambda mhs: mhs['nilai_akhir'])
    else:
        return None
        
    return mahasiswa_target


#input data mahasiswa baru
def input_mahasiswa_baru(data):
    """Meminta input dari user untuk data mahasiswa baru."""
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Masukkan Nama: ")
    nim = input("Masukkan NIM: ")
    uts = int(input("Masukkan Nilai UTS: "))
    uas = int(input("Masukkan Nilai UAS: "))
    tugas = int(input("Masukkan Nilai Tugas: "))

    data_baru = {
        "nama": nama,
        "NIM": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    }
    data.append(data_baru)
    print(f"\nData mahasiswa {nama} berhasil ditambahkan!")
    return data

# filter mahasiswa berdasarkan grade
def filter_berdasarkan_grade(data, target_grade):
    """Memfilter dan mengembalikan list mahasiswa dengan grade tertentu."""
    hasil_filter = []
    for mhs in data:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        if grade.upper() == target_grade.upper():
            hasil_filter.append(mhs)
    return hasil_filter

#hitung rata-rata nilai kelas
def hitung_rata_rata_kelas(data):
    """Menghitung rata-rata nilai akhir untuk seluruh kelas."""
    if not data:
        return 0
        
    total_nilai = 0
    for mhs in data:
        # Pastikan menggunakan nilai akhir yang sudah dihitung
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        total_nilai += nilai_akhir
        
    rata_rata = total_nilai / len(data)
    return round(rata_rata, 2)


#eksekusi program
if __name__ == "__main__":
    print("APLIKASI PENGELOLAAN DATA NILAI MAHASISWA")
    
    # 1. Tampilkan data awal dalam format tabel
    print("\n[1] Data Mahasiswa Awal:")
    tampilkan_data_tabel(data_mahasiswa)
    print("\n")

    # 2. Tampilkan rata-rata nilai kelas
    rata_rata = hitung_rata_rata_kelas(data_mahasiswa)
    print(f"Rata-rata Nilai Akhir Kelas: {rata_rata}")

    # 3. Cari dan tampilkan nilai tertinggi
    mhs_tertinggi = cari_min_max_nilai(data_mahasiswa, tipe='tertinggi')
    if mhs_tertinggi:
        print(f"Mahasiswa Nilai Tertinggi: {mhs_tertinggi['nama']} ({mhs_tertinggi['NIM']}) dengan nilai {mhs_tertinggi['nilai_akhir']} (Grade: {mhs_tertinggi['grade']})")

    # 4. Cari dan tampilkan nilai terendah
    mhs_terendah = cari_min_max_nilai(data_mahasiswa, tipe='terendah')
    if mhs_terendah:
        print(f"Mahasiswa Nilai Terendah: {mhs_terendah['nama']} ({mhs_terendah['NIM']}) dengan nilai {mhs_terendah['nilai_akhir']} (Grade: {mhs_terendah['grade']})")

    # 5. Contoh Filter berdasarkan Grade 'B'
    grade_target = 'B'
    mahasiswa_grade_b = filter_berdasarkan_grade(data_mahasiswa, grade_target)
    
    print(f"\n[2] Mahasiswa dengan Grade {grade_target}: ({len(mahasiswa_grade_b)} orang)")
    if mahasiswa_grade_b:
        tampilkan_data_tabel(mahasiswa_grade_b)
    else:
        print("Tidak ada mahasiswa dengan grade tersebut.")
        
    #6. Contoh Input Data Baru
    data_mahasiswa = input_mahasiswa_baru(data_mahasiswa)
    print("\n[3] Data Mahasiswa Setelah Penambahan:")
    tampilkan_data_tabel(data_mahasiswa)