import express from 'express';
import Timetable from '../models/timetable.model.js';
import { generateTimetable } from '../utils/generateTimetable.js';

const router = express.Router();

// POST route to create a new timetable
router.post('/', async (req, res) => {
    try {
        const { userId, subjects, availableStudyHoursPerDay, sessionPreferences } = req.body;

        // Generate study sessions
        const generatedTimetable = generateTimetable(subjects, availableStudyHoursPerDay, sessionPreferences);

        // Save the new timetable in the database
        const newTimetable = new Timetable({
            userId,
            subjects,
            availableStudyHoursPerDay,
            sessionPreferences,
            studySessions: generatedTimetable
        });

        const savedTimetable = await newTimetable.save();
        res.status(201).json({ message: 'Timetable created and saved successfully', timetable: savedTimetable });
    } catch (error) {
        res.status(500).json({ message: 'Error creating timetable', error: error.message });
    }
});

// GET route to fetch timetable by user ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const timetable = await Timetable.findOne({ userId });

        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching timetable', error: error.message });
    }
});

// PUT route to update a timetable
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { subjects, availableStudyHoursPerDay, sessionPreferences } = req.body;

        // Generate updated study sessions
        const updatedTimetableSessions = generateTimetable(subjects, availableStudyHoursPerDay, sessionPreferences);

        // Update the timetable in the database
        const updatedTimetable = await Timetable.findOneAndUpdate(
            { userId },
            {
                subjects,
                availableStudyHoursPerDay,
                sessionPreferences,
                studySessions: updatedTimetableSessions
            },
            { new: true, runValidators: true }
        );

        if (!updatedTimetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.status(200).json({ message: 'Timetable updated successfully', timetable: updatedTimetable });
    } catch (error) {
        res.status(500).json({ message: 'Error updating timetable', error: error.message });
    }
});

// DELETE route to remove a timetable by user ID
router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedTimetable = await Timetable.findOneAndDelete({ userId });

        if (!deletedTimetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.status(200).json({ message: 'Timetable deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting timetable', error: error.message });
    }
});

export default router;