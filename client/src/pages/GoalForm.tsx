import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Goal } from '../interfaces/Goal';

const GoalForm = () => {
    const { id } = useParams<{ id: string }>();
    const [goal, setGoal] = useState<Goal>({ title: '', description: '', category: '', dueDate: '', recurrence: '', streak: 0, completionDates: [], status: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchGoal();
        }
    }, [id]);

    const fetchGoal = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/goals/getGoalById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGoal(response.data.goal);
        } catch (error) {
            console.error('Failed to fetch goal', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/goals/update/${id}`, goal, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            } else {
                await axios.post('http://localhost:3000/goals/add', goal, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }
            navigate('/goals');
        } catch (error) {
            console.error('Failed to save goal', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setGoal({ ...goal, [name]: value });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Goal' : 'Add Goal'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={goal.title}
                        onChange={handleChange}
                        className="mt-2 block w-full border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={goal.description}
                        onChange={handleChange}
                        className="mt-2 block w-full border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={goal.category}
                        onChange={handleChange}
                        className="mt-2 block w-full border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={goal.dueDate ? new Date(goal.dueDate).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        className="mt-2 block w-full border p-2 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={goal.status}
                        onChange={handleChange}
                        className="mt-2 block w-full border p-2 rounded-md"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Recurrence</label>
                    <select
                        name="recurrence"
                        value={goal.recurrence}
                        onChange={handleChange}
                        className="mt-2 block w-full border p-2 rounded-md"
                    >
                        <option value="none">None</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {id ? 'Update Goal' : 'Add Goal'}
                </button>
            </form>
        </div>
    );
};

export default GoalForm;