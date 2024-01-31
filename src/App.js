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
import LawReq from "./components/lawyer/LawReq";
import LawChat from "./components/lawyer/LawChat";
import LawChatC from "./components/lawyer/LawChatC";
import Demo from "./components/Demo";
import UserHomu from "./components/UserHomu";
import Feedback from "./components/lawyer/Feedback";
import Feedbackus from "./components/feedbackus";
import NISHI from "./components/NISHI";
import CommunityHome from "./components/community/CommunityHome";
import OTPFINAL from "./components/OTPFINAL";
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
            <Route path="/law/req" element={<LawReq/>}/>
            {/*<Route path="/law/chat" element={<LawChat/>}/>*/}
            <Route path="/law/chat" element={<LawChatC/>}/>
            <Route path="/law/feedback" element={<Feedback/>}/>
            <Route path="/demo" element={<Demo/>}/>
            <Route path="/homu" element={<UserHomu/>}/>
            <Route path="/uWu" element={<Feedbackus/>}/>
            <Route path="/nishi" element={<NISHI/>}/>
            <Route path="/comHome" element={<CommunityHome/>}/>
            <Route path="/otpp" element={<OTPFINAL/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
