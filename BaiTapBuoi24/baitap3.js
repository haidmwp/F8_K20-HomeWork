class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    // Trả về lương hàng tháng (mặc định là lương cơ bản)
    getMonthlySalary() {
        return this.baseSalary;
    }

    // Định dạng chuỗi mô tả nhân viên thông thường
    describe() {
        return `${this.name} - Lương: ${this.getMonthlySalary()}đ`;
    }
}

class Manager extends Employee {
    constructor(name, baseSalary, teamSize) {
        // Tái sử dụng hàm khởi tạo của Employee
        super(name, baseSalary);
        this.teamSize = teamSize;
    }

    // Ghi đè phương thức tính lương của Quản lý
    getMonthlySalary() {
        const base = super.getMonthlySalary();
        const allowance = this.teamSize * 500000;
        return base + allowance;
    }

    // Ghi đè phương thức mô tả, ghép nối chuỗi dựa trên phương thức của lớp cha
    describe() {
        const originalDescription = super.describe();
        return `[Quản lý] ${originalDescription} (đội ${this.teamSize} người)`;
    }
}

// Khởi tạo một nhân viên thông thường
const emp = new Employee("An", 10000000);
console.log(emp.getMonthlySalary()); // Kết quả: 10000000
console.log(emp.describe());         // Kết quả: "An - Lương: 10000000đ"

// Khởi tạo một quản lý
const manager = new Manager("Bình", 15000000, 5);
console.log(manager.getMonthlySalary()); 
// Kết quả: 17500000 (15000000 + 5 * 500000)

console.log(manager.describe());
// Kết quả: "[Quản lý] Bình - Lương: 17500000đ (đội 5 người)"

// Kiểm tra kiểu dữ liệu đối tượng (instanceof)
console.log(manager instanceof Employee); // Kết quả: true
console.log(manager instanceof Manager);  // Kết quả: true
console.log(emp instanceof Manager);      // Kết quả: false
