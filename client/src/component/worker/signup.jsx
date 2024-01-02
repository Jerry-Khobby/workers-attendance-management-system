import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telePhone: "",
    password: "",
    image: null,
    confirmPassword: "",
    dateOfBirth: "",
    age: "",
    placeOfStay: "",
    previousExperience: "",
    acceptTerms: false,
  });

  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [telephoneLengthError, setTelephoneLengthError] = useState("");
  const [backendError, setBackendError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataForSubmission = new FormData();
    // Reset error messages
    setPasswordMismatchError("");
    setTelephoneLengthError("");
    setBackendError("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchError("Passwords do not match");
      return;
    }

    if (formData.telePhone && formData.telePhone.length > 10) {
      setTelephoneLengthError("Telephone number should not exceed 10 digits");
      return;
    }
      // Append all form fields except image
  formDataForSubmission.append("first_name",formData.firstName)
  formDataForSubmission.append("last_name",formData.lastName)
  formDataForSubmission.append("email",formData.email)
  formDataForSubmission.append("telephone",formData.telePhone)
  formDataForSubmission.append("password",formData.password)
  formDataForSubmission.append("date_of_birth",formData.dateOfBirth)
  formDataForSubmission.append("age",formData.age)
  formDataForSubmission.append("previous_experience",formData.previousExperience)
  formDataForSubmission.append("place_of_stay",formData.placeOfStay)
  // Append the image separately
  if(formData.image){
    formDataForSubmission.append('image', formData.image);
  }


    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/action_post/",
        formDataForSubmission,
        {
          headers: {
            Authorization: `Token ffaf53452dda08c2013dc5a89601dabffe05c185`,
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("User created successfully");
        // Reset the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          telePhone: "",
          password: "",
          confirmPassword:"",
          image: null,
          dateOfBirth: "",
          age: "",
          placeOfStay: "",
          previousExperience: "",
          acceptTerms: false,
        });
      } else {
        console.error("Error creating user:", response.statusText);
        if (response.status === 401) {
          setBackendError(
            "An account with this email already exists. Please login."
          );
        } else if (response.data && response.data.error) {
          setBackendError(response.data.error);
        } else {
          setBackendError("Error creating user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      setBackendError("Error creating user. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 h-full w-full">
      <div>
        <h2 className="font-bold text-2xl font-serif">Fresher's Forms</h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-10 flex-wrap pb-40">
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%", lg: "30%" }, // Adjust width for different screen sizes
            border: "2px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          className="mt-10"
        >
          <form onSubmit={handleSubmit}>
            {passwordMismatchError && (
              <p className="text-red-500">{passwordMismatchError}</p>
            )}
            {telephoneLengthError && (
              <p className="text-red-500">{telephoneLengthError}</p>
            )}
            {backendError && <p className="text-red-500">{backendError}</p>}
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
              id="image"
              /* value={formData.image} */
              onChange={handleImageChange}
              accept="image/*"
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
                "I acknowledge and agree to adhere to the company's code of
                conduct. This includes treating all colleagues, clients, and
                stakeholders with respect and professionalism. I will conduct
                myself ethically and follow all applicable laws and
                regulations."
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
                I accept the{" "}
                <a href="/terms" className="text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Link to login page on the same line */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
