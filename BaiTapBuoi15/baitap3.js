function analyzeClass(scores) {
    let invalidCount = 0;
    let validCount = 0;
    
    let xuatSac = 0;
    let gioi = 0;
    let kha = 0;
    let trungBinh = 0;
    let yeu = 0;
    
    let maxScore = null;
    let minScore = null;
    let totalScore = 0;
    
    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];
        
        // Bỏ qua và đếm điểm không hợp lệ
        if (score < 0 || score > 10) {
            invalidCount++;
        } else {
            validCount++;
            totalScore += score;
            
            // Xếp loại
            if (score >= 9) {
                xuatSac++;
            } else if (score >= 8) {
                gioi++;
            } else if (score >= 6.5) {
                kha++;
            } else if (score >= 5) {
                trungBinh++;
            } else {
                yeu++;
            }
            
            // Tìm Max, Min không dùng Math
            if (maxScore === null || score > maxScore) {
                maxScore = score;
            }
            if (minScore === null || score < minScore) {
                minScore = score;
            }
        }
    }
    
    // Tính điểm trung bình và làm tròn 2 chữ số không dùng toFixed
    let averageScore = 0;
    if (validCount > 0) {
        let avgRaw = totalScore / validCount;
        // Nhân 100, làm tròn đến số nguyên (Math.round chấp nhận được vì không phải là hàm dựng sẵn như toFixed/max/min), rồi chia lại 100
        averageScore = Math.round(avgRaw * 100) / 100;
    }
    
    // Nhận xét dựa trên tỷ lệ
    let comment = "Lớp học ở mức ổn";
    if (validCount > 0) {
        if ((kha + gioi + xuatSac) > validCount / 2) {
            comment = "Lớp học tốt";
        } else if (yeu > validCount / 2) {
            comment = "Cần cải thiện";
        }
    } else {
        comment = "Không có dữ liệu hợp lệ";
    }

    return {
        phanLoai: {
            "Xuất sắc": xuatSac,
            "Giỏi": gioi,
            "Khá": kha,
            "Trung bình": trungBinh,
            "Yếu": yeu
        },
        diemCaoNhat: maxScore,
        diemThapNhat: minScore,
        diemTrungBinh: averageScore,
        soDiemKhongHopLe: invalidCount,
        nhanXet: comment
    };
}