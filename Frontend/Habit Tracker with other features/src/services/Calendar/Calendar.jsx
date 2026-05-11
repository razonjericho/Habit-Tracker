import React from 'react';

const dates = streaks ? streaks.dates : [];

    const completedDates = new Set(dates);

    const year = 2026
    const month = 4;

    const startDate = new Date(year, month, 1);
    const firstDayIndex = startDate.getDay();
    const beforeFirstDay = [];

    for (let i = 0; i < firstDayIndex; i++) {
        beforeFirstDay.push(null);
    }

    const endDate = new Date(year, month + 1, 0);

    const calendarDays = [];

    let current = new Date(startDate);

    const result = [];

    while (current <= endDate) {
        const formatted = current.toLocaleDateString("en-CA");
        calendarDays.push(formatted);

        current.setDate(current.getDate() + 1);
    }
    
    for(let day of calendarDays) {
        const isCompleted = completedDates.has(day);

        result.push({
            date: day,
            completed: isCompleted
        })
    }

    const calendarCells = [
        ...beforeFirstDay,
        ...result
    ];

    const weekSize = 7;
    const weeks = [];

    for(let i = 0; i < calendarCells.length; i += weekSize){
        const week = calendarCells.slice(i, i + weekSize);
        weeks.push(week);
    }