const cron = require('node-cron');
const Goal = require('../models/goal'); // Adjust the path to your Goal model
const calculateNextDueDate = require('../utils/calculateNextDueDate');

const checkRecurringGoals = async () => {
    console.log('in')
    try {
        const now = new Date();
        const goals = await Goal.find({ recurrence: { $ne: 'none' } });

        for (const goal of goals) {
            const dueDate = new Date(goal.dueDate);
            if (goal.recurrence === 'daily' &&
                goal.lastCompletedDate !== now &&
                !goal?.completionDates?.includes(now)) {
                console.log(`Goal ${goal._id} is due`);
                const nextDueDate = calculateNextDueDate(goal.dueDate, goal.recurrence);
                goal.dueDate = nextDueDate;


                goal.status = 'pending';
                await goal.save();
                console.log(`Updated goal ${goal._id} with next due date: ${nextDueDate}`);
            }
        }
    } catch (error) {
        console.error('Error checking recurring goals:', error);
    }
};

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', checkRecurringGoals);

module.exports = checkRecurringGoals;