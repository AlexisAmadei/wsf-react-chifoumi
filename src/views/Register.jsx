import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom';
import './styles/Register.css'
import RegisterForm from '../components/RegisterForm/RegisterForm';

export default function Register() {
  const { actions } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } else {
      try {
        await actions.registerUser({ username, password });
        setError('User registered successfully ! Redirecting to login page...');
        setTimeout(() => {
          navigate('/security/login');
        }, 2000);
      } catch (error) {
        setError(error.message);
      }
    }
  }
  return (
    <div className="register-wrapper">
      <RegisterForm handleSubmit={handleSubmit} />
      {error && <p>{error}</p>}
    </div>
  )
}
