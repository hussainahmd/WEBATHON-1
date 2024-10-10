import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subjects: [
        {
            subjectName: { type: String, required: true },
            totalStudyHours: { type: Number, required: true },  // Total hours to allocate for this subject
            priority: { type: Number, default: 1 },  // Higher priority subjects get more focus
        }
    ],
    availableStudyHoursPerDay: {
        Monday: { type: Number, default: 0 },
        Tuesday: { type: Number, default: 0 },
        Wednesday: { type: Number, default: 0 },
        Thursday: { type: Number, default: 0 },
        Friday: { type: Number, default: 0 },
    },
    sessionPreferences: {
        sessionLength: { type: Number, default: 60 }, // in minutes
        breakBetweenSessions: { type: Number, default: 10 }, // in minutes
    },
    studySessions: [
        {
            subjectName: { type: String, required: true },  // The subject of the session
            day: { type: String, required: true },          // e.g., "Monday", "Tuesday"
            startTime: { type: String, required: true },    // e.g., "10:00 AM"
            endTime: { type: String, required: true },      // e.g., "12:00 PM"
        }
    ],
}, { timestamps: true });


const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;
