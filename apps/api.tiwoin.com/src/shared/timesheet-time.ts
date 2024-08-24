import dayjs from "dayjs";

export function calculateTotalTime(entries: any[], date: string) {
    let totalTime = 0;
    let lastInTime: any = null;
    let lastBreakTime: any = null;

    entries?.forEach(entry => {
        if (entry.type === 'In') {
            lastInTime = new Date(entry.time);
            lastBreakTime = null;
        } else if (entry.type === 'Break' || entry.type === 'Out') {
            lastBreakTime = new Date(entry.time);
            if (lastInTime !== null) {
                totalTime += (lastBreakTime - lastInTime);
                lastInTime = null;
            }
        }
    });

    // If there's no last OUT entry, use midnight 12AM of the specified date
    // If it's today then use current time as end time since shift is ongoing.
    if (lastBreakTime === null && date) {
        const dayEnd: any = dayjs(date).isToday() ? new Date() : dayjs(date).endOf('day').toDate();
        totalTime += (dayEnd - lastInTime);
    }

    return totalTime;
}