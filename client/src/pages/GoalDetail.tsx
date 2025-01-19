import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GoalDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [goal, setGoal] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoal = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}goals/getGoalById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGoal(response.data.goal);
        };
        fetchGoal();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/goals/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/goals');
        } catch (error) {
            console.error('Failed to delete goal', error);
        }
    };

    if (!goal) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{goal.title}</h1>
            <p className="mb-2"><strong>Description:</strong> {goal.description}</p>
            <p className="mb-2"><strong>Category:</strong> {goal.category}</p>
            <p className="mb-2"><strong>Due Date:</strong> {new Date(goal.dueDate).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Status:</strong> {goal.status}</p>
            <button onClick={handleDelete} className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete Goal
            </button>
        </div>
    );
};

export default GoalDetail;