import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Avatar,
  IconButton,
  Button,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import './profile.css';

const Profile = () => {
  const requiredFields = {
    first_name: true,
    last_name: true,
    email: true,
    address: true,
    phone_number: true,
    date_of_birth: true,
    license_number: true,
    hire_date: true,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); 

  useEffect(() => {
    const fetchProfileData = async () => {
      try {

        const storedUserId = sessionStorage.getItem('userId');
        const response = await fetch(`/profile/${storedUserId}`);
        const data = await response.json();

        if (data.date_of_birth) {
          const parsedDateOfBirth = new Date(data.date_of_birth);
          const dateOfBirthOnly = parsedDateOfBirth.toISOString().split('T')[0];
          data.date_of_birth = dateOfBirthOnly;
        }

        if (data.hire_date) {
          const parsedHireDate = new Date(data.hire_date);
          const hireDateOnly = parsedHireDate.toISOString().split('T')[0];
          data.hire_date = hireDateOnly;
        }

        setFormData(data);
        setSavedData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const isPharmacist = formData.user_id && formData.user_id.startsWith('p');

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!formData.first_name || !formData.last_name) {
      return;
    }

    if (!isPharmacist && !formData.address) {
      return;
    }
  
    if (validateForm()) {
      try {
        const response = await fetch(`/profile/${formData.user_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setSavedData(formData);
          toggleEditing();
        } else {
          const responseData = await response.json();
  
          if (response.status === 401 && responseData.error === 'Email already exists') {
            setErrorMessage(responseData.error);
          } else {
            console.error('Error saving profile changes:', responseData.error);
          }
        }
      } catch (error) {
        console.error('Error saving profile changes:', error);
      }
    }
  };
  
  const handleCancel = () => {
    if (isEditing) {
      setFormData(savedData);
      setValidationErrors({});
      setErrorMessage(null);
    }
    toggleEditing();
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const isLicenseNumberValid = (licenseNumber) => {
    const licenseNumberPattern = /^\d{10}$/;
    return licenseNumberPattern.test(licenseNumber);
  };

  const validateForm = () => {
    const errors = {};

    // Validate phone number
    if (!isPhoneNumberValid(formData.phone_number)) {
      errors.phone_number = 'Invalid phone number';
    }

    // Validate email
    if (!isEmailValid(formData.email)) {
      errors.email = 'Invalid email address';
    }

    // validate license number 
    if (isPharmacist && !isLicenseNumberValid(formData.license_number)) {
      errors.license_number = 'License number must be 10 digits';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  return (
    <Container
      style={{
        position: isEditing ? 'relative' : 'fixed',
        transform: isEditing ? 'translateX(110px)' : 'translateX(110px)',
        zIndex: isEditing ? 'auto' : 1,
      }}
    >
      <Grid container spacing={3} style={{ marginTop: '-110px', transform: 'scale(0.92)', marginLeft: '-180px' }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom style={{ color: '#25b4ec', fontSize: '35px', fontWeight: '800', fontFamily: 'Times New Roman', transform: 'translateY(60px)' }}>
            Hi, {formData.first_name}!
          </Typography>
          <Typography variant="h4" gutterBottom>
            <Avatar sx={{ width: 150, height: 150, backgroundColor: '#25b4ec', borderRadius: '10%', transform: 'translateY(60px)' }}>
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box mt={4} display="flex" justifyContent="left">
            {isEditing ? (
              <>
                <Button onClick={handleSave} style={{
                  border: '1px solid #25b4ec',
                  color: 'white',
                  backgroundColor: '#25b4ec',
                  borderRadius: '25px',
                  padding: '8px 15px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transform: isPharmacist ? 'translateY(880px)' : 'translateY(790px)',
                  fontSize: '15px',
                }}>
                  Save Changes
                </Button>
                <Button onClick={handleCancel} style={{
                  border: '1px solid #25b4ec',
                  color: '#25b4ec',
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  padding: '0px 15px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transform: isPharmacist ? 'translateY(880px)' : 'translateY(790px)',
                  fontSize: '15px',
                  marginLeft: '12px',
                }}>
                  Cancel
                </Button>
              </>
            ) : (
              <IconButton color="primary" aria-label="edit" onClick={toggleEditing} sx={{ color: 'green', fontSize: '17px', fontWeight: '700', transform: 'translateX(-7px)' }}>
                <span style={{ color: '#25b4ec' }}>
                  {isPharmacist ? 'Pharmacist details' : 'Patient details'}
                </span>
                <EditTwoToneIcon sx={{ color: '#25b4ec', fontSize: '20px' }} />
              </IconButton>
            )}
          </Box>
          <div>
            <span style={{ color: 'gray' }}>First name</span>
            {requiredFields.first_name && !formData.first_name && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #25b4ec',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                {formData.first_name}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Last name</span>
            {requiredFields.last_name && !formData.last_name && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #25b4ec',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                {formData.last_name}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Gender</span><br />
            {isEditing ? (
              <div>
                <button
                  type="button"
                  style={{
                    border: '1px solid #25b4ec',
                    color: formData.gender === 'Male' ? 'white' : '#25b4ec',
                    backgroundColor: formData.gender === 'Male' ? '#25b4ec' : 'white',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    marginTop: '15px'
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Male' })}
                >
                  Male
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #25b4ec',
                    color: formData.gender === 'Female' ? 'white' : '#25b4ec',
                    backgroundColor: formData.gender === 'Female' ? '#25b4ec' : 'white',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Female' })}
                >
                  Female
                </button>
              </div>
            ) : (
              <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>{formData.gender}</span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Date of Birth</span>
            {requiredFields.date_of_birth && !formData.date_of_birth && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="date"
                  id="dob"
                  name='date_of_birth'
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #25b4ec',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                {formData.date_of_birth}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Email</span>
            {requiredFields.email && !formData.email && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="johndoe@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #25b4ec',
                    width: '230px',
                  }}
                />
                {validationErrors.email && (
                  <div style={{ marginTop: '-10px' }}>
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      {validationErrors.email}
                    </span>
                  </div>
                )}
                {errorMessage && (
                  <div style={{ marginTop: '-10px' }}>
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      {errorMessage}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                {formData.email}
              </span>
            )}
          </div>
          <br />
          {!isPharmacist && (
            <div>
              <span style={{ color: 'gray' }}>Home Address</span>
              {requiredFields.address && !formData.address && (
                <span style={{ color: 'red' }}> *</span>
              )}
              <br />
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="1 Smith Road"
                    value={formData.address}
                    onChange={handleChange}
                    style={{
                      borderBottom: '2px solid #25b4ec',
                      width: '230px',
                    }}
                  />
                </div>
              ) : (
                <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                  {formData.address}
                </span>
              )}
            </div>
          )}
          {isPharmacist && (
            <div>
              <span style={{ color: 'gray' }}>License Number</span>
              {requiredFields.license_number && !formData.license_number && (
                <span style={{ color: 'red' }}> *</span>
              )}
              <br />
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="license_number"
                    placeholder="1234567895"
                    value={formData.license_number}
                    onChange={handleChange}
                    style={{
                      borderBottom: '2px solid #25b4ec',
                      width: '230px',
                    }}
                  />
                  {validationErrors.license_number && (
                    <div style={{ marginTop: '-10px' }}>
                      <span style={{ color: 'red', fontSize: '12px' }}>
                        {validationErrors.license_number}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                  {formData.license_number}
                </span>
              )}
            </div>
          )}
          <br></br>
          {isPharmacist && (
            <div>
              <span style={{ color: 'gray' }}>Hire Date</span>
              {requiredFields.hire_date && !formData.hire_date && (
                <span style={{ color: 'red' }}> *</span>
              )}
              <br />
              {isEditing ? (
                <div>
                  <input
                    type="date"
                    id="hireDate"
                    name="hire_date"
                    value={formData.hire_date}
                    onChange={handleChange}
                    style={{
                      borderBottom: '2px solid #25b4ec',
                      width: '230px',
                    }}
                  />
                </div>
              ) : (
                <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                  {formData.hire_date}
                </span>
              )}
            </div>
          )}
          <div>
            {isPharmacist && <br />}
            <span style={{ color: 'gray' }}>Phone number</span>
            {requiredFields.phone_number && !formData.phone_number && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phone_number"
                  placeholder="123-456-7890"
                  value={formData.phone_number}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #25b4ec',
                    width: '230px',
                  }}
                />
                {validationErrors.phone_number && (
                  <div style={{ marginTop: '-10px' }}>
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      {validationErrors.phone_number}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span style={{ color: '#25b4ec', fontSize: '14px', fontWeight: '700' }}>
                {formData.phone_number}
              </span>
            )}
          </div>
          <div className={`green-square ${isPharmacist ? 'pharmacist' : ''} ${isEditing && isPharmacist ? 'pharmacist-editing' : isEditing ? 'editing' : ''}`}></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 