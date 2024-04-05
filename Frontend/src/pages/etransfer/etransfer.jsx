import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './etransfer.css';

function Etransfer() {

  let navigate = useNavigate();

  function handleBack() {
    navigate(-1); // This will take you back to the previous page in the history stack
  }

  const [formData, setFormData] = useState({
    from: sessionStorage.getItem("userId"),
    to: '',
    amount: '',
    branchid: sessionStorage.getItem("BranchId"),
  });
  const [users, setUsers] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const isFieldEmpty = (field) => {
    return field === '';
  };

  const alertStyle = {
    width: '90%' 
  };

  const validateForm = () => {
    const errors = {};

    // // Validate phone number
    // if (!isPhoneNumberValid(formData.phone)) {
    //   errors.phone = 'Invalid phone number';
    // }

    setValidationErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'from',
      'to',
      'amount',
      'branchid',
    ];
    const areRequiredFieldsFilled = requiredFields.every((field) => !isFieldEmpty(formData[field]));

    console.log(areRequiredFieldsFilled)
    if (areRequiredFieldsFilled) {
      if (validateForm()) {
        console.log("akoo")
        try {
          const response = await fetch('/sendtransfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log("await")
            setFormData({
              from: sessionStorage.getItem("userId"),
              to: '',
              amount: '',
              branchid: sessionStorage.getItem("BranchId"),
            });
            setValidationErrors({});
            setErrorMessage(null); 
            setSuccessMessage('Money sent successfully!');
            const data = await response.json();
            console.log()
            sessionStorage.setItem('amount', data.newAmount.toString());
          } else {
            console.log("awair")
            const data = await response.json();
            if (data.error1) {
              setErrorMessage(data.error1);
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
      setErrorMessage("Required fields empty");
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

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log(formData)
        const response = await fetch(`/getusers?name=${sessionStorage.getItem("userId")}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json(); // Note the use of await here
          console.log("Users fetched", data);
          setUsers(data);
          setFormData({
            from: sessionStorage.getItem("userId"),
            to: '',
            amount: '',
            branchid: sessionStorage.getItem("BranchId"),
          });
          setValidationErrors({});
          setErrorMessage(null);
        } else {
          // If response is not OK, still try to parse it as JSON for error details
          const errorData = await response.json(); // Note the use of await here
          console.log(errorData.error1)
          if (errorData.error1) {
            
            setErrorMessage(errorData.error1);
          } else {
            console.error('Request failed with status:', response.status);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  
    fetchUsers();
  }, []); // Dependency array is empty, so this effect runs only once after the component mounts.
  
  return (
    <div className="grid-container">
      <div className="square"></div>
      <form className='formetrans' onSubmit={handleSubmit}>
        {successMessage && (
          <Alert
            severity="success"
            onClose={handleSuccessAlertClose}
            sx={alertStyle}
          >
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
                <p style={{ color: 'red',  fontSize: '11px', marginTop: '-5px' }}>
                  {errorMessage}
                </p>
              )}
        
        <p style={{ textAlign: 'left', color: '#f1860b', fontSize: '35px', marginTop: '23px', fontWeight: 'bold' }}>
          Etransfer
        </p>
        <div className="form-group">
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
    {/* Dropdown for Firstname */}
    <div className="form-group" style={{ marginRight: '80px' }}>
      <label htmlFor="firstname" style={{ color: '#f1860b' }}>
        To:{isFieldEmpty(formData.firstname) ? <span style={{ color: 'red' }}>*</span> : null}
      </label>
      <select
        id="to"
        name="to"
        value={formData.to}
        onChange={handleChange}
        style={{ borderBottom: '2px solid #f1860b', display: 'block', width: '100%' }}
      >
         <option value="">Select a user</option>
    {users.map((user, index) => (
      <option key={index} value={user.fullname}>
        {user.fullname}
      </option>
    ))}
      </select>
    </div>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
    {/* Amount Field */}
    <div className="form-group">
      <label htmlFor="amount" style={{ color: '#f1860b' }}>
        Amount{isFieldEmpty(formData.amount) ? <span style={{ color: 'red' }}>*</span> : null}
      </label>
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={handleChange}
        style={{
          borderBottom: '2px solid #f1860b',
        }}
        min="0" // Set minimum value to 0 to prevent negative amounts
        step="0.01" // Allow decimal values for cents
      />
      {validationErrors.amount && <p style={{ color: 'red', fontSize: '11px', marginTop: '-5px' }}>{validationErrors.amount}</p>}
        </div>
      </div>
      </div>

        <button
          className="submit"
          type="submit"
          style={{
            width: '20%',
            color: 'white',
            backgroundColor: '#f1860b',
            borderRadius: '15px',
            padding: '12px 20px',
            margin: '0px',
            display: 'block',
            marginTop: '26px',
          }}
        >
          Send
        </button>
        <button
      className="submit"
      type="button" // Change the type to "button" if it's not submitting a form
      onClick={handleBack}
      style={{
        width: '15%',
        color: 'white',
        backgroundColor: '#f1860b',
        borderRadius: '15px',
        padding: '12px 20px',
        margin: '0px',
        display: 'block',
        marginTop: '26px',
      }}
    >
      Back
    </button>
      </form>
      
    </div>
  );  
}

export default Etransfer;