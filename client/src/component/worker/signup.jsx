import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignUpForm = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const handleSubmit = async (event) => {

    event.preventDefault();
    if (!passwordMatch) {
      console.log('Passwords do not match. Please check and try again.');
      return;
    }

    try {
      // Make a POST request to your Django backend
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...basicInfo,
          ...additionalInfo,
        }),
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        // Add any additional logic after a successful submission
      } else {
        console.error('Error submitting the form:', response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed
    }
  };

  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telePhone: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    dateOfBirth: '',
    placeOfStay: '',
    previousExperience: '',
    acceptTerms: false,
    age:''
  });

  const handleBasicInfoChange = (event) => {
    const { name, value } = event.target;
      // Validate telephone number to be exactly 10 digits
  if (name === 'telephone' && !/^\d{10}$/.test(value)) {
    // Display an error message or handle it as needed
    console.log('Invalid telephone number. Please enter exactly 10 digits.');
    return;
  }
    setBasicInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    const confirmPassword = basicInfo.confirmPassword;

    // Check if passwords match
    setPasswordMatch(confirmPassword === value);

    setBasicInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleAdditionalInfoChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAdditionalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
            value={basicInfo.firstName}
            onChange={handleBasicInfoChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="lastName"
            value={basicInfo.lastName}
            onChange={handleBasicInfoChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            required
            value={basicInfo.email}
            name="email"
            onChange={handleBasicInfoChange}
          />
          <TextField
            label="Telephone"
            variant="outlined"
            margin="normal"
            fullWidth
            type="tel"
            name="telePhone"
            value={basicInfo.telePhone}
            onChange={handleBasicInfoChange}
          />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              required
              name="password"
              value={basicInfo.password}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              required
              name="confirmPassword"
              value={basicInfo.confirmPassword}
              onChange={handlePasswordChange}
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
              onChange={handleBasicInfoChange}
              value={basicInfo.profilePicture}
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
              label="Date of Birth"
              variant="outlined"
              margin="normal"
              fullWidth
              type="date"
              required
              name="dateOfBirth"
              value={additionalInfo.dateOfBirth}
              onChange={handleAdditionalInfoChange}
            />
            <TextField
              label="Age"
              variant="outlined"
              margin="normal"
              fullWidth
              rows={3}
              name="age"
              value={additionalInfo.age}
              onChange={handleAdditionalInfoChange}
            />
            <TextField
              label="Place of Stay"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="placeOfStay"
              value={additionalInfo.placeOfStay}
              onChange={handleAdditionalInfoChange}
            />

<TextField
              label="Previous Experience"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={3}
              name="previousExperience"
              value={additionalInfo.previousExperience}
              onChange={handleAdditionalInfoChange}
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
                checked={additionalInfo.acceptTerms}
                onChange={handleAdditionalInfoChange}
                required
              />
              <label htmlFor="acceptTerms" className="ml-2">
                I accept the <a href="/terms" className="text-blue-500">Terms and Conditions</a>
              </label>
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
