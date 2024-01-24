import React from "react";
import { Button, TextField, Typography, Container, Paper, Box } from "@mui/material";

const Login = ({heading}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your checkout logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
          <Typography variant="h5" align="center">
            {heading}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="ID Number"
              name="idNumber"
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
              {heading}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
