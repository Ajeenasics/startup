import React, { useState } from "react";
import "./LoginPageMain.css";
import Loginimage from "../../assets/Rectangle 10.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import Footer from "../../components/Footer/Footer";
import Navbar_2 from "../../components/commonNavbar/Navbar_2";

function LoginPageMain() {
  const navigate = useNavigate();

  let formvalid = true;

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const Navigate = useNavigate();

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
    errors.email = formValidating("Email", data.email);
    errors.password = formValidating("Password", data.password);
    formValid = false;
    setErrors(errors);

    if (data.email && data.password) {
      formValid = true;
    }

    if (!errors.email && !errors.password && formValid) {
      axiosInstance
        .post("/loginEntrepreneur", data)
        .then((result) => {
          if (result.data.status === 200) {
            const { data, token } = result.data;
            if (data.isActive) {
              localStorage.setItem("Enterprenuer", data._id);
              localStorage.setItem("Enterprenuertoken", token);
              localStorage.setItem("EnterprenuerCategory", data.industry_sector);
              alert("Entrepreneur Login Successfully");
              Navigate("/entrepreneur/enthomepage");
            } else {
              alert("Admin Deactivated. Please contact Admin.");
            }
          } else {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div>
      <Navbar_2 />
      <div className="container">
        <div className="text-center">
          <h4 className="mt-3 ent_mainheading">LOGIN HERE</h4>
          <h3 className="ent_sub_h3">Your Journey to Success </h3>
          <h3 className="ent_sub_h3">Starts Here</h3>
          <div className="mb-5 login_hr_line"></div>
        </div>
        <div className="row px-4">
          <div className="col ent_loginpage_img_div">
            <img className="ent_loginpage_img mb-4" src={Loginimage} />
          </div>
          <div className="col mt-5 px-5">
            <form className="ent_loginform" onSubmit={handleSubmit}>
              <label className="ent_loginpage_email_label">Your Email</label>
              <input
                type="email"
                name="email"
                onChange={change}
                className="ent_loginpage_email"
              />
              {errors.email && (
                <div className="text-danger errortext">{errors.email}</div>
              )}

              <label className="ent_loginpage_password_label">Password</label>
              <input
                type="password"
                name="password"
                onChange={change}
                className="ent_loginpage_password"
              />
              {errors.password && (
                <div className="text-danger errortext">{errors.password}</div>
              )}
              <p className="text mt-2">
                <Link to="/entrepreneur/forgot-password">Forgot password</Link>
              </p>

              <button className="ent_login_loginbtn" type="submit">
                Log In
              </button>
              <p className="mt-3">
                Please register first{" "}
                <Link to="/entrepreneur/signup">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPageMain;
