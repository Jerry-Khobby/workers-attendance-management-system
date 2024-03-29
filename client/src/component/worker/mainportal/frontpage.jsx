import React from 'react';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';

const StaticPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',height:'100vh',width:'100%' }}>
        <Button variant="contained" color="primary" style={{ width: '200px', marginBottom: '10px' }}>
        <Link to="/homepage/checkin">
        Check In
        </Link>
         
        </Button>
        <Button variant="contained" color="secondary" style={{ width: '200px', marginBottom: '10px' }}>
        <Link to="/homepage/checkout">
          Check Out
          </Link>
        </Button>
        <Button variant="contained" color="inherit" style={{ width: '200px', marginBottom: '10px' }}>
          <Link to="/homepage/attendancesheet">
          Attendance Sheet
          </Link>
        </Button>
        <Button variant="contained" color="primary" style={{ width: '200px', marginBottom: '10px' }}>
          <Link to="/homepage/workercard">
          My Worker Card
          </Link>
        </Button>
    {/*     <Button variant="contained" color="error" style={{ width: '200px', marginBottom: '10px' }}>
          Delete Me
        </Button> */}
    </div>
  );
};

export default StaticPage;
