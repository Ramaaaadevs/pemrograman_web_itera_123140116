document.addEventListener('DOMContentLoaded', () => {
    // Selektor untuk elemen-elemen DOM
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskCourseInput = document.getElementById('task-course');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const taskList = document.getElementById('task-list');
    const taskStats = document.getElementById('task-stats');
    // const searchInput = document.getElementById('search-input'); // <-- BARIS INI DIHAPUS
    const filterStatus = document.getElementById('filter-status');

    // Mengambil data dari localStorage atau inisialisasi array kosong
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Fungsi untuk menyimpan data ke localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Fungsi untuk merender (menampilkan) daftar tugas
    const renderTasks = () => {
        taskList.innerHTML = ''; // Kosongkan daftar sebelum render ulang
        
        // Ambil nilai filter status
        const statusFilter = filterStatus.value;
        
        const filteredTasks = tasks.filter(task => {
            // Logika pencarian dihapus, hanya menyisakan filter status
            const matchesStatus = (statusFilter === 'all') || 
                                  (statusFilter === 'completed' && task.completed) ||
                                  (statusFilter === 'incomplete' && !task.completed);
                                  
            return matchesStatus;
        });
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li>Tidak ada tugas yang sesuai.</li>';
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <div class="task-details">
                    <p class="task-name">${task.name}</p>
                    <p class="task-course">${task.course}</p>
                    <p class="task-deadline">Deadline: ${task.deadline}</p>
                </div>
                <div class="task-actions">
                    <input type="checkbox" class="toggle-complete" ${task.completed ? 'checked' : ''}>
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        
        // Update statistik tugas (tidak ada perubahan di sini)
        taskStats.innerHTML = `Tugas yang belum selesai: <strong>${tasks.filter(t => !t.completed).length}</strong>`;
    };

    // --- EVENT LISTENERS ---

    // 1. Tambah Tugas (Submit Form) - Tidak ada perubahan
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = taskNameInput.value.trim();
        const course = taskCourseInput.value.trim();
        const deadline = taskDeadlineInput.value;

        if (name === '' || course === '' || deadline === '') {
            alert('Harap isi semua kolom yang wajib diisi!');
            return;
        }

        const newTask = {
            id: Date.now(),
            name,
            course,
            deadline,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    // 2. Aksi pada Daftar Tugas (Selesai, Edit, Hapus) - Tidak ada perubahan
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const parentLi = target.closest('.task-item');
        if (!parentLi) return;
        
        const taskId = Number(parentLi.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (target.classList.contains('toggle-complete')) {
            tasks[taskIndex].completed = target.checked;
        }
        
        if (target.classList.contains('delete-btn')) {
            if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
                tasks.splice(taskIndex, 1);
            }
        }
        
        if (target.classList.contains('edit-btn')) {
            const currentTask = tasks[taskIndex];
            const newName = prompt('Masukkan nama tugas baru:', currentTask.name);
            const newCourse = prompt('Masukkan mata kuliah baru:', currentTask.course);
            
            if (newName !== null && newName.trim() !== '') {
                tasks[taskIndex].name = newName.trim();
            }
            if (newCourse !== null && newCourse.trim() !== '') {
                tasks[taskIndex].course = newCourse.trim();
            }
        }

        saveTasks();
        renderTasks();
    });
    
    // 3. Filter dan Pencarian
    // searchInput.addEventListener('input', renderTasks); // <-- BARIS INI DIHAPUS
    filterStatus.addEventListener('change', renderTasks);

    // Render tugas saat halaman pertama kali dimuat
    renderTasks();
});