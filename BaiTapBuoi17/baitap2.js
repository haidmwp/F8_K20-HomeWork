// Hàm 1: Kiểm tra bình luận hợp lệ
function isValidComment(comment) {
    if (!comment) return false;
    
    // 1. Kiểm tra user (không null, undefined, không rỗng)
    const hasUser = comment.user && typeof comment.user === 'string' && comment.user.trim() !== '';
    
    // 2. Kiểm tra content (ít nhất 5 ký tự sau khi trim)
    const hasValidContent = comment.content && typeof comment.content === 'string' && comment.content.trim().length >= 5;
    
    // 3. Kiểm tra rating (là số từ 1 đến 5)
    const hasValidRating = typeof comment.rating === 'number' && comment.rating >= 1 && comment.rating <= 5;
    
    return !!(hasUser && hasValidContent && hasValidRating);
}

// Hàm 2: Lọc các bình luận hợp lệ
function filterValidComments(comments) {
    return comments.filter(isValidComment);
}

// Hàm 3: Tính toán thống kê bình luận
function getCommentStats(validComments) {
    if (!validComments || validComments.length === 0) {
        return { total: 0, avgRating: 0, totalLikes: 0, verifiedCount: 0, topComment: null };
    }

    let totalRating = 0;
    let totalLikes = 0;
    let verifiedCount = 0;
    let topComment = validComments[0];

    validComments.forEach(comment => {
        totalRating += comment.rating;
        totalLikes += comment.likes || 0;
        if (comment.verified) verifiedCount++;
        
        // Tìm bình luận nhiều like nhất
        if ((comment.likes || 0) > (topComment.likes || 0)) {
            topComment = comment;
        }
    });

    const avgRating = parseFloat((totalRating / validComments.length).toFixed(1));

    return {
        total: validComments.length,
        avgRating,
        totalLikes,
        verifiedCount,
        topComment
    };
}

// Hàm 4: Định dạng chuỗi hiển thị bình luận
function formatComment(comment) {
    const ratingStars = "⭐".repeat(comment.rating || 0);
    const userName = comment.user ?? "Ẩn danh";
    const verifiedCheck = comment.verified ? " ✓" : "";
    const likesCount = comment.likes || 0;

    return `${ratingStars} | ${userName}${verifiedCheck} | ${comment.content} | 👍 ${likesCount}`;
}

const comments = [
  { id: 1, user: "An", content: "Sản phẩm rất tốt!", rating: 5, verified: true, likes: 12 },
  { id: 2, user: "", content: "ok", rating: 3, verified: false, likes: 0 },
  { id: 3, user: "Bình", content: "Mua lần 2 rồi, vẫn chất lượng", rating: 4, verified: true, likes: 8 },
  { id: 4, user: "Chi", content: "   ", rating: null, verified: false, likes: 2 },
  { id: 5, user: "Duy", content: "Giao hàng nhanh, đóng gói cẩn thận, sẽ ủng hộ tiếp!", rating: 5, verified: true, likes: 20 },
  { id: 6, user: null, content: "Tệ quá", rating: 1, verified: false, likes: 0 },
  { id: 7, user: "Em", content: "Bình thường", rating: 3, verified: true, likes: 1 },
];

// Test Hàm 1
console.log(isValidComment(comments[0]));  // true
console.log(isValidComment(comments[1]));  // false (user rỗng, content quá ngắn)
console.log(isValidComment(comments[3]));  // false (content chỉ có khoảng trắng, rating null)
console.log(isValidComment(comments[5]));  // false (user null)

// Test Hàm 2
const validList = filterValidComments(comments);
console.log(validList); 
// Kết quả trả về mảng gồm 4 phần tử có id: 1, 3, 5, 7

// Test Hàm 3
console.log(getCommentStats(validList));
/* Kết quả:
{
  total: 4,
  avgRating: 4.3,
  totalLikes: 41,
  verifiedCount: 3,
  topComment: { id: 5, user: 'Duy', content: 'Giao hàng nhanh...', rating: 5, verified: true, likes: 20 }
}
*/

// Test Hàm 4
console.log(formatComment(comments[0])); // "⭐⭐⭐⭐⭐ | An ✓ | Sản phẩm rất tốt! | 👍 12"
console.log(formatComment(comments[2])); // "⭐⭐⭐⭐ | Bình ✓ | Mua lần 2 rồi, vẫn chất lượng | 👍 8"
console.log(formatComment(comments[6])); // "⭐⭐⭐ | Em ✓ | Bình thường | 👍 1"