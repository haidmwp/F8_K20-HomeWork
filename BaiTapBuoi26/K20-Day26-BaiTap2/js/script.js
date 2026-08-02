const container = document.getElementById('myTabs');
const buttons = Array.from(container.querySelectorAll('.tab-btn'));
const panels = Array.from(container.querySelectorAll('.tab-panel'));
let currentIndex = 0;

// Hàm kích hoạt Tab dựa trên Index
function switchTab(index) {
    // Cập nhật trạng thái các nút
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });

    // Cập nhật hiển thị các panel nội dung thông qua CSS
    panels.forEach((panel, i) => {
        if (i === index) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    currentIndex = index;
}

// 1. Lắng nghe sự kiện Click chuột vào nút Tab
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        switchTab(index);
        button.focus(); // Focus vào nút vừa click để tiếp tục dùng bàn phím
    });
});

// 2. Hàm xử lý sự kiện khi bấm phím mũi tên
function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Ngăn cuộn trang mặc định
        // Chuyển vòng về cuối nếu đang ở đầu
        const nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        switchTab(nextIndex);
        buttons[nextIndex].focus();
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        // Chuyển vòng về đầu nếu đang ở cuối
        const nextIndex = (currentIndex + 1) % buttons.length;
        switchTab(nextIndex);
        buttons[nextIndex].focus();
    }
}

// 3. Khi Focus vào vùng Tabs -> Bắt đầu lắng nghe sự kiện gõ bàn phím
container.addEventListener('focusin', () => {
    container.addEventListener('keydown', handleKeyDown);
});

// 4. Khi Blur (rời khỏi) vùng Tabs -> Gỡ bỏ listener keydown để tối ưu hiệu năng
container.addEventListener('focusout', (event) => {
    // Kiểm tra xem phần tử focus tiếp theo có nằm ngoài vùng container không
    if (!container.contains(event.relatedTarget)) {
        container.removeEventListener('keydown', handleKeyDown);
    }
});