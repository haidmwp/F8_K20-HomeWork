// Dữ liệu đầu vào
const examResults = [
  { student: "An", scores: [8.5, 7, 9, 6.5] },
  { student: "Bình", scores: [10, 9.5, 8, 10] },
  { student: "Chi", scores: [5, 4.5, 6, 5.5] },
  { student: "Duy", scores: [7, 7, 7, 7] },
];

// Hàm 1: Tính điểm trung bình và làm tròn 1 chữ số thập phân
function getAverage(scores) {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((total, score) => total + score, 0);
  return Number((sum / scores.length).toFixed(1));
}

// Hàm 2: Phân loại học lực
function classifyStudent(average) {
  if (average >= 9) return "Xuất sắc";
  if (average >= 8) return "Giỏi";
  if (average >= 6.5) return "Khá";
  if (average >= 5) return "Trung bình";
  return "Yếu";
}

// Hàm 3: Kiểm tra điểm hợp lệ
function isValidScore(score) {
  return Number.isFinite(score) && score >= 0 && score <= 10;
}

// Hàm 4: Tạo mảng báo cáo kết quả học tập
function getReportCard(results) {
  return results.map(item => {
    const avg = getAverage(item.scores);
    return {
      student: item.student,
      average: avg,
      classification: classifyStudent(avg)
    };
  });
}

// Kiểm tra kết quả chạy hàm 4
console.log(getReportCard(examResults));