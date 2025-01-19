const cron = require('node-cron');
const Goal = require('../models/goal'); // Adjust the path to your Goal model
const calculateNextDueDate = require('../utils/calculateNextDueDate');

const checkRecurringGoals = () => {
    // Schedule the cron job to run daily at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            const now = new Date();
            const goals = await Goal.find({ recurrence: { $ne: 'none' } });

            for (const goal of goals) {
                const dueDate = new Date(goal.dueDate);
                if (dueDate < now) {
                    const nextDueDate = calculateNextDueDate(goal.dueDate, goal.recurrence);
                    goal.dueDate = nextDueDate;
                    await goal.save();
                    console.log(`Updated goal ${goal._id} with next due date: ${nextDueDate}`);
                }
            }
        } catch (error) {
            console.error('Error checking recurring goals:', error);
        }
    });
};

module.exports = checkRecurringGoals;