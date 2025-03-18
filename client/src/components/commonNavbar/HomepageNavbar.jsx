import React from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Frame from "../../assets/Frame 40.png";
import './HomepageNavbar.css'
import { Link } from 'react-router-dom';
import { MdOutlineSupportAgent } from "react-icons/md";

function HomepageNavbar() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/entrepreneur/enthomepage");
    };
    const navigateToInvestors = () => {
        navigate("/entrepreneur/viewallinvester");
    };
    const navigateToMentors = () => {
        navigate("/entrepreneur/viewmentors");
    };
   
    const navigateToMyProfile = () => {
        navigate("/entrepreneur/entprofile");
    };

       const navigateToSubscribed = () => {
        navigate("/entrepreneur/mentorsubscribedlist");
    };

    const navigateToComplaints = () => {
        navigate("/entrepreneur/addcomplaint");
    };
    const navigateToEvents = () => {
        navigate("/entrepreneur/viewevents");
    };
    const navigateTochat = () => {
        navigate("/entrepreneur/chat");
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
      };
  return (
    <>
        <div className="home_nav_sticky">
        <div className="home_navbar_white">
                <Navbar className="px-4">
                        <Navbar.Brand href="#home" className="text-light">
                           <img src={Frame} className="home_nav_startup_logo" alt="StartupLogo" /> 
                             {/* <h1 className='softution_logo'>Softution</h1> */}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className="px-3" onClick={navigateToHome}>
                            <Link href="#Home" className="text-decoration-none" ><p className="navbarstext">Home</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" onClick={navigateToInvestors}>
                            <Link href="#Investors" className="text-decoration-none" ><p className="navbarstext">Investors</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" onClick={navigateToMentors}>
                            <Link href="#Mentors" className="text-decoration-none" ><p className="navbarstext">Mentors</p></Link>
                            </Navbar.Text>
                            <div class="home_dropdown">
                                <Navbar.Text className="px-3" id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false" >
                                    <Link href="#Investors" className="text-decoration-none" ><p className="navbarstext">Startup Plan</p></Link>
                                </Navbar.Text>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link to='/entrepreneur/pitch-my-idea' class="dropdown-item" >Add New Plans</Link></li>
                                    <li><Link to='/entrepreneur/viewstartup_plan' class="dropdown-item" >View Plans</Link></li>
                                    <li><Link to='/entrepreneur/requestinvestor' class="dropdown-item" >My Investors</Link></li>
                                    <li><Link to='/entrepreneur/viewstartup_plan/status' class="dropdown-item" >Request Status</Link></li>
                                </ul>
                                </div>
                                <Navbar.Text className="px-3" onClick={navigateToEvents}>
                            <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext">Events</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" onClick={navigateToComplaints}>
                            <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext">Complaints</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" onClick={navigateToSubscribed}>
                            <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext">Subscribed</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" onClick={navigateToMyProfile}>
                            <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext">My Profile</p></Link>
                            </Navbar.Text>

                            <Navbar.Text className="px-3" onClick={navigateTochat}>
                            <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext fs-4"><MdOutlineSupportAgent /></p></Link>
                            </Navbar.Text>

                            <Navbar.Text className="px-3">
                            <Link href="#Login" className="text-decoration-none" to={'/'} onClick={handleLogout} ><p className="navbarstext">Logout</p></Link>
                            </Navbar.Text>
                            
                        </Navbar.Collapse>
                </Navbar>
            
        </div>
    </div>
    </>
  )
}

export default HomepageNavbar