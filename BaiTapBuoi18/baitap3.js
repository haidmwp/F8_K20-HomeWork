// Dữ liệu đầu vào
const orders = [
  { id: 1, customer: "An",   product: "Áo thun",     category: "fashion",     amount: 300000, status: "completed" },
  { id: 2, customer: "Bình", product: "iPhone 15",    category: "electronics", amount: 25000000, status: "completed" },
  { id: 3, customer: "An",   product: "Quần jean",    category: "fashion",     amount: 450000, status: "canceled" },
  { id: 4, customer: "Chi",  product: "Tai nghe",     category: "electronics", amount: 1200000, status: "completed" },
  { id: 5, customer: "Bình", product: "Giày",         category: "fashion",     amount: 900000, status: "pending" },
  { id: 6, customer: "An",   product: "Sạc dự phòng", category: "electronics", amount: 350000, status: "completed" },
  { id: 7, customer: "Duy",  product: "Áo khoác",     category: "fashion",     amount: 600000, status: "completed" },
];

// Hàm 1: Tổng doanh thu theo từng danh mục (chỉ tính đơn "completed")
const getRevenueByCategory = (orders) => {
  return orders.reduce((acc, order) => {
    if (order.status !== "completed") return acc;
    
    // Nếu danh mục chưa tồn tại thì khởi tạo bằng 0, sau đó cộng dồn amount
    acc[order.category] = (acc[order.category] || 0) + order.amount;
    return acc;
  }, {});
};

// Hàm 2: Tổng chi tiêu của mỗi khách hàng (chỉ tính đơn "completed")
const getSpendingByCustomer = (orders) => {
  return orders.reduce((acc, order) => {
    if (order.status !== "completed") return acc;
    
    acc[order.customer] = (acc[order.customer] || 0) + order.amount;
    return acc;
  }, {});
};

// Hàm 3: Đếm số lượng đơn hàng theo từng trạng thái (tất cả các đơn)
const getOrderCountByStatus = (orders) => {
  return orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
};

// Hàm 4: Tìm khách hàng chi tiêu nhiều nhất (vừa cộng dồn vừa theo dõi leader)
const getTopCustomer = (orders) => {
  const initialState = {
    spending: {}, // Dùng object tạm bên trong accumulator để lưu chi tiêu từng người
    top: { customer: "", total: 0 }
  };

  const result = orders.reduce((acc, order) => {
    if (order.status !== "completed") return acc;

    // 1. Cộng dồn chi tiêu của khách hàng hiện tại
    acc.spending[order.customer] = (acc.spending[order.customer] || 0) + order.amount;

    // 2. So sánh với kỷ lục hiện tại để cập nhật người dẫn đầu
    if (acc.spending[order.customer] > acc.top.total) {
      acc.top.customer = order.customer;
      acc.top.total = acc.spending[order.customer];
    }

    return acc;
  }, initialState);

  return result.top; // Chỉ lấy phần thông tin top ra ngoài
};

// Hàm 5: Báo cáo tổng hợp tất cả số liệu trong đúng 1 lượt duyệt duy nhất
const getFullReport = (orders) => {
  const initialValue = {
    revenueByCategory: {},
    spendingByCustomer: {},
    statusCount: {},
    totalRevenue: 0,
  };

  return orders.reduce((acc, order) => {
    // Luôn luôn đếm trạng thái đơn hàng bất kể là trạng thái gì
    acc.statusCount[order.status] = (acc.statusCount[order.status] || 0) + 1;

    // Các phần tính toán doanh thu/chi tiêu chỉ áp dụng cho đơn "completed"
    if (order.status === "completed") {
      acc.revenueByCategory[order.category] = (acc.revenueByCategory[order.category] || 0) + order.amount;
      acc.spendingByCustomer[order.customer] = (acc.spendingByCustomer[order.customer] || 0) + order.amount;
      acc.totalRevenue += order.amount;
    }

    return acc;
  }, initialValue);
};

console.log("Hàm 1:", getRevenueByCategory(orders));
// Hàm 1

console.log("Hàm 2:", getSpendingByCustomer(orders));
// Hàm 2

console.log("Hàm 3:", getOrderCountByStatus(orders));
// Hàm 3

console.log("Hàm 4:", getTopCustomer(orders));
// Hàm 4

console.log("Hàm 5:", JSON.stringify(getFullReport(orders), null, 2));
// Hàm 5