import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Goal } from '../interfaces/Goal';

interface GoalCalendarProps {
    goal: Goal;
}

const GoalCalendar: React.FC<GoalCalendarProps> = ({ goal }) => {
    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            const completionDates = goal?.completionDates?.map(d => new Date(d).toDateString());
            if (completionDates?.includes(date.toDateString())) {
                return 'highlight';
            }
        }
        return null;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{goal.title} - Completion Calendar</h1>
            <Calendar
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default GoalCalendar;