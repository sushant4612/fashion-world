import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth/:role" element={<Auth />} /> 
          <Route path="/buyerDashboard" element={<BuyerDashboard />} />
          <Route path="/sellerDashboard" element={<SellerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;