// ==========================================
// 1. Tạo và "khóa cứng" Object Cấu Hình
// ==========================================
const config = {
  mucPhuPhi: 120000, // Một số tùy ý làm phụ phí (120k)
  phienBan: "2.1.0",  // Một chuỗi
  kichHoat: true     // Một boolean
};

// Sử dụng Object.freeze() để khóa cứng hoàn toàn
Object.freeze(config);

// --- Kiểm nghiệm Bước 1 ---
console.log("--- 1. Kiểm tra Khóa Cứng Cấu Hình ---");
config.mucPhuPhi = 0.5; // Thử ghi đè vô hiệu
console.log("mucPhuPhi sau khi cố sửa:", config.mucPhuPhi); // Output: 120000
console.log("Object.isFrozen(config):", Object.isFrozen(config)); // Output: true


// ==========================================
// 2. Định nghĩa Class Quản Lý Danh Sách
// ==========================================
class MyClass {
  constructor(name) {
    this.name = name;
    this.items = [];      // Danh sách rỗng chứa phần tử
    this._discount = 0;   // Thuộc tính private/internal lưu phần trăm giảm giá
  }

  // Method thêm phần tử
  addItem(name, price, quantity) {
    this.items.push({ name, price, quantity });
  }

  // Getter tính tổng giá trị danh sách
  get total() {
    // 1. Tính tổng tiền hàng cơ bản từ danh sách items
    const rawTotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 2. Áp dụng mức giảm giá (nếu có)
    const discountedTotal = rawTotal * (1 - this._discount / 100);
    
    // 3. Cộng thêm phụ phí lấy từ object config ở bước 1
    return discountedTotal + config.mucPhuPhi;
  }

  // Setter gán phần trăm giảm giá với validation từ 0 - 100
  set discountPercent(value) {
    if (value < 0 || value > 100) {
      throw new Error("Phần trăm giảm giá phải nằm trong khoảng từ 0 đến 100!");
    }
    this._discount = value;
  }
}

// --- Khởi tạo Instance và Chạy Test Case ---
console.log("\n--- 2. Kiểm tra Class & Phép Tính ---");
const instance = new MyClass("Danh sách của An");
instance.addItem("Bàn phím", 500000, 2); // 500k * 2 = 1M
instance.addItem("Chuột", 200000, 1);    // 200k * 1 = 200k
                                         // Tổng hàng = 1.2M + 120k phụ phí = 1.32M
console.log("Tổng ban đầu:", instance.total); // Output: 1320000

instance.discountPercent = 10; // Giảm 10% trên 1.2M còn 1.08M + 120k phụ phí = 1.2M
console.log("Tổng sau khi giảm 10%:", instance.total); // Output: 1200000 (Trùng logic test case của bạn)

try {
  instance.discountPercent = 150;
} catch (e) {
  console.log("Bắt lỗi validation:", e.message); 
  // Output: Phần trăm giảm giá phải nằm trong khoảng từ 0 đến 100!
}


// ==========================================
// 3. Hàm Độc Lập và Xử Lý Mất Context (This)
// ==========================================
function logSummary() {
  console.log(`${this.name}: ${this.total}`);
}

console.log("\n--- 3. Kiểm tra Context với setTimeout ---");
// Sử dụng .bind() để ràng buộc vĩnh viễn context của hàm vào instance
setTimeout(logSummary.bind(instance), 100);
// Output sau 100ms: "Danh sách của An: 1200000"


// ==========================================
// 4. Dùng Object.defineProperty để thêm ID ẩn
// ==========================================
Object.defineProperty(instance, 'id', {
  value: "AN-CODE-999",
  writable: false,     // Không thể ghi đè giá trị
  enumerable: false,   // Ẩn khi lặp for...in hoặc Object.keys()
  configurable: false  // Không thể cấu hình lại hoặc xóa đi
});

console.log("\n--- 4. Kiểm tra ID ẩn (Object.defineProperty) ---");
// Kiểm tra tính chất enumerable: false
console.log("Danh sách keys của instance:", Object.keys(instance)); 
// Output: [ 'name', 'items', '_discount' ] (Không chứa chữ "id")

// Kiểm tra tính chất writable: false
instance.id = "hack123";
console.log("Thử hack sửa ID:", instance.id); // Output: "AN-CODE-999" (Không bị thay đổi)

// Kiểm tra tính chất configurable: false
delete instance.id;
console.log("Thử xóa ID:", instance.id); // Output: "AN-CODE-999" (Không thể bị xóa)


// ==========================================
// 5. Gộp 2 Object Không Làm Thay Đổi Object Gốc
// ==========================================
const objA = { software: "VS Code", theme: "Light", version: 1 };
const objB = { theme: "Dark", level: "Senior" };

// Dùng cú pháp Spread Operator (...) để gộp sang object mới hoàn toàn
// Object nào viết sau cùng sẽ ghi đè thuộc tính trùng tên của object trước nó
const merged = { ...objA, ...objB };

console.log("\n--- 5. Kiểm tra Gộp Object Không Đột Biến ---");
console.log("Object đã gộp (merged):", merged);
// Output: { software: 'VS Code', theme: 'Dark', version: 1, level: 'Senior' } (theme lấy từ objB)

console.log("Object gốc objA ban đầu:", objA);
// Output: { software: 'VS Code', theme: 'Light', version: 1 } (Giữ nguyên y như cũ)
