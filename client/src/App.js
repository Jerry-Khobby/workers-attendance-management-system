import "./App.css";

import WorkersCard from "./component/worker/card";
import SignUpForm from "./component/worker/signup";
import LoginPage from "./component/worker/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/worker/mainportal/navbar";
import MainHomePortal from "./component/worker/mainportal/main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpForm />} />{" "}
          <Route path="/card_info/:email" element={<WorkersCard />} />{" "}
          <Route path="/login" element={<LoginPage />} />{" "}
          <Route path="/homepage" element={<MainHomePortal/>} />{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}

    </div>
  );
}

export default App;
