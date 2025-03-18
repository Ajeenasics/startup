import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Entsignup from "./Entreprenuer/Signup/Entsignup";
import LoginPageMain from "./Entreprenuer/LoginPage/LoginPageMain";
import Enthomepage from "./Entreprenuer/Homepage/Enthomepage";
import LandingPageTopNav from "./LandingPage/LandingPageTopNav";
import ForgotPassMain from "./Entreprenuer/ForgotPass/ForgotPassMain";

import MentorRegister from "./components/Mentor/Signup/MentorRegister";
import MentorLogin from "./components/Mentor/Login/MentorLogin";

import InvesterRegister from "./components/Invester/Signup/InvesterRegister";
import InvestorLogin from "./components/Invester/Login/InvestorLogin";

import { CommonNavbar } from "./components/commonNavbar/commonNavbar";
import Navbar_2 from "./components/commonNavbar/Navbar_2";
import HomepageNavbar from "./components/commonNavbar/HomepageNavbar";
import AboutUs from "./LandingPage/AboutUs/AboutUs";
import Services from "./LandingPage/Services/Services";
import AdminNavbar from "./components/Admin/AdminNavbar";
import AdminDashbord from "./components/Admin/AdminDashbord";
import AdminLogin from "./components/Admin/AdminLogin";
import Adminforgot from "./components/Admin/Adminforgot";
import RecentInvestorList from "./components/Admin/Investor/RecentInvestorList";
import RecentMentorList from "./components/Admin/Mentor/RecentMentorList";
import MentorNav from "./components/Mentor/MentorNav/MentorNav";
import MentorHomePage from "./components/Mentor/Homepage/MentorHomePage";
import InvestorNav from "./components/Invester/InvestorNav/InvestorNav";
import InvestorHomePage from "./components/Invester/HomePage/InvestorHomePage";
import Mentorforgotpswd from "./components/Mentor/Mentorforgotpswd";
import PropertiesList from "./components/Mentor/MentorChat";

function App() {
  const url = "http://localhost:4040";

  // const url = "http://hybrid.srishticampus.in:4040";

  return (
    <BrowserRouter basename="strartup">
      <Routes>
        {/* Entrepreneur Routes */}
        <Route path="/" element={<LandingPageTopNav />} />
        <Route
          path="/entrepreneur/signup"
          element={[<CommonNavbar />, <Entsignup />]}
        />
        <Route
          path="/entrepreneur/login"
          element={[<CommonNavbar />, <LoginPageMain />]}
        />
        <Route
          path="/entrepreneur/forgot-password"
          element={[<CommonNavbar />, <ForgotPassMain />]}
        />
        <Route path="/entrepreneur/enthomepage" element={<Enthomepage />} />
       
        {/* Invester Routes */}
        <Route
          path="/investor/signup"
          element={[<CommonNavbar />, <InvesterRegister />]}
        />
        <Route
          path="/investor/login"
          element={[<CommonNavbar />, <InvestorLogin />]}
        />
        <Route
          path="/investor/homepage"
          element={[<InvestorHomePage url={url} />, <Footer_3 />]}
        />
       

        {/* Mentor Routes */}
        <Route
          path="/mentor/signup"
          element={[<CommonNavbar />, <MentorRegister />]}
        />
        <Route
          path="/mentor/login"
          element={[<CommonNavbar />, <MentorLogin />]}
        />
        <Route
          path="/mentor/forgot"
          element={[<CommonNavbar />, <Mentorforgotpswd />]}
        />
        <Route path="/mentor/homepage" element={<MentorHomePage />} />
      

        {/* Common Routes */}
        <Route path="commonnavbar" element={<CommonNavbar />} />
        <Route path="/navbar2" element={<Navbar_2 />} />
        <Route path="/mentor_nav" element={<MentorNav />} />
        <Route path="/investor_nav" element={<InvestorNav />} />
        <Route path="/home_navbar" element={<HomepageNavbar />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />

        {/* Admin Routes */}
        <Route
          path="/admin_dashboard"
          element={[<AdminNavbar />, <AdminDashbord />]}
        />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_forgot" element={<Adminforgot />} />
        <Route
          path="/admin_dashboard/recent_investorlist"
          element={<RecentInvestorList />}
        />
        <Route
          path="/admin_dashboard/recent_mentorlist"
          element={<RecentMentorList />}
        />


        <Route path="/*" element={<h1> 404 Page Not Found</h1>} />
        <Route path="/l" element={PropertiesList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
