// Hàm 1: Tính tổng điểm của một người chơi
function getTotalScore(player) {
    if (!player || !Array.isArray(player.scores)) return 0;
    return player.scores.reduce((sum, score) => sum + score, 0);
}

// Hàm 2: Lập bảng xếp hạng người chơi theo tổng điểm giảm dần
function getRanking(players) {
    if (!Array.isArray(players)) return [];
    
    // Tạo bản sao kèm tổng điểm để tránh làm thay đổi mảng gốc
    const playersWithScores = players.map(player => ({
        name: player.name,
        totalScore: getTotalScore(player),
        badge: player.badge ?? "none"
    }));
    
    // Sắp xếp giảm dần theo tổng điểm
    playersWithScores.sort((a, b) => b.totalScore - a.totalScore);
    
    // Gán thứ hạng rank (bắt đầu từ 1)
    return playersWithScores.map((player, index) => ({
        rank: index + 1,
        ...player
    }));
}

// Hàm 3: Lấy danh sách tên của n người chơi cao điểm nhất
function getTopPlayers(players, n) {
    const ranking = getRanking(players);
    return ranking.slice(0, n).map(player => player.name);
}

// Hàm 4: Định dạng chuỗi hiển thị thẻ thông tin người chơi
function formatPlayerCard(player) {
    if (!player) return "";
    
    const totalScore = getTotalScore(player);
    const baseInfo = `${player.name} | Lv.${player.level} | ${totalScore} điểm`;
    
    // Kiểm tra và định dạng phần badge dựa trên giá trị của thuộc tính badge
    let badgeText = "";
    if (player.badge === "diamond") badgeText = " | 💎 DIAMOND";
    else if (player.badge === "gold") badgeText = " | 🏅 GOLD";
    else if (player.badge === "silver") badgeText = " | 🥈 SILVER";
    
    return `${baseInfo}${badgeText}`;
}

const players = [
  { id: 1, name: "DragonSlayer", scores: [120, 85, 200, 95], level: 8, badge: "gold" },
  { id: 2, name: "NightWolf",    scores: [60, 75, 50],        level: 5, badge: null },
  { id: 3, name: "StarQueen",    scores: [300, 250, 180, 90, 120], level: 12, badge: "diamond" },
  { id: 4, name: "IronFist",     scores: [40, 30],             level: 2, badge: null },
  { id: 5, name: "ShadowBlade",  scores: [150, 200, 175],      level: 9, badge: "silver" },
];

// Test Hàm 1
console.log(getTotalScore(players[0]));  // 500
console.log(getTotalScore(players[3]));  // 70 (40 + 30)

// Test Hàm 2
const ranking = getRanking(players);
console.log(ranking[0]);
// { rank: 1, name: 'StarQueen', totalScore: 940, badge: 'diamond' }
console.log(ranking[4]);
// { rank: 5, name: 'IronFist', totalScore: 70, badge: 'none' }

// Test Hàm 3
console.log(getTopPlayers(players, 3));
// [ 'StarQueen', 'ShadowBlade', 'DragonSlayer' ]

// Test Hàm 4
console.log(formatPlayerCard(players[0]));  // "DragonSlayer | Lv.8 | 500 điểm | 🏅 GOLD"
console.log(formatPlayerCard(players[1]));  // "NightWolf | Lv.5 | 185 điểm"
console.log(formatPlayerCard(players[2]));  // "StarQueen | Lv.12 | 940 điểm | 💎 DIAMOND"