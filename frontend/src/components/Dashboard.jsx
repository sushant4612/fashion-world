import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Flower Shop!</h1>
      <p>Choose your role:</p>
      <div>
        <Link to="/auth/buyer">
          <button>Buyer - Register / Login</button>
        </Link>
        <Link to="/auth/seller">
          <button>Seller - Register / Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;