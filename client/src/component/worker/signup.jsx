import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

const SignUpForm = () => {
//Handle the form submission , 
// handle the changing of the value in the field 
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  telePhone: '',
  password: '',
  confirmPassword: '',
  profilePicture: null,
  dateOfBirth: '',
  age: '',
  placeOfStay: '',
  previousExperience: '',
  acceptTerms: false,
});

const handleChange = (event) => {
  const { name, value, type, checked, files } = event.target;

  // Special handling for file input
  if (type === 'file') {
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  } else if (type === 'checkbox') {
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    // Display error message or handle password mismatch as needed
    console.error('Passwords do not match');
    return;
  }

  // Create a new object with only the necessary fields
  const userData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    telephone: formData.telePhone,
    password: formData.confirmPassword,  // Send confirm password if they match
    image: formData.profilePicture,
    date_of_birth: formData.dateOfBirth,
    age: formData.age,
    place_of_stay: formData.placeOfStay,
    previous_experience: formData.previousExperience,
  };

  try {
    // Send the data to the backend using fetch or your preferred HTTP library
    const response = await fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]*)/)[1],
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log('User created successfully');
      // Reset the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        telePhone: '',
        password: '',
        confirmPassword: '',
        profilePicture: null,
        dateOfBirth: '',
        age: '',
        placeOfStay: '',
        previousExperience: '',
        acceptTerms: false,
      });
    } else {
      console.error('Error creating user:', response.statusText);
      // Handle errors or display error messages as needed
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
    // Handle errors or display error messages as needed
  }
};

  return (
    <div className='flex flex-col items-center justify-center mt-5 h-full w-full'>
      <div>
        <h2 className='font-bold text-2xl font-serif'>Fresher's Forms</h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-10 flex-wrap pb-40">
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            required
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            label="Telephone"
            variant="outlined"
            margin="normal"
            fullWidth
            type="tel"
            name="telePhone"
            value={formData.telePhone}
            onChange={handleChange}
          />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
  value={formData.profilePicture}
  onChange={handleChange}
/>
            <TextField
              label="Date of Birth"
              variant="outlined"
              margin="normal"
              fullWidth
              type="date"
              required
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <TextField
              label="Age"
              variant="outlined"
              margin="normal"
              fullWidth
              rows={3}
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              label="Place of Stay"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="placeOfStay"
              value={formData.placeOfStay}
              onChange={handleChange}
            />
            <TextField
              label="Previous Experience"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={3}
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleChange}
            />
            
<div>
  <p>
  "I acknowledge and agree to adhere to the company's code of conduct. This includes treating all colleagues, clients, and stakeholders with respect and professionalism. I will conduct myself ethically and follow all applicable laws and regulations."
  </p>
</div>

<div className="flex items-center mt-3">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="acceptTerms" className="ml-2">
                I accept the <a href="/terms" className="text-blue-500">Terms and Conditions</a>
              </label>
            </div>

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
    </div>
  );
};

export default SignUpForm;
