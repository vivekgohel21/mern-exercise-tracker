const Exercise = require('../models/exercise.model');

const fetchAllExercises = async (req, res, next) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json({
            success: true,
            message: 'Exercises fetched successfully',
            exercises: exercises
        });
    } catch (err) {
        res.status(500).json({
            error: 'Something went wrong while fetching exercises',
            details: err.message
        });
    }
};

const createExercise = async (req, res, next) => {
    try {
        const { username, description, duration, date } = req.body;

        const newExercise = new Exercise({
            username,
            description,
            duration,
            date
        });

        const savedExercise = await newExercise.save();
        res.status(201).json({
            success: true,
            message: 'Exercise created successfully',
            exercise: savedExercise
        });

    } catch (err) {
        res.status(500).json({
            error: 'Something went wrong while creating exercise',
            details: err.message
        });
    }
};

const fetchExerciseById = async (req, res, next) => {
    try {
        const exerciseId = req.params.id;
        const exercise = await Exercise.findById(exerciseId);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exercise fetched successfully',
            exercise: exercise
        });
    } catch (err) {
        res.status(500).json({
            error: 'Something went wrong while fetching exercise',
            details: err.message
        });
    }
};

const editExercise = async (req, res, next) => {
    try {
        const exerciseId = req.params.id;
        const { username, description, duration, date } = req.body;

        const newExercise = { username, description, duration, date };

        const updatedExercise = await Exercise.findByIdAndUpdate(
            exerciseId,
            newExercise,
            { new: true, runValidators: true }
        );

        if (!updatedExercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exercise updated successfully',
            exercise: updatedExercise
        });
    } catch (err) {
        res.status(500).json({
            error: 'Something went wrong while editing exercise',
            details: err.message
        });
    }
};

const deleteExercise = async (req, res, next) => {
    try {
        const exerciseId = req.params.id;
        const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);

        if (!deletedExercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exercise deleted successfully',
            exercise: deletedExercise
        });
    } catch (err) {
        res.status(500).json({
            error: 'Something went wrong while deleting exercise',
            details: err.message
        });
    }
};

module.exports = {
    fetchAllExercises,
    fetchExerciseById,
    createExercise,
    editExercise,
    deleteExercise
};
