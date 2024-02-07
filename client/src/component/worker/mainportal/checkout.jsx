import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const [checkInData, setCheckInData] = useState({
    user_id: "",
  });
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/checkout/check_out/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token a23653c2965c43077a41c74aaade3e236c45fbfc`,
          },
          body: JSON.stringify(checkInData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.status);
        setMessage("");
        setCheckInData({
          user_id:"",
        })
        //clear messages and reset form after 3seconds 
        setTimeout(()=>{
          setSuccessMessage("");
          setMessage("");
          setCheckInData({
            user_id:""
          })
        },3000);
      } else if (response.status === 401) {
        setMessage("You have  not checked in today and cannot check-out unless you checked in");
        setSuccessMessage("");
      } else if (response.status === 402) {
        setMessage("You have already checked out today");
        setSuccessMessage("");
      } else if (response.status === 403) {
        setMessage("Checkout is only allowed after 4:00 PM");
        setSuccessMessage("");
      }
      else {
        setMessage("Error checking in. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error while checking in:", error);
      setMessage("Error checking in. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
            {message && (
              <Typography
                variant="body1"
                align="center"
                style={{ color: "red" }}
              >
                {message}
              </Typography>
            )}
            {successMessage && (
              <Typography
                variant="body1"
                align="center"
                style={{ color: "green" }}
              >
                {successMessage}
              </Typography>
            )}
            <Typography variant="h5" align="center">
              CHECKOUT
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="ID Number"
                name="user_id"
                value={checkInData.user_id}
                onChange={handleChange}
                size="small"
                inputProps={{ maxLength: 10 }}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                CHECKOUT
              </Button>
            </form>
          </Paper>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                style={{ marginTop: "20px" }}
              >
                <Link to="/homepage">
                HOMEPAGE
                </Link>
              </Button>
        </Box>
      </Container>
    </div>
  );
};

export default CheckOut;
