function calculateScore(level, kills, boosted) {
    if (
        typeof level !== 'number' || level < 0 ||
        typeof kills !== 'number' || kills < 0
    ) {
        return "Dữ liệu không hợp lệ";
    }

    if (typeof boosted !== 'boolean') {
        boosted = false;
    }

    const baseScore = kills * 10;
    const bonusScore = level >= 5 ? baseScore * 0.5 : baseScore * 0.2;
    let finalScore = baseScore + bonusScore;

    if (boosted) {
        finalScore = finalScore * 2;
    }

    return Math.floor(finalScore);
}