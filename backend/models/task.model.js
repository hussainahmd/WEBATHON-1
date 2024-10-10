import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subject: {
        type: String,
    },
    priority: {
        type: Number,
        default: 1,  // Priority level, 1 is lowest
    },
    deadline: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
