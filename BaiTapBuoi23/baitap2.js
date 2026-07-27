class BankAccount {
    // Thuộc tính static lưu tổng số dư ban đầu của toàn bộ tài khoản
    static totalMoney = 0;
    
    // Thuộc tính private bảo mật số dư khỏi các truy cập trực tiếp từ bên ngoài
    #balance;

    constructor(ownerName, balance) {
        if (typeof balance !== 'number' || balance < 0) {
            throw new Error('Số dư ban đầu phải là một số và không được nhỏ hơn 0.');
        }
        
        this.ownerName = ownerName;
        this.#balance = balance;
        
        // Cộng dồn số dư ban đầu vào thuộc tính static của Class cha
        BankAccount.totalMoney += balance;
    }

    // Getter để xem số dư hiện tại từ bên ngoài
    get balance() {
        return this.#balance;
    }

    // Phương thức nạp tiền vào tài khoản
    deposit(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Số tiền nạp phải là một số và lớn hơn 0.');
        }
        this.#balance += amount;
    }

    // Phương thức rút tiền khỏi tài khoản
    withdraw(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Số tiền rút phải là một số và lớn hơn 0.');
        }
        if (amount > this.#balance) {
            throw new Error('Tài khoản không đủ số dư để thực hiện giao dịch.');
        }
        this.#balance -= amount;
    }

    // Định dạng chuỗi hiển thị thông tin tài khoản
    toString() {
        return `Chủ tài khoản: ${this.ownerName}\nSố dư: ${this.#balance}`;
    }
}

class SavingsAccount extends BankAccount {
    constructor(ownerName, balance, interestRate) {
        // Gọi hàm khởi tạo của Class cha (BankAccount)
        super(ownerName, balance);
        this.interestRate = interestRate;
    }

    // Tính toán và cộng tiền lãi vào tài khoản
    addInterest() {
        // Lấy số dư hiện tại thông qua getter công khai của Class cha
        const interest = this.balance * this.interestRate;
        this.deposit(interest);
    }

    // Ghi đè (Override) phương thức rút tiền của Class cha
    withdraw(amount) {
        // Quy định riêng: Không cho rút vượt quá 50% số dư hiện tại
        const maxWithdrawable = this.balance * 0.5;
        if (amount > maxWithdrawable) {
            throw new Error('Tài khoản tiết kiệm không cho phép rút quá 50% số dư hiện tại trong một lần.');
        }
        
        // Nếu hợp lệ, gọi phương thức rút tiền gốc của lớp cha để kiểm tra nốt các điều kiện còn lại
        super.withdraw(amount);
    }
}

// Hàm tiện ích bọc khối try...catch phục vụ kiểm thử tường minh
function runCase(caseName, callback) {
    console.log(`--- ${caseName} ---`);
    try {
        callback();
    } catch (error) {
        console.error(`🔴 Phát hiện lỗi: ${error.message}`);
    }
    console.log("\n");
}

// Chạy Test case 1
runCase("Test case 1: Khởi tạo tài khoản thường với số dư âm", () => {
    new BankAccount("An", -100);
});

// Chạy Test case 2
runCase("Test case 2: Nạp tiền bằng chuỗi ký tự thay vì số", () => {
    const account = new BankAccount("An", 500000);
    account.deposit("100");
    console.log(account.toString());
});

// Chạy Test case 3
runCase("Test case 3: Rút tiền vượt quá số dư hiện có", () => {
    const account = new BankAccount("An", 500000);
    account.withdraw(700000);
});

// Chạy Test case 4
runCase("Test case 4: Cộng tiền lãi vào tài khoản tiết kiệm", () => {
    const account = new SavingsAccount("Bình", 1000000, 0.05);
    account.addInterest();
    console.log(`Số dư mới: ${account.balance}`); // Kỳ vọng: 1050000
});

// Chạy Test case 5
runCase("Test case 5: Rút quá 50% số dư của tài khoản tiết kiệm", () => {
    const account = new SavingsAccount("Bình", 1000000, 0.05);
    account.withdraw(600000); // Đòi rút hẳn 60% số dư
});

// Chạy Test case 6
runCase("Test case 6: Rút khoản tiền hợp lệ (dưới 50% số dư)", () => {
    const account = new SavingsAccount("Bình", 1000000, 0.05);
    account.withdraw(400000); // Rút 40% số dư -> Hợp lệ
    console.log(`Số dư còn lại: ${account.balance}`); // Kỳ vọng: 600000
});

// Chạy Test case 7
runCase("Test case 7: Kiểm tra tổng số dư ban đầu của tất cả các tài khoản", () => {
    // Reset hoặc tính toán dựa trên các tài khoản hợp lệ đã tạo phía trên:
    // Từ đầu bài đến giờ ta đã khởi tạo thành công: 
    // - Lượt test 2: +500.000
    // - Lượt test 3: +500.000
    // - Lượt test 4: +1.000.000
    // - Lượt test 5: +1.000.000
    // - Lượt test 6: +1.000.000
    // Tổng cộng kỳ vọng: 4.000.000
    console.log(`Tổng tài sản ban đầu của hệ thống ngân hàng: ${BankAccount.totalMoney}`);
});
