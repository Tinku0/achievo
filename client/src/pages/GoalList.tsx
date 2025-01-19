import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Goal } from '../interfaces/Goal';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import completeIcon from '../assets/complete.svg';
import ActionIcon from '../components/ActionIcon';

const GoalList: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [filter, setFilter] = useState<string>('all');
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

    const handleComplete = async (id: string | undefined) => {
        try {
            await axios.put(`http://localhost:3000/goals/markAsFinish/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGoals();
        } catch (error) {
            console.error('Failed to complete goal', error);
        }
    };

    const filteredGoals = goals.filter(goal => {
        if (filter === 'all') return true;
        return goal.status === filter;
    });

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold mb-4">Goals</h1>
                <Link to="/goals/new" className="bg-orange-500 p-2 rounded text-white mb-4 hover:bg-orange-600">Add Goal</Link>
            </div>
            <div className="mb-4">
                <label className="mr-2">Filter:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 rounded">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            {filteredGoals.length > 0 &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {filteredGoals.map(goal => (
                        <div key={goal._id} className={"shadow-md rounded-lg p-6 bg-white hover:bg-gray-50 transition-transform duration-200 transform hover:scale-105" + (goal.status === 'completed' ? ' bg-green-300' : ' bg-red-300')}>
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold text-gray-800">{goal.title}</h2>
                          <div className="flex space-x-4 items-center">
                            <ActionIcon src={editIcon} alt="edit" tooltip="Edit" onClick={() => handleEdit(goal._id)} />
                            <ActionIcon src={deleteIcon} alt="delete" tooltip="Delete" onClick={() => handleDelete(goal._id)} />
                            {goal.status === 'pending' && (
                              <ActionIcon src={completeIcon} alt="complete" tooltip="Finish" onClick={() => handleComplete(goal._id)} />
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="capitalize text-gray-600">{goal.category}</p>
                          <p className="text-gray-600">{new Date(goal.dueDate).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-3xl font-bold mt-3"> <span className='text-sm'>Streak</span> {goal.streak}</p>
                        </div>
                      </div>                      
                    ))}
                </div>
            }
            {filteredGoals.length === 0 && <div className='mt-3'>No goals found</div>}
        </div>
    );
};

export default GoalList;