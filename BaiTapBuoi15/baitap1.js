function classifyTriangle(a, b, c) {
    // 1. Kiểm tra cạnh không hợp lệ
    if (a <= 0 || b <= 0 || c <= 0) {
        return "Cạnh không hợp lệ";
    }

    // Sắp xếp các cạnh để dễ dàng áp dụng bất đẳng thức và Pythagoras
    const [x, y, z] = [a, b, c].sort((x, y) => x - y);

    // 2. Kiểm tra bất đẳng thức tam giác
    if (x + y <= z) {
        return "Không tạo thành tam giác";
    }

    // 3. Kiểm tra tam giác đều
    if (a === b && b === c) {
        return "Tam giác đều";
    }

    // 4. Kiểm tra tam giác cân
    if (a === b || b === c || a === c) {
        return "Tam giác cân";
    }

    // 5. Kiểm tra tam giác vuông
    if (x * x + y * y === z * z) {
        return "Tam giác vuông";
    }

    // 6. Trường hợp còn lại
    return "Tam giác thường";
}

// Kiểm tra các ví dụ
console.log(classifyTriangle(3, 4, 5)); // "Tam giác vuông"
console.log(classifyTriangle(2, 2, 2)); // "Tam giác đều"
console.log(classifyTriangle(1, 2, 10)); // "Không tạo thành tam giác"