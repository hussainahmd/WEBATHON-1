export const generateTimetable = (subjects, availableStudyHoursPerDay, sessionPreferences) => {
    const timetable = [];
    let remainingHours = {};

    // Initialize remaining hours for each subject
    subjects.forEach(subject => {
        remainingHours[subject.subjectName] = subject.totalStudyHours;
    });

    // Helper function to format time in HH:MM format
    const formatTime = (time) => {
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    // Iterate over each day and allocate study sessions
    for (let day in availableStudyHoursPerDay) {
        let availableHours = availableStudyHoursPerDay[day]; // Total available hours for the day
        let currentTime = 9; // Starting time for study sessions (9:00 AM)

        while (availableHours > 0) {
            // Find a subject with remaining hours
            const subject = subjects.find(s => remainingHours[s.subjectName] > 0);

            if (!subject) {
                // If no subjects have remaining hours, break out of the loop
                break;
            }

            // Determine the duration of the study session
            const sessionLength = Math.min(sessionPreferences.sessionLength / 60, remainingHours[subject.subjectName], availableHours);

            // Create a study session
            const studySession = {
                subjectName: subject.subjectName,
                day,
                startTime: formatTime(currentTime),
                endTime: formatTime(currentTime + sessionLength)
            };

            // Add the session to the timetable
            timetable.push(studySession);

            // Update the remaining time
            remainingHours[subject.subjectName] -= sessionLength;
            availableHours -= sessionLength;
            currentTime += sessionLength;

            // Account for break time (if applicable)
            currentTime += sessionPreferences.breakBetweenSessions / 60;
        }
    }

    return timetable;
};
