import "./App.css";
import WorkersCard from "./component/worker/card";
import SignUpForm from "./component/worker/signup";
import LoginPage from "./component/worker/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHomePortal from "./component/worker/mainportal/main";
import { AuthContextProvider } from "./context/authContext";
import CheckIn from "./component/worker/mainportal/checkin";
import CheckOut from "./component/worker/mainportal/checkout";
import AttendanceID from "./component/worker/mainportal/attendance_id";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpForm />} />{" "}
          <Route path="/card_info/:email" element={<WorkersCard />} />{" "}
          <Route path="/login" element={<LoginPage />} />{" "}
          <Route path="/homepage" element={<MainHomePortal/>} />{" "}
          <Route path="/homepage/checkin" element={<CheckIn />}/>{""}
          <Route path="/homepage/checkout" element={<CheckOut/>} />{""}
          <Route path="/homepage/attendancesheet" element={<AttendanceID/>}/>{""}
        </Routes>{" "}
      </BrowserRouter>{" "}
      </AuthContextProvider>
    </div>
  );
}

export default App;
