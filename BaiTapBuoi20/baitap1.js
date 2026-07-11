const baseProto = {
  introduce() {
    return `Tôi là ${this.name}, ${this.age} tuổi`;
  }
};

// ==========================================
// 2. Tạo object trung gian bằng Object.create()
// ==========================================
const employeeProto = Object.create(baseProto);
employeeProto.getInfo = function() {
  return `${this.name} làm ở phòng ${this.department}, lương ${this.salary}`;
};

// ==========================================
// 3. Tạo ít nhất 5 object cụ thể kế thừa từ employeeProto
// ==========================================
const item1 = Object.create(employeeProto);
Object.assign(item1, { name: "Nguyễn Văn A", age: 28, department: "IT", salary: 15000000 });

const item2 = Object.create(employeeProto);
Object.assign(item2, { name: "Trần Thị B", age: 24, department: "HR", salary: 12000000 });

const item3 = Object.create(employeeProto);
Object.assign(item3, { name: "Lê Văn C", age: 32, department: "IT", salary: 25000000 });

const item4 = Object.create(employeeProto);
Object.assign(item4, { name: "Phạm Minh D", age: 29, department: "Marketing", salary: 18000000 });

const item5 = Object.create(employeeProto);
Object.assign(item5, { name: "Hoàng Thị E", age: 26, department: "HR", salary: 13000000 });

// Test case theo yêu cầu của bạn
console.log("--- Test Case Cơ Bản ---");
console.log(item1.introduce()); // Output: "Tôi là Nguyễn Văn A, 28 tuổi"
console.log(item1.getInfo());   // Output: "Nguyễn Văn A làm ở phòng IT, lương 15000000"


// ==========================================
// 4. Hàm kiểm tra thuộc tính riêng (Hiện đại)
// ==========================================
function checkOwnProperty(obj, prop) {
  // Sử dụng Object.hasOwn() thay vì obj.hasOwnProperty()
  return Object.hasOwn(obj, prop); 
}

console.log("\n--- Kiểm tra thuộc tính riêng ---");
console.log("name có phải thuộc tính riêng của item1?", checkOwnProperty(item1, 'name')); // true
console.log("introduce có phải thuộc tính riêng của item1?", checkOwnProperty(item1, 'introduce')); // false (kế thừa)


// ==========================================
// 5. Chứng minh chuỗi prototype và thay đổi động
// ==========================================
console.log("\n--- Kiểm tra chuỗi Prototype ---");
const protoOfItem1 = Object.getPrototypeOf(item1);
const protoOfProto = Object.getPrototypeOf(protoOfItem1);

console.log("Prototype của item1 là employeeProto?", protoOfItem1 === employeeProto); // true
console.log("Prototype của employeeProto là baseProto?", protoOfProto === baseProto); // true

// Tạo prototype mới và thay đổi động bằng Object.setPrototypeOf()
const newFreelancerProto = {
  getInfo() {
    return `${this.name} là Freelancer tự do, thu nhập ${this.salary}`;
  }
};

Object.setPrototypeOf(item1, newFreelancerProto);
console.log("Sau khi đổi prototype cho item1:");
console.log(item1.getInfo()); // Output: "Nguyễn Văn A là Freelancer tự do, thu nhập 15000000"


// ==========================================
// 6. In ra tên toàn bộ các thuộc tính riêng
// ==========================================
console.log("\n--- Danh sách thuộc tính riêng của item2 ---");
const ownKeys = Object.keys(item2);
console.log(ownKeys); // [ 'name', 'age', 'department', 'salary' ]


// ==========================================
// 7. Lấy descriptor đầy đủ của một thuộc tính
// ==========================================
console.log("\n--- Property Descriptor của 'salary' trên item2 ---");
const descriptor = Object.getOwnPropertyDescriptor(item2, 'salary');
console.log(descriptor); 
// Output: { value: 12000000, writable: true, enumerable: true, configurable: true }


// ==========================================
// 8. Niêm phong (Seal) object
// ==========================================
console.log("\n--- Thử nghiệm Niêm phong (Object.seal) trên item3 ---");
Object.seal(item3);

// Thử sửa giá trị cũ (Hợp lệ)
item3.salary = 30000000;
console.log("Lương sau khi sửa:", item3.salary); // 30000000

// Thử thêm thuộc tính mới (Bị chặn / Không có tác dụng)
item3.bonus = 5000000; 
console.log("Thuộc tính bonus sau khi cố thêm:", item3.bonus); // undefined

// Thử xóa thuộc tính cũ (Bị chặn / Trả về false)
delete item3.department;
console.log("Phòng ban sau khi cố xóa:", item3.department); // IT


// ==========================================
// 9. Nhóm các object theo phòng ban bằng Object.groupBy()
// ==========================================
console.log("\n--- Nhóm nhân viên theo phòng ban ---");
const employees = [item2, item3, item4, item5]; // item1 đã đổi prototype ở bước 5 nên bỏ ra cho đồng nhất

const groupedByDept = Object.groupBy(employees, (emp) => emp.department);
console.log(groupedByDept);
/*
Output:
{
  HR: [ item2, item5 ],
  IT: [ item3 ],
  Marketing: [ item4 ]
}
*/


// ==========================================
// 10. Biến mảng [mã, tên] thành object bằng Object.fromEntries()
// ==========================================
console.log("\n--- Tạo object tra cứu từ mảng cặp giá trị ---");
const codeNamePairs = [
  ["NV01", "Nguyễn Văn A"],
  ["NV02", "Trần Thị B"],
  ["NV03", "Lê Văn C"]
];

const lookupDict = Object.fromEntries(codeNamePairs);
console.log(lookupDict); // { NV01: 'Nguyễn Văn A', NV02: 'Trần Thị B', NV03: 'Lê Văn C' }
console.log("Tra cứu mã NV02:", lookupDict["NV02"]); // Trần Thị B