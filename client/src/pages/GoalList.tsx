import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Goal {
    _id: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    status: string;
    userId: string;
}

const GoalList: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://locahost:5000/goals/all', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGoals(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Goals</h1>
            <Link to="/goals/new" className="bg-blue-500 p-2 rounded text-white mb-4">Add Goal</Link>
            {goals.length > 0 &&
                <ul>
                    {goals && goals?.map(goal => (
                        <li key={goal._id} className="mb-2">
                            <Link to={`/goals/${goal._id}`} className="text-blue-500">{goal.title}</Link>
                        </li>
                    ))}
                </ul>
            }
            {goals.length === 0 && <div className='mt-3'>No goals found</div>}
        </div>
    );
};

export default GoalList;