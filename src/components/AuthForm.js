import React, { useState } from 'react';
import axios from 'axios';
import './css/AuthForm.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email,
          password,
        });
        console.log(response.data);
        console.log('navigating to /annotation-platform');
        localStorage.setItem('isAuthenticated', true);
        navigate('/project-form', { replace: true });
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    } else {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name,
          email,
          password,
        });
        console.log(response.data);
        setIsLogin(true);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {passwordError && (
              <p style={{ color: 'red' }}>{passwordError}</p>
            )}
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        <button type="submit" disabled={passwordError}> {isLogin ? 'Login' : 'Register'}</button>
        <p>
          {isLogin ? (
            <span>Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span></span>
          ) : (
            <span>Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></span>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;