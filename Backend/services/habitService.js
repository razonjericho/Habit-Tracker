

const calculateStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;
    
    const dateSet = new Set(dates);

    const latestDate = new Date(dates[0]).toLocaleDateString("en-CA");

    const today = new Date().toLocaleDateString("en-CA");

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toLocaleDateString("en-CA");

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

export default calculateStreak;