// Hàm 1: Chuyển tên sản phẩm thành slug URL
function createSlug(text) {
    return text
        .toLowerCase() // Bước 1: Chuyển toàn bộ về chữ thường
        .replace(/\s+/g, '-') // Bước 2: Thay khoảng trắng bằng dấu -
        .replace(/[^a-z0-9-]/g, '') // Bước 3: Xóa ký tự đặc biệt (chỉ giữ chữ, số, dấu -)
        .replace(/-+/g, '-') // Gộp nhiều dấu - liên tiếp thành 1 dấu
        .replace(/^-+|-+$/g, ''); // Xóa dấu - dư thừa ở đầu và cuối chuỗi
}

// Hàm 2: Tạo mã đơn hàng
function generateOrderId(productName, quantity) {
    const prefix = productName.substring(0, 3).toUpperCase();
    const length = productName.length;
    return `ord-${prefix}-${quantity}-${length}`;
}

// Hàm 3: Định dạng giá tiền
function formatPrice(price, currency = "vnd") {
    if (currency.toLowerCase() === "usd") {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    }
    // Mặc định cho VND
    const formatted = new Intl.NumberFormat('vi-VN').format(price);
    return `${formatted} ₫`;
}

// Hàm 4: Tạo URL đầy đủ cho trang sản phẩm
function buildProductUrl(baseUrl, product) {
    const slug = createSlug(product.name);
    return `${baseUrl}/${product.category}/${slug}?id=${product.id}`;
}

// Test Hàm 1
console.log(createSlug("macbook pro 2024"));     // "macbook-pro-2024"
console.log(createSlug("iphone 15 pro max!!!")); // "iphone-15-pro-max"
console.log(createSlug("Bàn Phím Cơ RGB"));        // "hello-world"

// Test Hàm 2
console.log(generateOrderId("macbook pro", 2));  // "ord-MAC-2-11"
console.log(generateOrderId("iphone 15", 5));    // "ord-IPH-5-9"

// Test Hàm 3
console.log(formatPrice(2000000, "vnd"));        // "2.000.000 ₫"
console.log(formatPrice(1500, "usd"));           // "$1,500.00"
console.log(formatPrice(300000));                // "300.000 ₫"

// Test Hàm 4
const product1 = { name: "macbook pro 2024", id: 101, category: "laptop" };
console.log(buildProductUrl("https://shop.vn", product1)); 
// "https://shop.vn/laptop/macbook-pro-2024?id=101"

const product2 = { name: "iphone 15", id: 102, category: "phone" };
console.log(buildProductUrl("https://shop.vn", product2)); 
// "https://shop.vn"