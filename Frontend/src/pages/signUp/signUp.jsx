import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import './signUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    branchnum: '',
    homeAddress: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    licenseNumber: '',
    hiredDate: '',
    userType: '', 
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const isFieldEmpty = (field) => {
    return field === '';
  };

  const alertStyle = {
    width: '90%' 
  };
  
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  };

  
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const errors = {};

    // Validate phone number
    if (!isPhoneNumberValid(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    // Validate email
    if (!isEmailValid(formData.email)) {
      errors.email = 'Invalid email address';
    }
   
    // Validate password
    if (!isPasswordValid(formData.password)) {
      errors.password = 'Password must be 8 characters minimum';
    }

    // Check if password matches with confirmed password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword',
    ];
    const areRequiredFieldsFilled = requiredFields.every((field) => !isFieldEmpty(formData[field]));

    console.log(areRequiredFieldsFilled)
    if (areRequiredFieldsFilled) {
      if (validateForm()) {
        console.log("akoo")
        try {
          const response = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log("await")
            setFormData({
              firstName: '',
              lastName: '',
              gender: '',
              homeAddress: '',
              dateOfBirth: '',
              phone: '',
              email: '',
              userType: '',
              licenseNumber: '',
              password: '',
              confirmPassword: '',
            });
            setValidationErrors({});
            setErrorMessage(null); 
            setSuccessMessage('Registration successful!');
          
          } else {
            console.log("awair")
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

  const handleSuccessAlertClose = () => {
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="grid-container">
      <div className="square"></div>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <Alert
            severity="success"
            onClose={handleSuccessAlertClose}
            sx={alertStyle}
          >
            {successMessage}
          </Alert>
        )}
        <p style={{ textAlign: 'center', color: '#f1860b', fontSize: '35px', marginTop: '23px', fontWeight: 'bold' }}>
          Welcome!
        </p>
        <div className="form-group">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="firstName" style={{ color: '#f1860b' }}>
                First name{isFieldEmpty(formData.firstName) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #f1860b',
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={{ color: '#f1860b' }}>
                Last name{isFieldEmpty(formData.lastName) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #f1860b',
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" style={{ color: '#f1860b' }}>
                Gender{isFieldEmpty(formData.gender) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '5px' }}>
                <button
                  type="button"
                  style={{
                    border: '1px solid #f1860b',
                    color: formData.gender === 'Male' ? 'white' : '#f1860b',
                    backgroundColor: formData.gender === 'Male' ? '#f1860b' : 'white',
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Male' })}
                >
                  Male
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #f1860b',
                    color: formData.gender === 'Female' ? 'white' : '#f1860b',
                    backgroundColor: formData.gender === 'Female' ? '#f1860b' : 'white',
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Female' })}
                >
                  Female
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="phone" style={{ color: '#f1860b' }}>
                Phone{isFieldEmpty(formData.phone) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #f1860b',
                }}
              />
              {validationErrors.phone && <p style={{ color: 'red', fontSize:'11px', marginTop: '-5px' }}>{validationErrors.phone}</p>}
            </div>
            <div className="form-group" style={{ marginRight: '80px' }}>
              <label htmlFor="email" style={{ color: '#f1860b' }}>
                Email{isFieldEmpty(formData.email) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #f1860b',
                }}
              />
              {validationErrors.email && (
                <p style={{ color: 'red', fontSize: '11px', marginTop: '-5px' }}>
                  {validationErrors.email}
                </p>
              )}
              {errorMessage && (
                <p style={{ color: 'red',  fontSize: '11px', marginTop: '-5px' }}>
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="password" style={{ color: '#f1860b' }}>
                Password{isFieldEmpty(formData.password) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #f1860b',
                }}
              />
              {validationErrors.password && <p style={{ color: 'red', fontSize:'11px', marginTop: '-5px' }}>{validationErrors.password}</p>}
            </div>
            <div className="form-group" style={{ marginRight: '80px' }}>
              <label htmlFor="confirmPassword" style={{ color: '#f1860b' }}>
                Confirmed Password{isFieldEmpty(formData.confirmPassword) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #f1860b',
                }}
              />
              {validationErrors.confirmPassword && <p style={{ color: 'red', fontSize:'11px', marginTop: '-5px' }}>{validationErrors.confirmPassword}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
          <div className="form-group">
              <label htmlFor="Branch" style={{ color: '#f1860b' }}>
                Branch #{isFieldEmpty(formData.branchnum) ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: '5px' }}>
                <button
                  type="button"
                  style={{
                    border: '1px solid #f1860b',
                    color: formData.branchnum === '1' ? 'white' : '#f1860b',
                    backgroundColor: formData.branchnum === '1' ? '#f1860b' : 'white',
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => setFormData({ ...formData, branchnum: '1' })}
                >
                  Branch1
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #f1860b',
                    color: formData.branchnum === '2' ? 'white' : '#f1860b',
                    backgroundColor: formData.branchnum === '2' ? '#f1860b' : 'white',
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => setFormData({ ...formData, branchnum: '2' })}
                >
                  Branch2
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #f1860b',
                    color: formData.branchnum === '3' ? 'white' : '#f1860b',
                    backgroundColor: formData.branchnum === '3' ? '#f1860b' : 'white',
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => setFormData({ ...formData, branchnum: '3' })}
                >
                  Branch3
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="submit"
          type="submit"
          style={{
            width: '40%',
            color: 'white',
            backgroundColor: '#f1860b',
            borderRadius: '15px',
            padding: '8px 20px',
            margin: 'auto',
            display: 'block',
            marginTop: '16px',
          }}
        >
          Register
        </button>
        <p className="link" style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{ color: '#f1860b', fontSize: '12px' }}>
            Got an account? Login here
          </Link>
        </p>
      </form>
    </div>
  );  
}

export default SignUp;