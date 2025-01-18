import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/register', {
                email: data.email,
                password: data.password
            });
            navigate('/login');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' } })}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: value => value === watch('password') || 'Passwords do not match'
                            })}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;