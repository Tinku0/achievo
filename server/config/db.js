const mongoose = require('mongoose');
const checkRecurringGoals = require('../middleware/cron'); // Import the cron job

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
        checkRecurringGoals();
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {connectDB};