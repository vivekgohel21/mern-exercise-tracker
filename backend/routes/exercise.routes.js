const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.controller')

router.get('/', exerciseController.fetchAllExercises);
router.post('/add', exerciseController.createExercise);
router.get('/:id', exerciseController.fetchExerciseById);
router.delete('/:id', exerciseController.deleteExercise);
router.put('/update/:id', exerciseController.editExercise);

module.exports = router;