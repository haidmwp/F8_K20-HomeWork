// Hàm 1: Viết dưới dạng function expression, trả về object chứa các arrow function
const createCalculator = function() {
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b === 0 ? "Lỗi: chia cho 0" : a / b
  };
};

// Hàm 2: Sử dụng rest parameter tính trung bình cộng số lượng tham số bất kỳ
const average = (...numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
};

// Hàm 3: Sử dụng default parameter và kiểm tra giá trị hợp lệ
const applyDiscount = (price, discountPercent = 10) => {
  if (typeof price !== 'number' || !Number.isFinite(price)) {
    return "Giá không hợp lệ";
  }
  const finalPrice = price * (1 - discountPercent / 100);
  return Math.floor(finalPrice);
};

// Hàm 4: Kết hợp các phép tính và kiểm tra kết quả NaN
const safeCalculate = (operation, ...numbers) => {
  const calc = createCalculator();
  let result;

  // Kiểm tra số lượng tham số đầu vào cho phép tính
  if (numbers.length === 0 && operation !== "average") {
    return "Kết quả không hợp lệ";
  }

  // Điều hướng phép tính dựa trên operation
  switch (operation) {
    case "add":
      result = numbers.reduce((sum, num) => calc.add(sum, num));
      break;
    case "subtract":
      result = numbers.reduce((diff, num) => calc.subtract(diff, num));
      break;
    case "multiply":
      result = numbers.reduce((prod, num) => calc.multiply(prod, num));
      break;
    case "average":
      result = average(...numbers);
      break;
    default:
      return "Phép tính không được hỗ trợ";
  }

  // Kiểm tra nếu kết quả là NaN (ví dụ khi truyền chuỗi "abc")
  return Number.isNaN(result) ? "Kết quả không hợp lệ" : result;
};

// Test Hàm 1
const calculator = createCalculator();
console.log(calculator.add(2, 3));       // 5
console.log(calculator.subtract(10, 4)); // 6
console.log(calculator.multiply(3, 5));  // 15
console.log(calculator.divide(10, 2));   // 5
console.log(calculator.divide(10, 0));   // "Lỗi: chia cho 0"

// Test Hàm 2
console.log(average(10, 20, 30));   // 20
console.log(average(5));             // 5
console.log(average());              // 0
console.log(average(1, 2, 3, 4, 5)); // 3

// Test Hàm 3
console.log(applyDiscount(100000));          // 90000
console.log(applyDiscount(100000, 20));      // 80000
console.log(applyDiscount(100000, 0));       // 100000
console.log(applyDiscount("abc", 10));       // "Giá không hợp lệ"
console.log(applyDiscount(NaN, 10));         // "Giá không hợp lệ"

// Test Hàm 4
console.log(safeCalculate("add", 1, 2, 3));          // 6
console.log(safeCalculate("multiply", 2, 3, 4));     // 24
console.log(safeCalculate("average", 10, 20));       // 15
console.log(safeCalculate("divide", 10, 2));         // "Phép tính không được hỗ trợ"
console.log(safeCalculate("add", 1, "abc", 3));      // "Kết quả không hợp lệ"