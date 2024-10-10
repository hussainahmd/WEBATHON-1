import express from 'express';
import Task from '../models/task.model.js';

const router = express.Router();

// POST route to create a new task
router.post('/', async (req, res) => {
    try {
        const { userId, title, description, subject, priority, deadline, status } = req.body;

        const newTask = new Task({
            userId,
            title,
            description,
            subject,
            priority,
            deadline,
            status
        });

        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: savedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
});

// GET route to fetch all tasks for a specific user, with optional filters
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { subject, status, priority } = req.query;

        // Build query with optional filters
        let query = { userId };

        if (subject) query.subject = subject;
        if (status) query.status = status;
        if (priority) query.priority = priority;

        const tasks = await Task.find(query).sort({ deadline: 1 }); // Sort by deadline

        if (!tasks.length) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

// PUT route to update an existing task
router.put('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, subject, priority, deadline, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, subject, priority, deadline, status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

// DELETE route to delete a task by taskId
router.delete('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

// PUT route to mark a task as complete
router.put('/:taskId/complete', async (req, res) => {
    try {
        const { taskId } = req.params;

        const completedTask = await Task.findByIdAndUpdate(
            taskId,
            { status: 'Completed' },
            { new: true }
        );

        if (!completedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task marked as completed', task: completedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error marking task as completed', error: error.message });
    }
});

export default router;
