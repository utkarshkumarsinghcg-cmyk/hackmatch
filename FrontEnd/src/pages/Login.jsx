import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../services/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      {/* Background glows */}
      <div className="login__glow--blue"></div>
      <div className="login__glow--purple"></div>

      <div className="login__wrapper">
        {/* Logo header */}
        <div className="login__logo-header">
          <Link to="/" className="login__logo">
            <div className="login__logo-icon">
              <span className="login__logo-letter">H</span>
            </div>
            <span className="login__logo-text">HackMatch</span>
          </Link>
          <h1 className="login__heading">Welcome back</h1>
          <p className="login__subheading">Sign in to find your next team</p>
        </div>

        {/* Card */}
        <div className="login__card">
          <form onSubmit={handleSubmit} className="login__form">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="login__extras">
              <label className="login__remember">
                <input type="checkbox" className="login__remember-checkbox" />
                <span className="login__remember-text">Remember me</span>
              </label>
              <a href="#" className="login__forgot">Forgot password?</a>
            </div>
            <Button type="submit" className="login__submit" isLoading={loading} size="md">
              Sign In to HackMatch
            </Button>
          </form>

          <div className="login__footer">
            <p className="login__footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="login__footer-link">
                Create one free →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
