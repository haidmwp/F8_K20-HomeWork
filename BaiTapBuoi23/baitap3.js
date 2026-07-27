function createOrderSystem() {
    // 1. Function Scope: Giỏ hàng được ẩn hoàn toàn bên trong hàm, bên ngoài không thể truy cập trực tiếp.
    let cart = [];

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(name, price, qty) {
        cart.push({ name, price, qty });
        return cart.length; // Trả về số lượng loại sản phẩm hiện có trong giỏ
    }

    // Kiểm tra số lượng loại sản phẩm hiện có trong giỏ
    function getCartSize() {
        return cart.length;
    }

    // Thanh toán đơn hàng
    function checkout(distance) {
        // Tính tổng tiền hàng (chưa bao gồm ship)
        const subtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
        
        let shippingFee = 0;

        // 2. Block Scope: Mỗi mức phí ship được tính trong một khối block riêng biệt với từ khóa 'const'
        if (distance <= 5) {
            const fee = 15000;
            shippingFee = fee;
        } else if (distance <= 20) {
            const fee = 30000;
            shippingFee = fee;
        } else {
            const fee = 50000;
            shippingFee = fee;
        }

        // Ưu đãi: Nếu tổng tiền hàng từ 500.000đ trở lên thì miễn phí ship hoàn toàn
        if (subtotal >= 500000) {
            shippingFee = 0;
        }

        const finalTotal = subtotal + shippingFee;

        // Tự động làm trống giỏ hàng sau khi thanh toán thành công
        cart = [];

        // Trả về kết quả hóa đơn
        return {
            subtotal: subtotal,
            shippingFee: shippingFee,
            finalTotal: finalTotal
        };
    }

    // Trả về các phương thức điều hướng để tương tác gián tiếp với giỏ hàng
    return {
        addToCart,
        getCartSize,
        checkout
    };
}

// Khởi tạo hệ thống đầu tiên
const store = createOrderSystem();
console.log(store.addToCart("Mũ lưỡi trai", 120000, 1)); // 1
console.log(store.getCartSize());                         // 1

console.log(store.checkout(15)); 
// Kết quả: { subtotal: 120000, shippingFee: 30000, finalTotal: 150000 }

console.log(store.getCartSize());                         // 0 (Giỏ hàng đã tự động reset)

// --- Một hệ thống khác, hoàn toàn độc lập ---
const store2 = createOrderSystem();
console.log(store2.addToCart("Tất", 30000, 2));           // 1
console.log(store2.checkout(3));
// Kết quả: { subtotal: 60000, shippingFee: 15000, finalTotal: 75000 }

// --- Đơn hàng lớn, được miễn phí ship dù khoảng cách xa ---
const store3 = createOrderSystem();
console.log(store3.addToCart("Áo khoác", 600000, 1));     // 1
console.log(store3.checkout(30));
// Kết quả: { subtotal: 600000, shippingFee: 0, finalTotal: 600000 }

// Kiểm tra tính độc lập: Xác nhận lại tất cả các store đều đã trống và không đè dữ liệu lên nhau
console.log(store.getCartSize());   // 0
console.log(store2.getCartSize());  // 0
console.log(store3.getCartSize());  // 0