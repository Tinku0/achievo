const Goal = require('../models/goal');

const createGoal = async (req, res) => {
    try {
        const goal = new Goal({ ...req.body, userId: req.user.id });
        await goal.save();
        res.status(201).send(goal);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getGoals = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const goals = await Goal.find({ userId });
        res.status(200).json({ goals });
    } catch (error) {
        next(error)
    }
};

const getGoalById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const response = await Goal.find({ _id: req.params.id, userId: userId });
        res.status(200).json({ goal: response[0] });
    } catch (error) {
        next(error);
    }
}

const updateGoal = async (req, res) => {
    try {
        const userId = req.user.id;
        const goal = await Goal.findOneAndUpdate({ _id: req.params.id, userId: userId }, req.body, { new: true });
        if (!goal) {
            return res.status(404).send({ message: 'Goal not found' });
        }
        res.status(200).send(goal);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const userId = req.user.id;
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: userId });
        if (!goal) {
            return res.status(404).send({ message: 'Goal not found' });
        }
        res.status(200).send({ message: 'Goal deleted' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const markGoalAsComplete = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        goal.status = 'completed';
        goal.streak += 1;
        goal.lastCompletedDate = new Date();
        goal.completionDates.push(goal.lastCompletedDate);

        await goal.save();
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: 'Failed to complete goal', error });
    }
}

module.exports = { createGoal, getGoals, getGoalById, updateGoal, deleteGoal, markGoalAsComplete };