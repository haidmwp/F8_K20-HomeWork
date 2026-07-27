// Lỗi sai kiểu dữ liệu (Thay thế cho TypeError)
class InvalidTypeError extends Error {
    constructor(message, fieldName) {
        super(message);
        this.name = 'InvalidTypeError';
        this.fieldName = fieldName;
    }
}

// Lỗi giá trị vượt phạm vi (Thay thế cho RangeError)
class OutOfRangeError extends Error {
    constructor(message, fieldName) {
        super(message);
        this.name = 'OutOfRangeError';
        this.fieldName = fieldName;
    }
}

// Lỗi email không hợp lệ
class InvalidEmailError extends Error {
    constructor(message, fieldName) {
        super(message);
        this.name = 'InvalidEmailError';
        this.fieldName = fieldName;
    }
}

// Lỗi mật khẩu quá ngắn
class WeakPasswordError extends Error {
    constructor(message, fieldName) {
        super(message);
        this.name = 'WeakPasswordError';
        this.fieldName = fieldName;
    }
}

function registerUser(userObj) {
    // Trường hợp 1: Không truyền đối số hoặc đối số không phải object/null
    if (!userObj || typeof userObj !== 'object' || Array.isArray(userObj)) {
        throw new InvalidTypeError('Tham số truyền vào không phải là một Object hợp lệ.', 'userObj');
    }

    const { username, age, email, password } = userObj;

    // Trường hợp 2: Kiểm tra sai kiểu dữ liệu của username và age
    if (typeof username !== 'string') {
        throw new InvalidTypeError('Username phải là một chuỗi ký tự (string).', 'username');
    }
    if (typeof age !== 'number') {
        throw new InvalidTypeError('Tuổi phải là một số nguyên (number).', 'age');
    }

    // Trường hợp 3: Kiểm tra khoảng giới hạn của tuổi
    if (age < 13 || age > 120) {
        throw new OutOfRangeError('Tuổi phải nằm trong khoảng từ 13 đến 120.', 'age');
    }

    // Trường hợp 4: Kiểm tra định dạng email (phải có ký tự @)
    if (!email.includes('@')) {
        throw new InvalidEmailError('Email không hợp lệ (thiếu ký tự @).', 'email');
    }

    // Trường hợp 5: Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
        throw new WeakPasswordError('Mật khẩu quá ngắn (phải có ít nhất 8 ký tự).', 'password');
    }

    // 3. Trả về kết quả thành công nếu vượt qua tất cả các tầng validate
    return {
        success: true,
        message: "Đăng ký thành công"
    };
}

function runTest(inputData) {
    try {
        const result = registerUser(inputData);
        console.log("Kết quả trả về:", result);
    } catch (error) {
        // Phân biệt từng loại lỗi bằng toán tử instanceof theo yêu cầu
        if (error instanceof InvalidTypeError) {
            console.error(`[Lỗi sai kiểu dữ liệu] Trường bị lỗi: ${error.fieldName} | Chi tiết: ${error.message}`);
        } else if (error instanceof OutOfRangeError) {
            console.error(`[Lỗi vượt phạm vi] Trường bị lỗi: ${error.fieldName} | Chi tiết: ${error.message}`);
        } else if (error instanceof InvalidEmailError) {
            console.error(`[Lỗi email không hợp lệ] Trường bị lỗi: ${error.fieldName} | Chi tiết: ${error.message}`);
        } else if (error instanceof WeakPasswordError) {
            console.error(`[Lỗi mật khẩu quá ngắn] Trường bị lỗi: ${error.fieldName} | Chi tiết: ${error.message}`);
        } else {
            console.error(`[Lỗi hệ thống khác]: ${error.message}`);
        }
    } finally {
        // Khối lệnh này luôn luôn chạy bất kể thành công hay thất bại
        console.log("Quá trình xử lý đăng ký đã kết thúc.");
        console.log("--------------------------------------------------");
    }
}

console.log("--- TEST CASE 1: Không truyền tham số ---");
runTest(); 

console.log("--- TEST CASE 2: Username sai kiểu dữ liệu ---");
runTest({
    username: 123,
    age: 20,
    email: "a@b.com",
    password: "12345678"
});

console.log("--- TEST CASE 3: Tuổi nằm ngoài khoảng (nhỏ hơn 13) ---");
runTest({
    username: "an",
    age: 8,
    email: "a@b.com",
    password: "12345678"
});

console.log("--- TEST CASE 4: Email thiếu ký tự @ ---");
runTest({
    username: "an",
    age: 20,
    email: "abgmail.com",
    password: "12345678"
});

console.log("--- TEST CASE 5: Mật khẩu ngắn hơn 8 ký tự ---");
runTest({
    username: "an",
    age: 20,
    email: "a@b.com",
    password: "123"
});

console.log("--- TEST CASE 6: Mọi dữ liệu đều hợp lệ ---");
runTest({
    username: "an",
    age: 20,
    email: "a@b.com",
    password: "12345678"
});