import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Goal } from '../interfaces/Goal';

const localizer = momentLocalizer(moment);

const GoalCalendar: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [completionDates, setCompletionDates] = useState<string[]>([]);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://localhost:3000/goals/get', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGoals(response.data.goals);
            if (response.data.goals.length > 0) {
                setSelectedGoal(response.data.goals[0]);
                setCompletionDates(response.data.goals[0].completionDates.map((d: string) => new Date(d).toDateString()));
            }
        } catch (error) {
            console.error('Failed to fetch goals', error);
        }
    };

    const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const goalId = event.target.value;
        const goal = goals.find(g => g._id === goalId) || null;
        setSelectedGoal(goal);
        if (goal) {
            setCompletionDates(goal?.completionDates ? goal.completionDates.map((d: string) => new Date(d).toDateString()) : []);
        }
    };

    const dayPropGetter = (date: Date) => {
        const dateString = date.toDateString();
        if (completionDates.includes(dateString)) {
            return {
                className: 'highlighted-date',
                style: {
                    backgroundColor: '#38a169', // Tailwind CSS green-500
                    color: 'white',
                },
            };
        }
        return {};
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Goal Progress Calendar</h1>
            <div className="mb-4 w-full max-w-md">
                <label className="block text-lg font-medium mb-2">Select Goal:</label>
                <select value={selectedGoal?._id || ''} onChange={handleGoalChange} className="w-full p-2 rounded border border-gray-300">
                    {goals.map(goal => (
                        <option key={goal._id} value={goal._id}>
                            {goal.title}
                        </option>
                    ))}
                </select>
            </div>
            {selectedGoal && (
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">{selectedGoal.title}</h2>
                    <Calendar
                        localizer={localizer}
                        events={[]}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        views={['month']}
                        defaultView="month"
                        dayPropGetter={dayPropGetter}
                    />
                </div>
            )}
        </div>
    );
};

export default GoalCalendar;