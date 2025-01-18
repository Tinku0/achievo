const express = require('express');
const { createGoal, getGoals, updateGoal, deleteGoal } = require('../controllers/goal');

const router = express.Router();

router.post('/add', createGoal);
router.get('/all', getGoals);
router.put('/update/:id', updateGoal);
router.delete('/delete/:id', deleteGoal);

module.exports = router;