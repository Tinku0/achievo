import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Goal } from '../interfaces/Goal';
import edit from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const GoalList: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://localhost:3000/goals/get', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGoals(response.data.goals);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        try {
            await axios.delete(`http://localhost:3000/goals/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGoals();
        } catch (error) {
            console.error('Failed to delete goal', error);
        }
    };

    const handleEdit = (id: string | undefined) => {
        navigate(`/goal-form/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold mb-4">Goals</h1>
                <Link to="/goals/new" className="bg-orange-500 p-2 rounded text-white mb-4">Add Goal</Link>
            </div>
            {goals.length > 0 &&
                <ul className='my-3'>
                    {goals && goals?.map(goal => (
                        <li key={goal._id} className="mb-4 shadow-md rounded p-2">
                            <div className="flex justify-between items-center">
                                <span>{goal.title}</span>
                                <div className='flex space-x-2 items-center'>
                                    <img className='cursor-pointer transform transition-transform duration-200 hover:scale-125' onClick={() => handleEdit(goal._id)} src={edit} width={20} alt="edit" />
                                    <img className='cursor-pointer transform transition-transform duration-200 hover:scale-125' onClick={() => handleDelete(goal._id)} src={deleteIcon} width={20} alt="delete" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
            {goals.length === 0 && <div className='mt-3'>No goals found</div>}
        </div>
    );
};

export default GoalList;