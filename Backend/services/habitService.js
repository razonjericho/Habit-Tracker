const calculateStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;
    
    const dateSet = new Set(dates);

    const latestDate = new Date(dates[0]).toLocaleDateString("en-CA");

    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Manila",
    });

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toLocaleDateString("en-CA", {
        timeZone: "Asia/Manila",
    });

      if (latestDate !== today && latestDate !== yesterday){
                return 0;
            }

    let current = new Date(dates[0]);
    current.setHours(0, 0, 0, 0);

    let streak = 0;

    while (true) {
        const stringDate = current.toLocaleDateString("en-CA");

        if (dateSet.has(stringDate)) {
            streak++;

            current.setDate(current.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
} 

const calculateLongestStreak = (dates) => {
    if (!dates || dates.length === 0) return 0; 

    let currentStreak = 1;
    let longestStreak = 1;

    for(let i = 1; i < dates.length; i++){
        const currentDate = new Date(dates[i - 1]);
        const previousDate = new Date(dates[i]);

        const previousDay = new Date(currentDate);
        previousDay.setDate(currentDate.getDate() - 1);

        if (previousDay.toLocaleDateString("en-CA") === previousDate.toLocaleDateString("en-CA")){
            currentStreak++;
        } else {
            currentStreak = 1;
        }

        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }
    }

    return longestStreak;
}

export {calculateStreak, calculateLongestStreak};
