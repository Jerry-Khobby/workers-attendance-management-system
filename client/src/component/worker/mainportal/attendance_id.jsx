import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const AttendanceID = () => {
  const [checkInData, setCheckInData] = useState({
    user_id: "",
  });
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceName, setAttendanceName] = useState("");
  const [attendanceID, setAttendanceID] = useState("");
  const [shownList, setShownList] = useState(false);



  useEffect(() => {
    const storedRecords = localStorage.getItem("attendanceRecords");
    const storedName = localStorage.getItem("attendanceName");
    const storedID = localStorage.getItem("attendanceID");

    if (storedRecords) {
      setAttendanceRecords(JSON.parse(storedRecords));
    }

    if (storedName) {
      setAttendanceName(storedName);
    }

    if (storedID) {
      setAttendanceID(storedID);
    }
  }, []);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/attendancesheet/attendance_sheet/",
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
        setAttendanceRecords(data.attendance_records);
        setAttendanceName(data.user_name);
        setAttendanceID(data.user_id);
        localStorage.setItem(
          "attendanceRecords",
          JSON.stringify(data.attendance_records)
        );
        localStorage.setItem("attendanceName", data.user_name);
        localStorage.setItem("attendanceID", data.user_id);
        setMessage("");
        setCheckInData({
          user_id: "",
        });
        setTimeout(() => {
          setSuccessMessage("");
          setMessage("");
          setCheckInData({
            user_id: "",
          });
        }, 3000);
        setShownList(true); // Set the state to true to hide the form
      } else if (response.status === 400) {
        setMessage("User ID is not found in the database");
        setSuccessMessage("");
      } else {
        setMessage("Error checking attendance sheet. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error while checking in:", error);
      setMessage("Error checking attendance sheet. Please try again.");
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

  const getDayOfWeek = (dateString) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    const date =  new Date(dateString.split('T')[0]);
    return days[date.getDay()];
  };

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs">
        { !shownList && ( // Conditionally render the form based on the shownList state
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
                CHECK ATTENDANCE SHEET
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
                  SHOW ATTENDANCE SHEET
                </Button>
              </form>
            </Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              style={{ marginTop: "20px", }}
            >
              <Link to="/homepage">HOMEPAGE</Link>
            </Button>
          </Box>
        )}
      </Container>
      {shownList && ( // Conditionally render the attendance sheet based on the shownList state
        <Container>
          <Box component={Paper} style={{ marginTop: "20px", padding: "20px", border: "1px solid black" }}>
            <TableContainer>
              {(attendanceName && attendanceID) && (
                <Typography variant="h5">{`${attendanceName} - ${attendanceID}`}</Typography>
              )}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Check In</TableCell>
                    <TableCell>Check Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{getDayOfWeek(record.check_in)}</TableCell>
                      <TableCell>{record.check_in}</TableCell>
                      <TableCell>{record.check_out}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      )}
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              style={{ marginTop: "20px",width:"25%" }}
            >
              <Link to="/homepage">HOMEPAGE</Link>
            </Button>
    </div>
  );
};

export default AttendanceID;
