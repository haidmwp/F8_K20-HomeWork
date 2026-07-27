function addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    
    return date.toISOString().split("T")[0];
}

function getDaysBetween(date1String, date2String) {
    const d1 = new Date(date1String);
    const d2 = new Date(date2String);
    
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function isExpired(expiryDateString, currentDateString) {
    return currentDateString > expiryDateString;
}

function getCountdown(targetDateString, currentDateString) {
    const target = new Date(targetDateString);
    const current = new Date(currentDateString);
    
    const diffMs = target.getTime() - current.getTime();
    
    if (diffMs <= 0) {
        return "Đã qua hạn";
    }
    
    const msInHour = 1000 * 60 * 60;
    const msInDay = msInHour * 24;
    
    const days = Math.floor(diffMs / msInDay);
    const hours = Math.floor((diffMs % msInDay) / msInHour);
    
    return `Còn ${days} ngày ${hours} giờ`;
}

// Test Cases - Hàm 1
console.log(addDays("2026-07-19", 10));                  // Kết quả: "2026-07-29"
console.log(addDays("2026-07-25", 10));                  // Kết quả: "2026-08-04"
console.log(addDays("2026-01-01", -5));                  // Kết quả: "2025-12-27"

// Test Cases - Hàm 2
console.log(getDaysBetween("2026-07-19", "2026-08-01")); // Kết quả: 13
console.log(getDaysBetween("2026-01-01", "2026-12-31")); // Kết quả: 364

// Test Cases - Hàm 3
console.log(isExpired("2026-07-01", "2026-07-19"));      // Kết quả: true
console.log(isExpired("2026-12-31", "2026-07-19"));      // Kết quả: false

// Test Cases - Hàm 4
console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00")); // Kết quả: "Còn 12 ngày 12 giờ"
console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00")); // Kết quả: "Đã qua hạn"