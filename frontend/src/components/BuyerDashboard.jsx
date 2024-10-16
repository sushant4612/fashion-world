import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome, Buyer!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default BuyerDashboard;