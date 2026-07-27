document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitBtn = document.getElementById("submit-btn");

  // Tạo sẵn một thẻ p để hiển thị thông báo thành công ở cuối form
  const successMsg = document.createElement("p");
  successMsg.id = "success-msg";
  form.appendChild(successMsg);

  // Đối tượng lưu trạng thái "đã từng tương tác" (blur hoặc input) của từng ô
  const touchedFields = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  };

  // --- CÁC HÀM KIỂM TRA ĐIỀU KIỆN (VALIDATION) ---

  function validateUsername() {
    const value = usernameInput.value;
    const errorEl = document.getElementById("username-error");
    
    // Regex: Chỉ cho phép chữ cái, chữ số, dấu gạch dưới và không có khoảng trắng
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (value.length < 4) {
      if (touchedFields.username) errorEl.textContent = "Tên đăng nhập phải có ít nhất 4 ký tự.";
      return false;
    }
    if (!usernameRegex.test(value)) {
      if (touchedFields.username) errorEl.textContent = "Chỉ được chứa chữ cái, chữ số, dấu gạch dưới và không có khoảng trắng.";
      return false;
    }
    
    errorEl.textContent = "";
    return true;
  }

  function validateEmail() {
    const value = emailInput.value;
    const errorEl = document.getElementById("email-error");
    
    // Regex kiểm tra định dạng email cơ bản định danh cấu trúc: tên@tên-miền
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      if (touchedFields.email) errorEl.textContent = "Email không đúng định dạng.";
      return false;
    }
    
    errorEl.textContent = "";
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    const errorEl = document.getElementById("password-error");
    
    // Regex kiểm tra có ít nhất 1 chữ số
    const hasNumber = /\d/;

    if (value.length < 8) {
      if (touchedFields.password) errorEl.textContent = "Mật khẩu phải có ít nhất 8 ký tự.";
      return false;
    }
    if (!hasNumber.test(value)) {
      if (touchedFields.password) errorEl.textContent = "Mật khẩu phải chứa ít nhất 1 chữ số.";
      return false;
    }
    
    errorEl.textContent = "";
    return true;
  }

  function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    const errorEl = document.getElementById("confirm-password-error");

    if (value !== passwordValue) {
      if (touchedFields.confirmPassword) errorEl.textContent = "Mật khẩu nhập lại không khớp.";
      return false;
    }
    
    errorEl.textContent = "";
    return true;
  }

  // --- CẬP NHẬT TRẠNG THÁI NÚT ĐĂNG KÝ ---
  function checkFormValidity() {
    // Gọi hàm kiểm tra nhưng không truyền thông báo lỗi nếu ô đó chưa bị "touched"
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Nút đăng ký chỉ mở khóa khi TẤT CẢ các ô đều trả về true
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.setAttribute("disabled", "true");
    }
  }

  // --- XỬ LÝ LẮNG NGHE SỰ KIỆN (EVENT LISTENERS) ---

  // Lắng nghe sự kiện người dùng gõ chữ (input)
  usernameInput.addEventListener("input", () => {
    touchedFields.username = true; // Đánh dấu đã tương tác
    checkFormValidity();
  });

  emailInput.addEventListener("input", () => {
    touchedFields.email = true;
    checkFormValidity();
  });

  passwordInput.addEventListener("input", () => {
    touchedFields.password = true;
    // Kiểm tra đồng thời ô xác nhận mật khẩu phòng trường hợp sửa mật khẩu chính sau khi nhập xong mật khẩu phụ
    if (confirmPasswordInput.value.length > 0) {
      touchedFields.confirmPassword = true;
    }
    checkFormValidity();
  });

  confirmPasswordInput.addEventListener("input", () => {
    touchedFields.confirmPassword = true;
    checkFormValidity();
  });

  // --- SỰ KIỆN SUBMIT FORM ---
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Chặn reload trang
    
    // Hiển thị thông báo thành công
    successMsg.textContent = "Đăng ký thành công!";
  });
});
