const products = [
  { id: 1, name: "macbook pro", price: 2000, category: "laptop" },
  { id: 2, name: "iphone 15", price: 1000, category: "phone" },
  { id: 3, name: "bàn phím cơ", price: 150, category: "accessories" },
  { id: 4, name: "màn hình dell", price: 500, category: "monitor" },
];

const orders = [
  { orderid: "ord01", productid: 2, quantity: 2, status: "completed" },
  { orderid: "ord02", productid: 1, quantity: 1, status: "pending" },
  { orderid: "ord03", productid: 4, quantity: 3, status: "completed" },
  { orderid: "ord04", productid: 3, quantity: 1, status: "canceled" },
  { orderid: "ord05", productid: 2, quantity: 1, status: "completed" },
];

const completedOrderDetails = orders
  .filter(order => order.status === "completed") // 1. Lọc đơn hàng "completed"
  .map(order => {
    // 2. Tìm sản phẩm tương ứng trong mảng products dựa vào productid
    const product = products.find(p => p.id === order.productid);
    
    // 3. Trả về object mới theo đúng cấu trúc yêu cầu
    return {
      iddonhang: order.orderid,
      tensanpham: product ? product.name : "Không xác định",
      tongtien: product ? product.price * order.quantity : 0
    };
  });

// --- CHẠY KIỂM TRA ĐẦU RA (TEST CASES) ---
console.log("Độ dài mảng:", completedOrderDetails.length); // 3

console.log("Toàn bộ kết quả:", completedOrderDetails);

// Kiểm tra chi tiết đơn hàng đầu tiên
console.log(completedOrderDetails[0].iddonhang);   // "ord01"
console.log(completedOrderDetails[0].tensanpham);  // "iphone 15"
console.log(completedOrderDetails[0].tongtien);   // 2000

// Kiểm tra đơn bị loại (status: "pending")
console.log(completedOrderDetails.find(o => o.iddonhang === "ord02")); // undefined
