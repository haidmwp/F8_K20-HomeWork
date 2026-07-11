const customers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  { id: 4, name: "Bob Brown", email: "bob@example.com" },
  { id: 5, name: "Charlie Green", email: "charlie@example.com" },
];

const products = [
  { id: 101, name: "Laptop", price: 1200 },
  { id: 102, name: "Phone", price: 800 },
  { id: 103, name: "Tablet", price: 500 },
  { id: 104, name: "Smartwatch", price: 300 },
  { id: 105, name: "Headphones", price: 150 },
];

const orders = [
  {
    id: 1001,
    customerId: 1,
    items: [
      { productId: 101, quantity: 2 },
      { productId: 102, quantity: 1 },
    ],
  },
  {
    id: 1002,
    customerId: 2,
    items: [
      { productId: 102, quantity: 1 },
      { productId: 103, quantity: 3 },
    ],
  },
  {
    id: 1003,
    customerId: 3,
    items: [
      { productId: 104, quantity: 5 },
      { productId: 105, quantity: 2 },
    ],
  },
  {
    id: 1004,
    customerId: 4,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 103, quantity: 2 },
    ],
  },
  {
    id: 1005,
    customerId: 5,
    items: [{ productId: 105, quantity: 10 }],
  },
  {
    id: 1006,
    customerId: 1,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 105, quantity: 3 },
    ],
  },
  {
    id: 1007,
    customerId: 2,
    items: [
      { productId: 104, quantity: 2 },
      { productId: 103, quantity: 1 },
    ],
  },
  {
    id: 1008,
    customerId: 3,
    items: [{ productId: 102, quantity: 2 }],
  },
  {
    id: 1009,
    customerId: 4,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 102, quantity: 1 },
    ],
  },
  {
    id: 1010,
    customerId: 5,
    items: [
      { productId: 103, quantity: 4 },
      { productId: 104, quantity: 3 },
    ],
  },
];

function getCustomerStatistics(customers, products, orders) {
  // 1. Tạo bản đồ tra cứu sản phẩm nhanh bằng Map O(1)
  const productMap = new Map(products.map(p => [p.id, p]));

  // 2. Xử lý và tính toán số liệu thống kê
  const statistics = customers.map(customer => {
    const customerProductsMap = new Map();
    let customerTotalSpent = 0;

    // Lọc các đơn hàng của khách hàng hiện tại
    const customerOrders = orders.filter(order => order.customerId === customer.id);

    // Duyệt qua từng sản phẩm trong các đơn hàng
    customerOrders.forEach(order => {
      order.items.forEach(item => {
        const productInfo = productMap.get(item.productId);
        if (!productInfo) return;

        const itemCost = productInfo.price * item.quantity;
        customerTotalSpent += itemCost;

        // Gộp sản phẩm nếu đã tồn tại
        if (customerProductsMap.has(productInfo.name)) {
          const existing = customerProductsMap.get(productInfo.name);
          existing.quantity += item.quantity;
          existing.totalSpent += itemCost;
        } else {
          customerProductsMap.set(productInfo.name, {
            name: productInfo.name,
            quantity: item.quantity,
            totalSpent: itemCost
          });
        }
      });
    });

    // Chuyển Map thành mảng và sắp xếp sản phẩm theo totalSpent giảm dần
    const sortedProducts = Array.from(customerProductsMap.values())
      .sort((a, b) => b.totalSpent - a.totalSpent);

    return {
      id: customer.id,
      name: customer.name,
      totalSpent: customerTotalSpent,
      products: sortedProducts
    };
  });

  // 3. Sắp xếp danh sách khách hàng theo totalSpent giảm dần
  return statistics.sort((a, b) => b.totalSpent - a.totalSpent);
}

// Chạy thử hàm với dữ liệu của bạn
const result = getCustomerStatistics(customers, products, orders);
console.log(JSON.stringify(result, null, 2));