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
import { Link} from "react-router-dom";

const WorkerEmail = () => {
  const [email, setEmail] = useState({
    worker_email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Redirect to the desired route with the email parameter
    window.location.href=`/homepage/workercard/${email.worker_email}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prevData) => ({
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
            <Typography variant="h5" align="center">
              WORKER CARD
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Enter your email"
                name="worker_email"
                value={email.worker_email}
                onChange={handleChange}
                size="small"
                type="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                WORKER CARD
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
            <Link to="/homepage">HOMEPAGE</Link>
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default WorkerEmail;
