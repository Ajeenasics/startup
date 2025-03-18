import React from 'react'
import './InvestorNav.css'
import Navbar from "react-bootstrap/Navbar";
import Frame from "../../../assets/Frame 40.png";
import { Link, useNavigate } from 'react-router-dom';

function InvestorNav() {
  const navigate =useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
        <div className="inv_home_nav_sticky">
        <div className="inv_home_navbar_white">
                <Navbar className="px-4">
                        <Navbar.Brand href="#home" className="text-light">
                             <img src={Frame} className="inv_home_nav_startup_logo" alt="StartupLogo" />
                        </Navbar.Brand>
                        {/* <h1 className='softution_logo'>Softution</h1>  */}
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className="px-3" >
                            <Link to='/investor/homepage' className="text-decoration-none" ><p className="navbarstext">Home</p></Link>
                            </Navbar.Text>
                            

                            <div class="home_dropdown">
                                <Navbar.Text className="px-3" id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false" >
                                    <Link href="#Investors" className="text-decoration-none" ><p className="navbarstext">Startup Ideas</p></Link>
                                </Navbar.Text>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link to='/investor/entrepreneur_reqlist' class="dropdown-item" >New Plan Requests</Link></li>
                                    <li><Link to='/investor/accepted_entrepreneur' class="dropdown-item" >View my Entrepreneurs</Link></li>
                                </ul>
                                </div>
                                <Navbar.Text className="px-3" >
                                <Link to={"/investor/accepted_entrepreneur"} className="text-decoration-none" ><p className="navbarstext">Chat</p></Link>
                                </Navbar.Text>
                            <Navbar.Text className="px-3" >
                            <Link to={"/investor/addcomplaint"} className="text-decoration-none" ><p className="navbarstext">Complaints</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" >
                            <Link to='/investor/updateprofile' className="text-decoration-none" ><p className="navbarstext">My Profile</p></Link>
                            </Navbar.Text>
                            <Navbar.Text className="px-3" onClick={handleLogout} >
                            <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext">Logout</p></Link>
                            </Navbar.Text>
                            
                        </Navbar.Collapse>
                </Navbar>
            
        </div>
    </div>
    </>
  )
}



export default InvestorNav

{/* <Navbar.Text className="px-3" >
                            <Link to={"/investor/entrepreneur_reqlist"} className="text-decoration-none" ><p className="navbarstext">Chat</p></Link>
                            </Navbar.Text> */}
                           
                            // <Navbar.Text className="px-3" >
                            // <Link href="#Mentors" className="text-decoration-none" ><p className="navbarstext">Chat</p></Link>
                            // </Navbar.Text>
                            // <Navbar.Text className="px-3" >
                            // <Link href="#Mentors" className="text-decoration-none" ><p className="navbarstext">Investments</p></Link>
                            // </Navbar.Text>
                            // <Navbar.Text className="px-3" >
                            // <Link href="#MyProfile" className="text-decoration-none" ><p className="navbarstext">Settings</p></Link>
                            // </Navbar.Text>
