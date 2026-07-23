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

    console.log("dates:", dates);
    console.log({
        latestDate,
        today,
        yesterday,
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

    const sortedDate = [...dates].sort((a, b) => new Date(a) - new Date(b));

    let currentStreak = 1;
    let longestStreak = 1;

    for(let i = 1; i < sortedDate.length; i++){
        const previousDate = new Date(sortedDate[i - 1]);
        const afterDate = new Date(sortedDate[i]); //after previous date

        const dateAfterPrevious = new Date(previousDate)
        dateAfterPrevious.setDate(previousDate.getDate() + 1); //also after previous date

        if (dateAfterPrevious.toLocaleDateString("en-CA") === afterDate.toLocaleDateString("en-CA")){
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
