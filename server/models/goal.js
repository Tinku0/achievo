const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, required: true },
    recurrence: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
    streak: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null },
    completionDates: { type: [Date], default: [] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);