import React, { useState } from "react";
import Forgotpasswordimage from "../../assets/ForgotPassword.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import Navbar_2 from "../commonNavbar/Navbar_2";
import Footer from "../Footer/Footer";

function Mentorforgotpswd() {

    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: "",
      });
    
      const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmpassword: "",
      });
    
      const navigate = useNavigate();
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({
          ...data,
          [name]: value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      };
    
      const handleCancel = () => {
        navigate("/mentor/login");
      };
    
      const handleClick = (e) => {
        e.preventDefault();
        let validationErrors = {};
        let formValid = true;
    
        if (!data.email.trim()) {
          formValid = false;
          validationErrors.email = "Email is required";
        }
    
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
        if (!data.password.trim()) {
          formValid = false;
          validationErrors.password = "Password is required";
        } else if (!passwordRegex.test(data.password)) {
          formValid = false;
          validationErrors.password =
            "Password must contain at least one number, one special character, and one capital letter";
        }
    
        if (!data.confirmpassword.trim()) {
          formValid = false;
          validationErrors.confirmpassword = "Confirm Password is required";
        } else if (data.confirmpassword !== data.password) {
          formValid = false;
          validationErrors.confirmpassword = "Passwords do not match";
        }
    
        setErrors(validationErrors);
    
        if (formValid) {
          axiosInstance
            .post("/forgotPasswordMentors", data)
            .then((result) => {
              console.log(result);
              alert(result.data.msg);
              navigate("/mentor/login");
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data.msg);
            });
        }
      };
    
  return (
    <div> <div>
    <Navbar_2 />
    <div className="container ">
      <div className="text-center ">
        <h4 className="mt-3 ent_forgot_mainheading">FORGOT PASSWORD</h4>
        <h3 className="ent_forgot_sub_h3">Recover Your Account </h3>
      </div>
      <div className="row">
        <div className="col ent_forgot_img_div">
          <img className="ent_forgot_img mb-4" src={Forgotpasswordimage} alt="Forgot Password" />
        </div>
        <div className="col mt-5 px-5">
          <form className="ent_forgot_form">
            <label className="ent_forgot_email_label">Your Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="ent_forgot_email"
              value={data.email}
            />
            {errors.email && (
              <div className="text-danger errortext">{errors.email}</div>
            )}
            <label className="ent_forgot_password_label">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className="ent_forgot_password"
              value={data.password}
            />
            {errors.password && (
              <div className="text-danger errortext">{errors.password}</div>
            )}
            <label className="ent_forgot_cpassword_label">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              onChange={handleInputChange}
              className="ent_forgot_cpassword"
              value={data.confirmpassword}
            />
            {errors.confirmpassword && (
              <div className="text-danger errortext">
                {errors.confirmpassword}
              </div>
            )}
            <div className="row">
              <div className="col">
                <button
                  className="ent_forgot_resetbtn"
                  type="submit"
                  onClick={handleClick}
                >
                  Reset Password
                </button>
              </div>
              <div className="col">
                <button
                  className="ent_forgot_canclebtn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div></div>
  )
}

export default Mentorforgotpswd