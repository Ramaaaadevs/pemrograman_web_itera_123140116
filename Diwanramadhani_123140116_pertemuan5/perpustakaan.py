from abc import ABC, abstractmethod

# =========================================================
# BAGIAN 1: Abstract Class dan Item Perpustakaan (Inheritance, Polymorphism)
# =========================================================

class LibraryItem(ABC):
    """
    Abstract Base Class (ABC) untuk semua item perpustakaan.
    Semua item wajib memiliki ID, judul, dan tahun terbit.
    """
    def __init__(self, item_id, judul, tahun):
        # Enkapsulasi: Menggunakan _ sebagai konvensi atribut protected
        self._id = item_id
        self._judul = judul
        self._tahun = tahun

    @abstractmethod
    def display_details(self):
        """Metode abstract: Harus diimplementasikan di setiap subclass."""
        pass
    
    # Getter sederhana untuk diakses oleh class Library
    def get_judul(self):
        return self._judul
    
    def get_id(self):
        return self._id

class Book(LibraryItem):
    """
    Subclass untuk Buku, mewarisi dari LibraryItem.
    Menerapkan Encapsulation dengan property decorator.
    """
    def __init__(self, item_id, judul, tahun, penulis):
        super().__init__(item_id, judul, tahun)
        self._penulis = penulis
        self._jikaAda = True # Protected attribute for encapsulation

    # Property Decorator (Encapsulation)
    @property
    def jikaAda(self):
        """Getter: Mengembalikan status ketersediaan buku."""
        return self._jikaAda

    @jikaAda.setter
    def jikaAda(self, status):
        """Setter: Mengubah status ketersediaan buku dengan validasi."""
        if isinstance(status, bool):
            self._jikaAda = status
        else:
            print("ERROR: Status ketersediaan harus berupa True atau False.")

    # Polymorphism
    def display_details(self):
        """Implementasi wajib dari abstract method."""
        tersedia = " Tersedia" if self.jikaAda else "Dipinjam"
        print(f"Buku ({self._id})")
        print(f"  Judul: {self._judul}")
        print(f"  Penulis: {self._penulis}")
        print(f"  Tahun Terbit: {self._tahun}")
        print(f"  Status: {tersedia}")

class Magazine(LibraryItem):
    """
    Subclass untuk Majalah, mewarisi dari LibraryItem.
    """
    def __init__(self, item_id, judul, tahun, issue_number):
        super().__init__(item_id, judul, tahun)
        self._issue_number = issue_number

    # Polymorphism
    def display_details(self):
        """Implementasi wajib dari abstract method."""
        print(f"Majalah ({self._id})")
        print(f"  Judul: {self._judul}")
        print(f"  Edisi: #{self._issue_number}")
        print(f"  Tahun Terbit: {self._tahun}")

# BAGIAN 2: Class Manajemen (Library)
class Library:
    """
    Class untuk mengelola koleksi item perpustakaan.
    Menerapkan Composition (Library memiliki banyak LibraryItem).
    """
    def __init__(self):
        # Enkapsulasi: List koleksi item adalah protected
        self._items = []

    def add_item(self, item):
        """Menambahkan item (Book/Magazine) ke koleksi."""
        if isinstance(item, LibraryItem):
            self._items.append(item)
            print(f" Item '{item.get_judul()}' berhasil ditambahkan.")
        else:
            print(" ERROR: Objek harus merupakan turunan dari LibraryItem.")

    def display_all_items(self):
        """Menampilkan daftar detail semua item (Polymorphism terjadi di loop ini)."""
        if not self._items:
            print("\Perpustakaan kosong. Tidak ada item untuk ditampilkan.")
            return

        print("\n\nKOLEKSI LENGKAP PERPUSTAKAAN")
        for item in self._items:
            item.display_details() # Method yang dipanggil tergantung tipe objek

    def search_item(self, query):
        """Mencari item berdasarkan judul atau ID."""
        results = []
        query = str(query).lower()
        
        for item in self._items:
            # Pencarian berdasarkan Judul atau ID
            if query in item.get_judul().lower() or query == str(item.get_id()).lower():
                results.append(item)
        
        if results:
            print(f"\nHasil Pencarian untuk '{query}'")
            for item in results:
                item.display_details()
        else:
            print(f"\nItem dengan judul/ID '{query}' tidak ditemukan.")

# BAGIAN 3: EKSEKUSI PROGRAM
if __name__ == "__main__":
    print("SISTEM MANAJEMEN PERPUSTAKAAN O-O P")
    
    # 1. Inisialisasi Library
    my_library = Library()

    # 2. Membuat dan Mengatur Objek
    book1 = Book(101, "Pemrograman Python Untuk Pemula", 2024, "Alice Smith")
    book2 = Book(102, "Filosofi Teras", 2018, "Bob Johnson")
    mag1 = Magazine(201, "Tech Review", 2024, 45)
    mag2 = Magazine(202, "Science Daily", 2025, 12)
    
    # Demonstasi Encapsulation (Menggunakan Setter untuk mengubah status book2)
    book2.jikaAda = False # Mengubah status dari True menjadi False
    
    # 3. Menambahkan Item
    my_library.add_item(book1)
    my_library.add_item(book2)
    my_library.add_item(mag1)
    my_library.add_item(mag2)

    # 4. Menampilkan Semua Item
    my_library.display_all_items()

    # 5. Mencari Item
    my_library.search_item("Python") # Cari berdasarkan judul
    my_library.search_item("201")    # Cari berdasarkan ID Majalah
    my_library.search_item("102")    # Cari berdasarkan ID Buku (Filosofi Teras, Status Dipinjam)
    my_library.search_item("Java")   # Item tidak ditemukan