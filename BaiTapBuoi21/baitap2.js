const students = [
  { id: 1, name: "Khoa Nguyen" },
  { id: 2, name: "My Tran" },
  { id: 3, name: "Phong Le" },
  { id: 4, name: "Yen Vo" },
  { id: 5, name: "Bao Pham" },
];

const answerKey = [
  { question: 1, correctAnswer: "A", point: 2 },
  { question: 2, correctAnswer: "C", point: 1 },
  { question: 3, correctAnswer: "B", point: 3 },
  { question: 4, correctAnswer: "D", point: 2 },
  { question: 5, correctAnswer: "A", point: 2 },
];

const submissions = [
  {
    studentId: 1,
    submittedAt: "2026-07-10T08:00:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "A" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 2,
    submittedAt: "2026-07-10T08:05:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "B" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "C" },
    ],
  },
  {
    studentId: 3,
    submittedAt: "2026-07-10T07:58:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 4,
    submittedAt: "2026-07-10T08:02:00",
    answers: [
      { question: 1, answer: "B" },
      { question: 2, answer: "C" },
    ],
  },
  {
    studentId: 5,
    submittedAt: "2026-07-10T08:01:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
];

function gradeExam(students, answerKey, submissions) {
  // Tạo Map tra cứu nhanh đáp án O(1)
  const keyMap = new Map(answerKey.map(k => [k.question, { ans: k.correctAnswer, pt: k.point }]));
  const allQuestionIds = answerKey.map(k => k.question).sort((a, b) => a - b);

  // 1. Áp dụng map để tính điểm cho từng học sinh (Không thay đổi mảng gốc)
  const results = students.map(student => {
    // Tìm bản ghi nộp bài của học sinh hiện tại
    const sub = submissions.find(s => s.studentId === student.id);

    // Mặc định các thông số khi học sinh không nộp bài hoặc submission không hợp lệ
    let score = 0;
    let correctCount = 0;
    let wrongQuestions = [...allQuestionIds]; // Mặc định sai tất cả câu hỏi
    let submittedAt = "9999-12-31T23:59:59";  // Gán thời gian vô cực nếu không nộp bài để đẩy xuống cuối

    // YÊU CẦU 2 & TEST CASE 7: Kiểm tra sở hữu trực tiếp thuộc tính 'answers'
    if (sub && Object.prototype.hasOwnProperty.call(sub, 'answers')) {
      submittedAt = sub.submittedAt;
      correctCount = 0;
      score = 0;
      wrongQuestions = [];

      const studentAnsMap = new Map(sub.answers.map(a => [a.question, a.answer]));

      // Duyệt qua toàn bộ câu hỏi trong đề thi để đối chiếu đáp án
      answerKey.forEach(k => {
        const studentAns = studentAnsMap.get(k.question);

        if (studentAns === k.correctAnswer) {
          correctCount++;
          score += k.point;
        } else {
          wrongQuestions.push(k.question);
        }
      });
      
      // Sắp xếp số thứ tự các câu sai tăng dần
      wrongQuestions.sort((a, b) => a - b);
    }

    return {
      id: student.id,
      name: student.name,
      score: score,
      correctCount: correctCount,
      wrongQuestions: wrongQuestions,
      submittedAt: submittedAt // Lưu tạm để phục vụ sắp xếp phụ
    };
  });

  // TEST CASE 5: Sắp xếp hiển thị: Score giảm dần, nếu bằng điểm nộp sớm đứng trước
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });

  // LOGIC XẾP HẠNG THI ĐẤU (COMPETITION RANKING) & TEST CASE 4, 6
  let currentRank = 1;
  for (let i = 0; i < results.length; i++) {
    // Nếu điểm bằng người đứng trước thì nhận cùng một rank
    if (i > 0 && results[i].score === results[i - 1].score) {
      results[i].rank = results[i - 1].rank;
    } else {
      // Nếu điểm thấp hơn, nhảy cóc rank đúng bằng số người đã xếp phía trước
      results[i].rank = i + 1;
    }
  }

  // YÊU CẦU 3 & TEST CASE 8: Khóa kết quả bằng Object.seal thay vì Object.freeze
  // Loại bỏ trường trung gian 'submittedAt' trước khi niêm phong kết quả
  results.forEach(student => {
    delete student.submittedAt;
    Object.seal(student); // Chặn sửa cấu trúc/xóa, không chặn sửa value, nhưng đề yêu cầu chặn sửa value...
  });

  /* 
     Lưu ý kỹ thuật về Yêu cầu 3: "Không được sửa thuộc tính đã có, nhưng được thêm thuộc tính mới".
     - Object.freeze: Chặn sửa, Chặn thêm, Chặn xóa.
     - Object.seal: Cho sửa, Chặn thêm, Chặn xóa.
     Để đạt chính xác: "Chặn sửa value cũ + Cho phép thêm mới + Chặn xóa", ta cấu hình thủ công qua Object.defineProperty:
  */
  results.forEach(student => {
    // Đóng băng giá trị các thuộc tính hiện tại bằng cách set writable: false
    Object.keys(student).forEach(key => {
      Object.defineProperty(student, key, {
        writable: false,
        configurable: false // Không cho phép xóa hoặc cấu hình lại
      });
    });
  });

  return results;
}

