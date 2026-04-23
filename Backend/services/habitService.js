

const calculateStreak = (dates) => {
    let streak = 0;
    
    const dataSet = new Set(dates);

    let current = new Date();

    while (true) {
        const stringDate = current.toISOString().split("T")[0];

        if (dataSet.has(stringDate)) {
            streak++;

            current.setDate(current.getDate() -1);
        } else {
            break;
        }
    }

    return streak;
}