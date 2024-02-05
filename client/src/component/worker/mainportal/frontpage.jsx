import React from 'react';
import { Button} from '@mui/material';

const StaticPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',height:'100vh',width:'100%' }}>
        <Button variant="contained" color="primary" style={{ width: '200px', marginBottom: '10px' }}>
          Check In
        </Button>
        <Button variant="contained" color="secondary" style={{ width: '200px', marginBottom: '10px' }}>
          Check Out
        </Button>
        <Button variant="contained" color="inherit" style={{ width: '200px', marginBottom: '10px' }}>
          Attendance Sheet
        </Button>
    </div>
  );
};

export default StaticPage;
