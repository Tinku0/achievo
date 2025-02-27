const express = require('express');
const { createGoal, getGoals, updateGoal, deleteGoal, getGoalById, markGoalAsComplete } = require('../controllers/goal');

const router = express.Router();

router.post('/add', createGoal);
router.get('/get', getGoals);
router.get('/getGoalById/:id', getGoalById);
router.put('/update/:id', updateGoal);
router.delete('/delete/:id', deleteGoal);
router.put('/markAsFinish/:id', markGoalAsComplete);

module.exports = router;