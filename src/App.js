import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import OtpVerify from "./components/OtpVerify";
import UserSignUp from "./components/UserSignUp";
import HomePage from "./components/HomePage";
import RaiseQuery from "./components/RaiseQuery";
import LawyerLogin from "./components/lawyer/LawyerLogin";
import LawHome from "./components/lawyer/LawHome";
import FetchAll from "./components/FetchAll";
import FetchMine from "./components/FetchMine";

function App() {
  return (
      <Router>
        <div className="justify-items-center">
          <Routes>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/otpVerify" element={<OtpVerify/>}/>
            <Route path="/signup" element={<UserSignUp/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/fetAll" element={<FetchAll/>}/>
            <Route path="/fetMine" element={<FetchMine/>}/>
            <Route path="/raiseAQuery" element={<RaiseQuery/>}/>
            <Route path="/law/login" element={<LawyerLogin/>}/>
            <Route path="/law/home" element={<LawHome/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;