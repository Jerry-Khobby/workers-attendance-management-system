import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignUpForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className='flex flex-col items-center justify-center mt-5'>
      <div>
        <h2 className='font-bold text-2xl font-serif'>Fresher's Forms</h2>
      </div>

      <Box
        sx={{
          width: { xs: '90%', sm: '80%', md: '70%', lg: '30%' }, // Adjust width for different screen sizes
          border: '2px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        className='mt-10'
      >
        <form onSubmit={handleSubmit}>
          {/* Other form fields */}
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            required
          />
          <TextField
            label="Telephone"
            variant="outlined"
            margin="normal"
            fullWidth
            type="tel"
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            required
          />
          {/* Image input field */}
          <TextField
            label="Profile Picture"
            type="file"
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Link to login page on the same line */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Already have an account? </p>
            <p to="/login" className="text-blue-500">
              Login
            </p>
          </div>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Confirm
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default SignUpForm;
