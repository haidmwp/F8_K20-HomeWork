function Order(orderId, customerName, items, status) {
  // Gán các thuộc tính
  this.orderId = orderId;
  this.customerName = customerName;
  this.items = items || [];
  this.status = status || "pending";

  // Method 1: Tính tổng tiền đơn hàng
  this.getTotalAmount = function () {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Method 2: Tổng số lượng sản phẩm trong đơn
  this.getItemCount = function () {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Method 3: Cập nhật status
  this.updateStatus = function (newStatus) {
    this.status = newStatus;
    return `Đơn hàng ${this.orderId} đã chuyển sang: ${this.status}`;
  };

  // Method 4: Thêm sản phẩm vào items
  this.addItem = function (item) {
    this.items.push(item);
    return this.getTotalAmount();
  };

  // Method 5: Trả về object tóm tắt đơn hàng
  this.getSummary = function () {
    return {
      orderId: this.orderId,
      customerName: this.customerName,
      totalAmount: this.getTotalAmount(),
      itemCount: this.getItemCount(),
      status: this.status
    };
  };
}

// Khởi tạo các đơn hàng
const order1 = new Order("ORD01", "Nguyễn An", [
  { name: "Áo thun", price: 150000, quantity: 2 },
  { name: "Quần jean", price: 350000, quantity: 1 },
]);

const order2 = new Order("ORD02", "Trần Bình", [
  { name: "iPhone 15", price: 25000000, quantity: 1 },
]);

// Chạy các Test Cases
console.log(order1.getTotalAmount());   // Kết quả: 650000
console.log(order1.getItemCount());     // Kết quả: 3
console.log(order1.getSummary());
/* Kết quả:
{
  orderId: 'ORD01',
  customerName: 'Nguyễn An',
  totalAmount: 650000,
  itemCount: 3,
  status: 'pending'
}
*/

console.log(order1.updateStatus("completed"));
// Kết quả: "Đơn hàng ORD01 đã chuyển sang: completed"

console.log(order1.addItem({ name: "Mũ", price: 120000, quantity: 2 }));
// Kết quả: 890000

console.log(order2.getTotalAmount());   // Kết quả: 25000000
console.log(order2.status);             // Kết quả: "pending"

// Kiểm tra instanceof
console.log(order1 instanceof Order);  // Kết quả: true
console.log(order2 instanceof Order);  // Kết quả: true