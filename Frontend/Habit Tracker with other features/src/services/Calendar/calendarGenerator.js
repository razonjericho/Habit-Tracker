

const heatLevel = (intensity) => {
        if (intensity === 0) return 0;
        if (intensity <= 0.25) return 1;
        if (intensity <= 0.50) return 2;
        if (intensity <= 0.75) return 3;
        return 4;
    }

function calendarGenerator(year, month, completedDates = new Set(), heatMap = {}) {
    const startDate = new Date(year, month, 1);
    const firstDayIndex = startDate.getDay();

    const beforeFirstDay = [];

    for (let i = 0; i < firstDayIndex; i++) {
        beforeFirstDay.push(null);
    }

    const endDate = new Date(year, month + 1, 0);

    const calendarDays = [];

    let current = new Date(startDate);

    while (current <= endDate) {
        const day = current.toLocaleDateString("en-CA");

        const isCompleted = completedDates.has(day);

        const heat = heatMap[day];

        const level = heatLevel(heat?.intensity ?? 0);

        calendarDays.push({
            day: day,
            level: level,
            isCompleted: isCompleted,
            completed: heat?.completed || 0,
            totalHabits: heat?.totalHabits || 0,
            intensity: heat?.intensity || 0
        });

        current.setDate(current.getDate() + 1);
    }

    const calendarCells = [
        ...beforeFirstDay,
        ...calendarDays
    ];

    const weekSize = 7;
    const weeks = [];

    for (let i = 0; i < calendarCells.length; i += weekSize) {
        const week = calendarCells.slice(i, i + weekSize)
        weeks.push(week);
    }

    return weeks;
}

export default calendarGenerator;