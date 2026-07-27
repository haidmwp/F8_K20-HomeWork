function formatBirthday(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

function getAge(birthDateString, currentDateString) {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date(currentDateString);
    
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    // Nếu tháng hiện tại nhỏ hơn tháng sinh, hoặc bằng tháng sinh nhưng ngày hiện tại nhỏ hơn ngày sinh
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function getDayOfWeekName(dateString) {
    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const date = new Date(dateString);
    return days[date.getDay()];
}

console.log(formatBirthday("1995-03-25"));     // Kết quả: "25/03/1995"
console.log(formatBirthday("2000-12-01"));     // Kết quả: "01/12/2000"

console.log(getAge("1995-03-25", "2026-07-19")); // Kết quả: 31
console.log(getAge("2000-12-01", "2026-07-19")); // Kết quả: 25
console.log(getAge("1995-08-01", "2026-07-19")); // Kết quả: 30

console.log(getDayOfWeekName("2026-07-19"));   // Kết quả: "Chủ nhật"
console.log(getDayOfWeekName("2000-01-01"));   // Kết quả: "Thứ bảy"