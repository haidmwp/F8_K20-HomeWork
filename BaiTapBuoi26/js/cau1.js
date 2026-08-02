// Quản lý trạng thái ứng dụng (State)
let todos = []; 
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const errorMessage = document.getElementById('error-message');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoStats = document.getElementById('todo-stats');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// --- CHỨC NĂNG THÊM TODO ---
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        errorMessage.textContent = 'Vui lòng nhập nội dung todo!';
        return;
    }
    
    errorMessage.textContent = ''; // Xóa thông báo lỗi cũ
    
    const newTodo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        isDeleted: false // Kỹ thuật Soft Delete
    };
    
    todos.push(newTodo);
    todoInput.value = '';
    todoInput.focus();
    
    render();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

// --- EVENT DELEGATION (LẮNG NGHE TRÊN CONTAINER) ---
// Dùng sự kiện 'change' để bắt trạng thái checkbox toggle hoàn thành
todoList.addEventListener('change', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
        const id = e.target.closest('.todo-item').dataset.id;
        toggleTodo(id);
    }
});

// Dùng sự kiện 'click' để xử lý nút xóa công việc
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.closest('.todo-item').dataset.id;
        deleteTodo(id);
    }
    });

    // --- CHỨC NĂNG TOGGLE HOÀN THÀNH & SOFT DELETE ---
    function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    render();
    }

    function deleteTodo(id) {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa todo này không?");
    if (!isConfirm) return;

    const todoElement = document.querySelector(`[data-id="${id}"]`);
    
    // Tạo hiệu ứng transition mượt trước khi render lại danh sách
    todoElement.classList.add('fall');
    todoElement.addEventListener('transitionend', () => {
        todos = todos.map(todo => 
        todo.id === id ? { ...todo, isDeleted: true } : todo
        );
        render();
    });
    }

    // --- CHỈNH SỬA TODO (DOUBLE-CLICK INLINE) ---
    todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const todoItem = e.target.closest('.todo-item');
        const id = todoItem.dataset.id;
        const todo = todos.find(t => t.id === id);
        
        // Nếu todo đã hoàn thành thì không cho chỉnh sửa
        if (todo.completed) return;

        const originalText = todo.text;
        const leftContainer = todoItem.querySelector('.todo-left');
        
        // Tạo cấu trúc input sửa đổi và thẻ chứa lỗi nội bộ
        leftContainer.innerHTML = `
        <div class="edit-wrapper">
            <input type="text" class="edit-input" value="${originalText}">
            <div class="error-text edit-error"></div>
        </div>
        `;
        
        const editInput = leftContainer.querySelector('.edit-input');
        editInput.focus();
        // Đưa con trỏ chuột về cuối dòng text
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);

        // Biến cờ để tránh xung đột trigger sự kiện liên tiếp giữa Blur và Enter
        let isSaved = false;

        const saveEdit = () => {
        if (isSaved) return;
        const newText = editInput.value.trim();
        
        if (newText === '') {
            const innerError = leftContainer.querySelector('.edit-error');
            innerError.textContent = 'Vui lòng nhập nội dung todo!';
            return;
        }
        
        isSaved = true;
        todos = todos.map(t => t.id === id ? { ...t, text: newText } : t);
        render();
        };

        const cancelEdit = () => {
        isSaved = true;
        render();
        };

        // Xử lý sự kiện khi gõ phím
        editInput.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') saveEdit();
        if (evt.key === 'Escape') cancelEdit();
        });

        // Tự động lưu khi click ra ngoài (Blur)
        editInput.addEventListener('blur', saveEdit);
    }
});

// --- LỌC TODO ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// --- RENDER GIAO DIỆN (UI) ---
function render() {
    // Lấy danh sách các item chưa bị Soft Delete
    const activeTodos = todos.filter(todo => !todo.isDeleted);
    
    // Lọc theo bộ lọc hiện tại
    let filteredTodos = activeTodos;
    if (currentFilter === 'uncompleted') {
        filteredTodos = activeTodos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = activeTodos.filter(t => t.completed);
    }

    // Hiển thị danh sách hoặc thông báo trống
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<li class="empty-message">Không có công việc nào</li>`;
    } else {
        todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-left">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            </div>
            <button class="delete-btn">Xóa</button>
        </li>
        `).join('');
    }

    // Cập nhật thống kê (Số lượng hoàn thành / Tổng số lượng thực tế)
    const totalCount = activeTodos.length;
    const completedCount = activeTodos.filter(t => t.completed).length;
    todoStats.textContent = `${completedCount}/${totalCount} mục đã hoàn thành`;

    // Hiển thị/Ẩn nút "Xóa tất cả" công việc đã hoàn thành
    if (completedCount > 0) {
        clearCompletedBtn.classList.remove('hidden');
    } else {
        clearCompletedBtn.classList.add('hidden');
    }
}

// --- XÓA TOÀN BỘ TODO ĐÃ HOÀN THÀNH ---
clearCompletedBtn.addEventListener('click', () => {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa toàn bộ công việc đã hoàn thành?");
    if (!isConfirm) return;

    // Thực hiện Soft Delete cho toàn bộ mục đã hoàn thành
    todos = todos.map(todo => 
        todo.completed ? { ...todo, isDeleted: true } : todo
    );
    render();
});

// Khởi chạy ứng dụng lần đầu
render();
