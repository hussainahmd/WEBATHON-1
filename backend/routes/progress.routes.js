import express from 'express';
import Progress from '../models/progress.model.js';

const router = express.Router();

// POST route to create a new progress record for a subject
router.post('/progress', async (req, res) => {
    try {
        const { userId, subject, tasksCompleted, totalTasks } = req.body;

        const newProgress = new Progress({
            userId,
            subject,
            tasksCompleted,
            totalTasks
        });

        const savedProgress = await newProgress.save();
        res.status(201).json({ message: 'Progress record created successfully', progress: savedProgress });
    } catch (error) {
        res.status(500).json({ message: 'Error creating progress record', error: error.message });
    }
});

// GET route to fetch progress for a specific user and subject
router.get('/progress/:userId/:subject', async (req, res) => {
    try {
        const { userId, subject } = req.params;

        const progress = await Progress.findOne({ userId, subject });

        if (!progress) {
            return res.status(404).json({ message: 'Progress record not found' });
        }

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching progress', error: error.message });
    }
});

// PUT route to update progress for a subject (e.g., completed tasks)
router.put('/progress/:userId/:subject', async (req, res) => {
    try {
        const { userId, subject } = req.params;
        const { tasksCompleted, totalTasks } = req.body;

        const updatedProgress = await Progress.findOneAndUpdate(
            { userId, subject },
            { tasksCompleted, totalTasks },
            { new: true, runValidators: true }
        );

        if (!updatedProgress) {
            return res.status(404).json({ message: 'Progress record not found' });
        }

        res.status(200).json({ message: 'Progress updated successfully', progress: updatedProgress });
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress', error: error.message });
    }
});

// DELETE route to delete a progress record
router.delete('/progress/:userId/:subject', async (req, res) => {
    try {
        const { userId, subject } = req.params;

        const deletedProgress = await Progress.findOneAndDelete({ userId, subject });

        if (!deletedProgress) {
            return res.status(404).json({ message: 'Progress record not found' });
        }

        res.status(200).json({ message: 'Progress record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting progress', error: error.message });
    }
});

export default router;
