import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Helper to get userName from localStorage
  const getUserNameFromStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.fullName) return user.fullName;
    if (user?.username) return user.username;
    return '';
  };

  useEffect(() => {
    // Set initial userName
    setUserName(getUserNameFromStorage());

    // Listen for storage changes (cross-tab)
    const handleStorage = () => {
      setUserName(getUserNameFromStorage());
    };
    window.addEventListener('storage', handleStorage);

    // Optionally, poll for changes in the same tab (since storage event doesn't fire in same tab)
    const interval = setInterval(() => {
      setUserName(getUserNameFromStorage());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUserName(''); // Clear username from state
    navigate('/signin');
  };

  return (
    <nav className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
      <span className="text-xl font-bold tracking-wide">
        🛍️ E-Shop
      </span>
      <div className="flex items-center gap-4">
        {userName ? (
          <>
            <span className="font-medium">Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


