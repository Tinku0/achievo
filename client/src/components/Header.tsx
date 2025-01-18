import { Link, useNavigate, Outlet } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <header className="bg-gray-800 p-4 text-white">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Achievo</h1>
                    <nav>
                        <Link to="/goals" className="mr-4">Goals</Link>
                        <button onClick={handleLogout} className="">Logout</button>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;