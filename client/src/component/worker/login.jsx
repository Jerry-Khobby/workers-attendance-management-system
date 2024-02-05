import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginPage = () => {
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: '',
    password: '',
    user_id:'',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailAndPasswordChange = (event) => {
    const { name, value } = event.target;
    setEmailAndPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', emailAndPassword);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/userlogin/login_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token a23653c2965c43077a41c74aaade3e236c45fbfc',
        },
        body: JSON.stringify(emailAndPassword),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Something went wrong');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        return;
      }
      const status = response.status;
      switch (status) {
        case 200:
          setErrorMessage('Successfully logged in');
          // Add any additional logic for a successful login here
          setEmailAndPassword({
            email: '',
            password: '',
            user_id:'',
          });
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
          window.location.href="/homepage"
          break;
        case 401:
          setErrorMessage('Incorrect password');
          break;
        case 404:
          setErrorMessage('User does not exist');
          break;
        // Add more cases for other status codes as needed
        default:
          setErrorMessage('Something went wrong');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong');
       // Clear the error message after 3 seconds
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-20 h-full w-full'>
      {errorMessage && (
        <p className={`font-medium mb-4 ${errorMessage.includes('Successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {errorMessage}
        </p>
      )}
    <div>
    <h2 className='font-bold text-2xl font-serif'>Login Page </h2>
  </div>
    <Box
      sx={{
        width: { xs: '90%', sm: '80%', md: '70%', lg: '30%' },
        border: '2px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      className='mt-10'
    >
      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <div>
            <p className="text-normal font-medium ">Enter your credentials to Login</p>
        </div>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          required
          name="email"
          value={emailAndPassword.email}
          onChange={handleEmailAndPasswordChange}
        />

<TextField
          label="Enter your ID"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          required
          name="user_id"
          maxLength="10"
          value={emailAndPassword.user_id}
          onChange={handleEmailAndPasswordChange}
        />

        {/* Password field */}
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          required
          name="password"
          value={emailAndPassword.password}
          onChange={handleEmailAndPasswordChange}
        />

        {/* Confirm button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirm
        </Button>
      </form>
    </Box>
    </div>
  );
};

export default LoginPage;
