import React from "react";
import "./MentorNav.css";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Frame from "../../../assets/Frame 40.png";
import { Link } from "react-router-dom";

function MentorNav() {
  const navigate = useNavigate();

  const navigateTohome = () => {
    navigate("/mentor/homepage");
  };

  const navigateToAddBlogs = () => {
    navigate("/mentor/addblogs");
  };
  const navigateToAddTutorials = () => {
    navigate("/mentor/addtutorials");
  };

  const navigateToSubscribers = () => {
    navigate("/mentor/viewsubscribers");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="men_home_nav_sticky">
        <div className="men_home_navbar_white">
          <Navbar className="px-4">
            <Navbar.Brand href="#home" className="text-light">
              <img
                src={Frame}
                className="men_home_nav_startup_logo"
                alt="StartupLogo"
              />
               {/* <h1 className='softution_logo'>Softution</h1>  */}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="px-3" onClick={navigateTohome}>
                <Link href="#Home" className="text-decoration-none">
                  <p className="navbarstext">Home</p>
                </Link>
              </Navbar.Text>

              <div class="home_dropdown px-3">
                <Navbar.Text
                  className="px-3"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Link href="#Investors" className="text-decoration-none">
                    <p className="navbarstext">Tutorials</p>
                  </Link>
                </Navbar.Text>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link to="/mentor/addtutorials" class="dropdown-item">
                      Add Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link to="/mentor/viewtutorials" class="dropdown-item">
                      View My Tutorials
                    </Link>
                  </li>
                </ul>
              </div>
              <Navbar.Text className="px-3">
                <Link to="/mentor/viewsubscribers" className="text-decoration-none">
                  <p className="navbarstext">Subscribers</p>
                </Link>
              </Navbar.Text>
              <Navbar.Text className="px-3">
                <Link to="/mentor/viewsubscribers" className="text-decoration-none">
                  <p className="navbarstext">Chat</p>
                </Link>
              </Navbar.Text>

              <div class="home_dropdown px-3">
                <Navbar.Text
                  className="px-3"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Link href="#Investors" className="text-decoration-none">
                    <p className="navbarstext">Blogs</p>
                  </Link>
                </Navbar.Text>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link to="/mentor/addblogs" class="dropdown-item">
                      Add Blogs
                    </Link>
                  </li>
                  <li>
                    <Link to="/mentor/viewblogs" class="dropdown-item">
                      View My Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              <Navbar.Text className="px-3">
                <Link
                  to="/mentor/updateprofile"
                  className="text-decoration-none"
                >
                  <p className="navbarstext">My Profile</p>
                </Link>
              </Navbar.Text>
              <Navbar.Text className="px-3" onClick={handleLogout}>
                <Link href="#Login" className="text-decoration-none">
                  <p className="navbarstext">Logout</p>
                </Link>
              </Navbar.Text>

              {/* <Navbar.Text className="px-3">
                            <Link href="#Login" className="text-decoration-none"   ><p className="navbarstext">Account Settings</p></Link>
                            </Navbar.Text> */}
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  );
}

export default MentorNav;
