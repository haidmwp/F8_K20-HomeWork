const members = [
  { id: 1, name: "Minh Tran", email: "minh@example.com" },
  { id: 2, name: "Lan Pham", email: "lan@example.com" },
  { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
  { id: 4, name: "Trang Le", email: "trang@example.com" },
  { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
  { id: 201, title: "Clean Code", finePerDay: 5000 },
  { id: 202, title: "Atomic Habits", finePerDay: 3000 },
  { id: 203, title: "Sapiens", finePerDay: 4000 },
  { id: 204, title: "Deep Work", finePerDay: 2000 },
  { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
  {
    id: 3001,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 2 },
      { bookId: 202, lateDays: 0 },
    ],
  },
  {
    id: 3002,
    memberId: 2,
    lines: [
      { bookId: 202, lateDays: 1 },
      { bookId: 203, lateDays: 3 },
    ],
  },
  {
    id: 3003,
    memberId: 3,
    lines: [
      { bookId: 204, lateDays: 5 },
      { bookId: 205, lateDays: 2 },
    ],
  },
  {
    id: 3004,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 203, lateDays: 2 },
    ],
  },
  {
    id: 3005,
    memberId: 5,
    lines: [{ bookId: 205, lateDays: 10 }],
  },
  {
    id: 3006,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 205, lateDays: 3 },
    ],
  },
  {
    id: 3007,
    memberId: 2,
    lines: [
      { bookId: 204, lateDays: 2 },
      { bookId: 203, lateDays: 1 },
    ],
  },
  {
    id: 3008,
    memberId: 3,
    lines: [{ bookId: 202, lateDays: 2 }],
  },
  {
    id: 3009,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 202, lateDays: 1 },
    ],
  },
  {
    id: 3010,
    memberId: 5,
    lines: [
      { bookId: 203, lateDays: 4 },
      { bookId: 204, lateDays: 3 },
    ],
  },
];

function getMemberFineStatistics(members, books, borrowRecords) {
  // Tạo bản đồ tra cứu nhanh thông tin sách O(1)
  const bookMap = new Map(books.map(b => [b.id, { title: b.title, finePerDay: b.finePerDay }]));

  // 1. Map dữ liệu thành viên, đảm bảo không biến đổi (mutate) mảng gốc
  const result = members.map(member => {
    const bookStatsMap = new Map();
    let totalFine = 0;

    // 2. Kiểm tra dữ liệu an toàn và duyệt qua các bản ghi
    borrowRecords.forEach(record => {
      // YÊU CẦU 5: Kiểm tra sở hữu thuộc tính 'lines' trực tiếp (không qua prototype)
      if (!Object.prototype.hasOwnProperty.call(record, 'lines')) {
        return; // Bỏ qua bản ghi không hợp lệ
      }

      if (record.memberId === member.id) {
        record.lines.forEach(line => {
          const bookInfo = bookMap.get(line.bookId);
          if (!bookInfo) return;

          // Nếu chưa có sách này trong Map, khởi tạo giá trị ban đầu
          if (!bookStatsMap.has(line.bookId)) {
            bookStatsMap.set(line.bookId, {
              title: bookInfo.title,
              lateDays: 0,
              fine: 0,
              finePerDay: bookInfo.finePerDay
            });
          }

          // Cộng dồn ngày trễ hạn
          const stats = bookStatsMap.get(line.bookId);
          stats.lateDays += line.lateDays;
        });
      }
    });

    // Tính toán lại trường 'fine' và 'totalFine' sau khi đã cộng dồn xong lateDays
    const booksArray = Array.from(bookStatsMap.values()).map(b => {
      const fine = b.lateDays * b.finePerDay;
      totalFine += fine;
      return {
        title: b.title,
        lateDays: b.lateDays,
        fine: fine
      };
    });

    // YÊU CẦU 2: Sắp xếp danh sách sách theo 'fine' giảm dần
    booksArray.sort((a, b) => b.fine - a.fine);

    return {
      id: member.id,
      name: member.name,
      totalFine: totalFine,
      books: booksArray
    };
  });

  // YÊU CẦU 1: Sắp xếp danh sách thành viên theo 'totalFine' giảm dần
  result.sort((a, b) => b.totalFine - a.totalFine);

  // YÊU CẦU 4: Đóng băng kết quả trả về (Mảng kết quả và từng Object Member bên trong)
  result.forEach(member => Object.freeze(member));
  return Object.freeze(result);
}

class MemberPaginator {
  constructor(resultList, soLuongMoiTrang) {
    this.resultList = resultList;
    this.soLuongMoiTrang = soLuongMoiTrang;
  }

  // Khai báo giao thức [Symbol.iterator] để object trở thành một Iterable
  [Symbol.iterator]() {
    let index = 0;
    const list = this.resultList;
    const size = this.soLuongMoiTrang;

    return {
      next() {
        if (index < list.length) {
          // Trích xuất một mảng con tương ứng với trang hiện tại
          const pageItems = list.slice(index, index + size);
          index += size;
          return { value: pageItems, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
}

// Chạy hàm lấy thống kê
const statisticsResult = getMemberFineStatistics(members, books, borrowRecords);

console.log("--- KẾT QUẢ THỐNG KÊ (ĐÃ SẮP XẾP) ---");
console.log(JSON.stringify(statisticsResult, null, 2));

// KIỂM TRA YÊU CẦU 4: Thử phá vỡ tính đóng băng (Sẽ thất bại hoặc báo lỗi ở strict mode)
statisticsResult[0].totalFine = 999999; 
statisticsResult[0].newProperty = "Hack";
console.log("\nKiểm tra đóng băng (Giá trị không đổi):", statisticsResult[0].totalFine, statisticsResult[0].newProperty); 
// Đầu ra vẫn giữ nguyên giá trị cũ, không sinh ra thuộc tính mới.

// KIỂM TRA YÊU CẦU 6: Duyệt phân trang bằng vòng lặp for...of
console.log("\n--- THỬ NGHIỆM PHÂN TRANG (MỖI TRANG 2 MEMBER) ---");
const paginator = new MemberPaginator(statisticsResult, 2);

let pageNum = 1;
for (const page of paginator) {
  console.log(`\nTrang ${pageNum} (Gồm ${page.length} thành viên):`);
  page.forEach(m => console.log(` - Môn sinh: ${m.name} | Tổng phạt: ${m.totalFine}`));
  pageNum++;
}