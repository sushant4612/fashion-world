import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const { role } = useParams();  // Get the role (buyer or seller) from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(true);  // Toggle between Login and Register

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      if (isLogin) {
        // Handle Login
        const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);  // Store the token in localStorage
        navigate(`/${role}Dashboard`);
      } else {
        // Handle Register
        const response = await axios.post('http://localhost:5001/api/users/register', {
          name,
          email,
          password,
          role,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);  // Store the token in localStorage
        navigate(`/${role}Dashboard`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'} as {role}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an Account' : 'Already have an Account? Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;