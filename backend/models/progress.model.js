import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    tasksCompleted: {
        type: Number,
        default: 0,
    },
    totalTasks: {
        type: Number,
        default: 0,
    },
    completionPercentage: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Calculate completion percentage before saving
progressSchema.pre('save', function (next) {
    if (this.totalTasks > 0) {
        this.completionPercentage = (this.tasksCompleted / this.totalTasks) * 100;
    }
    next();
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
