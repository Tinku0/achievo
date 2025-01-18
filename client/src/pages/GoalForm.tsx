import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

interface IFormInput {
    title: string;
    description: string;
    category: string;
    dueDate: string;
    status: string;
}

const GoalForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            if (id) {
                await axios.put(`/api/goals/${id}`, data, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            } else {
                await axios.post('http://localhost:5000/goals/add', data, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }
            navigate('/goals');
        } catch (error) {
            console.error('Failed to save goal', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Goal' : 'Add Goal'}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        {...register('category', { required: 'Category is required' })}
                        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        {...register('dueDate', { required: 'Due Date is required' })}
                        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <input
                        type="text"
                        id="status"
                        {...register('status', { required: 'Status is required' })}
                        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {id ? 'Update Goal' : 'Add Goal'}
                </button>
            </form>
        </div>
    );
};

export default GoalForm;