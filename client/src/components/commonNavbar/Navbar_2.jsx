import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Frame from "../../assets/Frame 40.png";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Navbar_2.css'


function Navbar_2() {

    const navigate = useNavigate();

    const navigateToHome = () => {
      navigate("/");
    }
    const navigateToAboutUs = () => {
      navigate("/aboutus");
    }
    const navigateToServices = () => {
      navigate("/services");
    }
    const navigateToEntLogin = () => {
      navigate("/entrepreneur/login");
    }
    const navigateToInvLogin = () => {
      navigate("/investor/login");
    }
    const navigateToMenLogin = () => {
      navigate("/mentor/login");
    }

    

  
  return (
    <>
    <div className="nav_sticky">
        <div className="nav_topheader">
          <div className="nav_secondheader">
            <Navbar className="px-4">
              <Navbar.Brand href="#home" className="text-light">
                <img className='nav_img' src={Frame} alt="Frame" /> 
                 {/* <h1 className='softution_logo'>Softution</h1>  */}
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="px-5" onClick={navigateToHome}>
                  <Link  className="text-decoration-none" >
                    <p className="navbarstext">Home</p>
                  </Link>
                </Navbar.Text>
                <Navbar.Text className="px-5" onClick={navigateToAboutUs}>
                  <Link className="text-decoration-none">
                    <p className="navbarstext">About Us</p>
                  </Link>
                </Navbar.Text>
                <Navbar.Text className="px-5" onClick={navigateToServices}>
                  <Link className="text-decoration-none">
                    <p className="navbarstext">Services</p>
                  </Link>
                  </Navbar.Text>
                <Navbar.Text className="px-5" >
                <div className="dropdown">
                  <button className="dropbtn">Sign In</button>
                  <div className="dropdown-content">
                    <Navbar.Text  onClick={navigateToEntLogin}><Link>Entrepreneur</Link></Navbar.Text>
                    <Navbar.Text  onClick={navigateToInvLogin}><Link>Investor</Link></Navbar.Text>
                    <Navbar.Text  onClick={navigateToMenLogin}><Link>Mentor</Link></Navbar.Text>
                  </div>
                </div>
                  </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar_2