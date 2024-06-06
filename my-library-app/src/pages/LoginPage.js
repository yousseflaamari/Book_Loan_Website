import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to login...');
      const response = await axios.post('http://localhost:3001/api/users/login', { email, motDePasse });
      console.log('API response:', response.data);

      const { token, role, id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      console.log(id);

      if (role === 'administrateur') {
        console.log('Navigating to admin dashboard');
        navigate('/admin-dashboard');
      } else if (role === 'utilisateur') {
        console.log('Navigating to user dashboard');
        navigate('/user-dashboard');
      } else {
        console.error('Unknown role:', role);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login-page1'>
      <div>
        <h1>WELCOME</h1>
      </div>
      <div className='login-container1'>
        <form onSubmit={handleLogin} className='login-form1'>
          <h1 className='login-title1'>Connexion</h1>
          <div className="login-input-group1">
            <FaUser className="login-icon1" />
            <input
              type="email"
              placeholder='Votre email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group1">
            <FaLock className="login-icon1" />
            <input
              type="password"
              placeholder='Mot de passe'
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <div className="login-options1">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-button1">Login</button>
          <div className="login-register-link1">
            <p>Don't have an account? <a href="#">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