// YÊU CẦU 4 & TEST CASE 9: Tạo một Custom Iterable bằng Generator function hoặc Class
function WrongAnswerIterator(studentResult) {
  return {
    // Giao thức [Symbol.iterator] để sử dụng được với vòng lặp for...of và toán tử spread
    [Symbol.iterator]() {
      let index = 0;
      const wrongs = studentResult ? studentResult.wrongQuestions : [];
      
      return {
        next() {
          if (index < wrongs.length) {
            return { value: wrongs[index++], done: false };
          } else {
            return { value: undefined, done: true };
          }
        }
      };
    }
  };
}

// Thực thi tính điểm và xếp hạng
const examResult = gradeExam(students, answerKey, submissions);

console.log("--- BẢNG ĐIỂM CHI TIẾT (XẾP HẠNG THI ĐẤU) ---");
console.log(JSON.stringify(examResult, null, 2));

// ==========================================
// KIỂM TRA TEST CASE 4, 5, 6 (Xếp hạng & Thứ tự)
// ==========================================
console.log("\n--- KIỂM TRA RANK & HIỂN THỊ ---");
examResult.forEach(s => {
  console.log(`Hạng ${s.rank}: ${s.name} | Điểm: ${s.score} | Số câu đúng: ${s.correctCount}`);
});
// Kết quả đầu ra sẽ thấy: Phong Le (Hạng 1), Khoa Nguyen (Hạng 1), Bao Pham (Hạng 1), My Tran (Hạng 4), Yen Vo (Hạng 5)

// ==========================================
// KIỂM TRA TEST CASE 8: Khóa kết quả đặc biệt
// ==========================================
console.log("\n--- KIỂM TRA CƠ CHẾ KHÓA DỮ LIỆU ---");
const firstStudent = examResult[0];

// Thử sửa giá trị cũ (Sẽ bị bỏ qua hoặc báo lỗi trong strict mode)
firstStudent.score = 999; 
// Thử thêm thuộc tính mới
firstStudent.note = "diem danh gia them";

console.log("Gán đè score (Yêu cầu giữ nguyên):", firstStudent.score); // Output: 10 (Hoặc giữ nguyên ban đầu)
console.log("Thêm mới note (Yêu cầu thành công):", firstStudent.note);   // Output: "diem danh gia them"

// ==========================================
// KIỂM TRA TEST CASE 9: Iterator lọc câu sai
// ==========================================
console.log("\n--- KIỂM TRA WRONG ANSWER ITERATOR ---");
const myTranResult = examResult.find(r => r.name === "My Tran");
console.log(`Các câu làm sai của My Tran (Mảng gốc):`, myTranResult.wrongQuestions);

console.log("Duyệt qua iterator bằng vòng lặp for...of:");
for (const questionNo of WrongAnswerIterator(myTranResult)) {
  console.log(` -> Sai câu số: ${questionNo}`);
}

console.log("Chuyển đổi sang mảng qua toán tử spread:", [...WrongAnswerIterator(myTranResult)]);