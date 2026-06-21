// Hàm kiểm tra số nguyên tố
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Hàm kiểm tra chia hết cho cả 3 và 5
function isDivisibleBy15(num) {
    return num % 3 === 0 && num % 5 === 0;
}

// Hàm chính in tam giác số
function printTriangle(n) {
    for (let i = 1; i <= n; i++) {
        let rowOutput = []; // Lưu các phần tử của dòng hiện tại

        for (let j = 1; j <= i; j++) {
            if (isDivisibleBy15(j)) {
                rowOutput.push('#');
            } else if (isPrime(j)) {
                rowOutput.push('*');
            } else {
                rowOutput.push(j);
            }
        }

        // In các số của dòng hiện tại, cách nhau khoảng trắng
        console.log(rowOutput.join(' '));

        // Nếu dòng i là số chẵn, in thêm dòng phân cách
        if (i % 2 === 0) {
            console.log('-'.repeat(i));
        }
    }
}

// Test các trường hợp theo yêu cầu
console.log("--- Test 1: n = 2 ---");
printTriangle(2);
console.log("--- Test 1: n = 5 ---");
printTriangle(5);
console.log("\n--- Test 2: n = 7 ---");
printTriangle(7);
console.log("\n--- Test 3: n = 15 ---");
printTriangle(15);