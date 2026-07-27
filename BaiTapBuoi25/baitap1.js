document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const todoCount = document.getElementById("todo-count");

    // Hàm cập nhật số lượng công việc chưa làm xong
    function updateCount() {
        const totalItems = todoList.querySelectorAll("li").length;
        const completedItems = todoList.querySelectorAll("li.completed").length;
        const activeCount = totalItems - completedItems;
        todoCount.textContent = `Còn ${activeCount} việc chưa xong`;
    }

    // Hàm báo lỗi trùng lặp bằng cách đổi màu viền input trong 1 giây
    function triggerDuplicateError() {
        todoInput.classList.add("input-error");
        setTimeout(() => {
            todoInput.classList.remove("input-error");
        }, 1000);
    }

    // Hàm xử lý thêm công việc mới
    function addTodo() {
        const text = todoInput.value.trim();

        // 1. Kiểm tra rỗng hoặc chỉ toàn khoảng trắng
        if (text === "") {
            return;
        }

        // 2. Kiểm tra trùng lặp nội dung chữ (không phân biệt hoa thường)
        const currentTodos = Array.from(todoList.querySelectorAll("li span"))
                                  .map(span => span.textContent.trim().toLowerCase());
        
        if (currentTodos.includes(text.toLowerCase())) {
            triggerDuplicateError();
            return;
        }

        // 3. Tạo phần tử li mới
        const li = document.createElement("li");

        // Tạo thẻ span chứa nội dung chữ (để phân biệt khi click với nút xóa)
        const span = document.createElement("span");
        span.textContent = text;
        
        // Tạo nút Xóa riêng cho việc này
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Xóa";
        deleteBtn.style.marginLeft = "10px";

        // Sự kiện khi click vào phần chữ: Thay đổi trạng thái xong/chưa xong
        span.addEventListener("click", () => {
            li.classList.toggle("completed");
            updateCount();
        });

        // Sự kiện khi click nút Xóa: Xóa li và cập nhật lại số đếm
        deleteBtn.addEventListener("click", () => {
            li.remove();
            updateCount();
        });

        // Lắp ráp span và button vào thẻ li, sau đó đẩy vào danh sách ul
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        // Xóa trắng ô input và cập nhật số đếm tổng
        todoInput.value = "";
        updateCount();
    }

    // Sự kiện khi bấm nút "Thêm"
    addBtn.addEventListener("click", addTodo);

    // Sự kiện khi nhấn phím "Enter" trong ô input
    todoInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTodo();
        }
    });
});