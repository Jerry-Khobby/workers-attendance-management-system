import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginPage = () => {
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: '',
    password: '',
    staffnumber:'',
  });

  const handleEmailAndPasswordChange = (event) => {
    const { name, value } = event.target;
    setEmailAndPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', emailAndPassword);
  };

  return (
    <div className='flex flex-col items-center justify-center mt-20 h-full w-full'>
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
          name="staffnumber"
          maxLength="10"
          value={emailAndPassword.staffnumber}
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
