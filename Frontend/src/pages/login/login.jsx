import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); 

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!isEmailValid(formData.email)) {
      errors.email = 'Invalid email address';
    }

    // Validate password
    if (!isPasswordValid(formData.password)) {
      errors.password = 'Password must be 8 characters minimum';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormDataComplete()) {
      if (validateForm()) {
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            setFormData({
              email: '',
              password: '',
            });
            const data = await response.json();
            setValidationErrors({});
            setErrorMessage(null); 
            console.log(data.datatosend)
            sessionStorage.setItem('token', data.datatosend.token)
            sessionStorage.setItem('userId', data.datatosend.id.toString());
            sessionStorage.setItem('Name', data.datatosend.Name.toString());
            navigate('/home')
            window.location.reload();
          } else {
            const data = await response.json();
            if (data.error) {
              setErrorMessage(data.error);
            } else {
              console.error('Request failed with status:', response.status);
            }
          }
        } catch (error) {
          console.error('Request error:', error);
        }
      }
    } else {
      const requiredFieldErrors = {};
      setValidationErrors(requiredFieldErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <p className="login__subtitle">Good to see you again!</p>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__form-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={handleInputChange}
              required
              className="login__form-input"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="login__form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleInputChange}
              required
              className="login__form-input"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="login__submit-btn">Login</button>
        </form>
        <p className="login__register-link">
          <Link to="/signup">Don't have an account? Register here</Link>
        </p>
      </div>
      <div className="login__image"></div>
    </div>
  );
}

export default Login;