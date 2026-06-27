const text = "javascript là ngôn ngữ lập trình phổ biến javascript chạy trên trình duyệt và javascript cũng chạy trên server";

// Hàm 1: Tách đoạn văn thành mảng các từ
function getWords(text) {
    return text.split(" ");
}

// Hàm 2: Đếm số lần xuất hiện của một từ (phân biệt hoa/thường)
function countWord(text, word) {
    const words = getWords(text);
    return words.filter(w => w === word).length;
}

// Hàm 3: Trả về mảng các từ không trùng lặp, sắp xếp alphabet
function getUniqueWords(text) {
    const words = getWords(text);
    const uniqueSet = new Set(words);
    // Sử dụng localeCompare để sắp xếp tiếng Việt chuẩn xác
    return Array.from(uniqueSet).sort((a, b) => a.localeCompare(b));
}

// Hàm 4: Trả về mảng n từ xuất hiện nhiều nhất, sắp xếp giảm dần theo count
function getTopWords(text, n) {
    const words = getWords(text);
    const counts = {};
    
    // Đếm tần suất xuất hiện của từng từ
    words.forEach(word => {
        counts[word] = (counts[word] || 0) + 1;
    });
    
    // Chuyển thành mảng các object
    const result = Object.keys(counts).map(word => ({
        word: word,
        count: counts[word]
    }));
    
    // Sắp xếp giảm dần theo count
    result.sort((a, b) => b.count - a.count);
    
    // Lấy n phần tử đầu tiên
    return result.slice(0, n);
}

// Hàm 5: Bọc từ khóa tìm thấy trong **...**
function highlight(text, word) {
    // Thay thế tất cả các cụm từ khớp bằng chuỗi đã bọc dấu **
    return text.replaceAll(word, `**${word}**`);
}

console.log("Hàm 1:", getWords(text));
console.log("Hàm 2 (javascript):", countWord(text, "javascript")); // 3
console.log("Hàm 2 (chạy):", countWord(text, "chạy")); // 2
console.log("Hàm 2 (python):", countWord(text, "python")); // 0
console.log("Hàm 3:", getUniqueWords(text));
console.log("Hàm 4:", getTopWords(text, 3));
console.log("Hàm 5:", highlight(text, "javascript"));
