import React, { useState } from 'react'
import './InvestorLogin.css'
import InvesterLoginImg from '../../../assets/investor_login.png'
import { Link } from "react-router-dom";
import Footer from '../../Footer/Footer';
import Navbar_2 from '../../commonNavbar/Navbar_2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';

function InvestorLogin() {
  const navigate = useNavigate();

  const [loginData, SetloginData] = useState({email:"",password:""});
  const [errors, setErrors] = useState({email:"",password:""});

  const change = (e) => {
    const {name, value} = e.target;
    SetloginData({...loginData, [name]:value});
  };

  const formValidating = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    if (fieldName === "Email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address";
    }
    if (fieldName === "Password") {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(value)) {
        return "Password must contain at least one number, one special character, and one capital letter";
      }
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formValid = true;
    errors.email = formValidating("Email", loginData.email);
    errors.password = formValidating("Password", loginData.password);
    formValid = false;
    setErrors(errors);

    if (loginData.email && loginData.password) {
      formValid = true;
    }

    if (!errors.email && !errors.password && formValid) {
      axiosInstance.post("/loginInvestor", loginData)
        .then((result) => {
          if (result.data.status === 200) {
            const { data, token } = result.data;
            if (data.isActive) {
              if (data.adminApproved) {
                localStorage.setItem("Investor", data._id);
                localStorage.setItem("InvestorToken", token);
                localStorage.setItem("InvestorCategory", data.investing_category);
                alert("Investor Login Successfully");
                navigate("/investor/homepage");
              } else {
                alert("Admin Not approved");
              }
            } else {
              alert("Admin Deactivated. Please contact Admin.");
            }
          } else {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  return (
    <>
      <Navbar_2/>
      <div className="container">
        <div className="text-center">
          <h4 className="mt-3 inv_mainheading">INVESTOR LOGIN</h4>
          <h3 className="inv_sub_h3">Your Journey to Success</h3>
          <h3 className="inv_sub_h3">Starts Here</h3>
          <div className="mb-5 inv_hr_line"></div>
        </div>
        <div className='row px-2'>
          <div className="col inv_login_img_div">
            <img className="inv_login_img mb-4" src={InvesterLoginImg} />
          </div>
          <div className='col mt-5 px-5'>
            <form className="inv_loginform" onSubmit={handleSubmit}>
              <label className="inv_login_email_label">Your Email</label>
              <input
                type="email"
                name="email"
                onChange={change}
                className="inv_login_email"
              />
              {errors.email && (<div className='text-danger errortext'>{errors.email}</div>)}
              <label className="inv_login_password_label">Password</label>
              <input
                type="password"
                name="password"
                onChange={change}
                className="inv_login_password"
              />
              {errors.password && (<div className='text-danger errortext'>{errors.password}</div>)}
              <p className="text mt-2"><Link to="/investor/forgot-password">Forgot password</Link></p>
              <button className="inv_login_loginbtn">Log In</button>
              <p className="mt-3"> 
                Please register first <Link to="/investor/signup">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default InvestorLogin;
