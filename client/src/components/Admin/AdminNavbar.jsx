import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Frame from "../../assets/Frame 40.png";
import home from "../../assets/home.png";
import home1 from "../../assets/Vector (1).png";
import home2 from "../../assets/fluent-mdl2_blog.png";
import home3 from "../../assets/hugeicons_alms.png";
import home4 from "../../assets/hugeicons_complaint.png";
import home5 from "../../assets/hugeicons_mentoring.png";
import home6 from "../../assets/man.png";
import home7 from "../../assets/line-md_log-out.png";
import { Link, useNavigate } from "react-router-dom";
function AdminNavbar() {
  const navigate = useNavigate();
  const AdminLogout = () => {
    alert("please login again !");
    navigate("/admin_login");
  };
  return (
    <div>
      <div className="nav_sticky">
        <Navbar className="px-4">
          <img className="nav_img" src={Frame} alt="Frame" />
          {/* <h1 className='softution_logo'>Softution</h1>  */}

          <Navbar.Toggle />
        </Navbar>
        <hr></hr>
      </div>
      <div className="container">
        <nav>
          <div className="">
            <Link
              to="/admin_dashboard"
              className=" text-dark text-decoration-none  mx-4"
            >
              <img src={home}></img> Home
            </Link>
            
            <Link
              to="/admin_dashboard/admin_vieweventlist"
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home1}></img> Events
              
              
            </Link>
            
            <Link
              to="/admin_dashboard/viewentrepreneurlist"
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home6}></img> Entrepreneurs
            </Link>
            <Link
              to="/admin_dashboard/investorlist"
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home3}></img> Investors
            </Link>
            <Link
              to="/admin_dashboard/mentorlist"
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home5}></img> Mentors
            </Link>
            <Link
              to="/admin_dashboard/viewallcomplaints"
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home4}></img> Complaints
            </Link>
            <Link
              to="/admin_dashboard/viewbloglist"
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home2}></img> Blogs
            </Link>
            <a
              onClick={AdminLogout}
              className=" text-dark text-decoration-none mx-4"
            >
              <img src={home7}></img> Logout
            </a>
          </div>
        </nav>
      </div>{" "}
      <hr></hr>
    </div>
  );
}

export default AdminNavbar;
