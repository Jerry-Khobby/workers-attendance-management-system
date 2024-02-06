import "./App.css";
import WorkersCard from "./component/worker/card";
import SignUpForm from "./component/worker/signup";
import LoginPage from "./component/worker/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainHomePortal from "./component/worker/mainportal/main";
import { AuthContextProvider } from "./context/authContext";

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
        </Routes>{" "}
      </BrowserRouter>{" "}
      </AuthContextProvider>
    </div>
  );
}

export default App;
