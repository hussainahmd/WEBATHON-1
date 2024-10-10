import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import timetableRoutes from './timetable.routes.js'
import taskRoutes from './task.routes.js'
import progressRoutes from './progress.routes.js'


import express from 'express';

export const router = express.Router();


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/task', taskRoutes);
router.use('/timetable', timetableRoutes);
router.use('/progress', progressRoutes);