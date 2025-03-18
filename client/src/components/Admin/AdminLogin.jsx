import { useState } from "react";
import AdminLoginimg from "../../assets/undraw_secure_login_pdn4 1.png";
import Frame from "../../assets/Frame 40.png";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const Adminemail = "admin@gmail.com";
  const Adminpassword = "Admin@123";

  const change = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  console.log(loginData, "loginData");
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
      if (loginData.email === Adminemail) {
        if (loginData.password === Adminpassword) {
          localStorage.setItem("admin", "admin123");
          alert("Admin Login successfully ");
          navigate("/admin_dashboard");
        } else {
          alert("Password is incorrect");
        }
      } else {
        alert("Incorrect Email ID");
      }
    }
  };

  return (
    <div className="Adminloginmain p-5">
      <div className="row container ">
        <div className="col">
          <div>
            <div className="text-center">
               <img className="nav_img" src={Frame} alt="Frame" />
             {/* <h1 className="softution_logo">Softution</h1>  */}
            </div>
            <div className="adminloginform">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="text-center">Login to your account</div>
                  <label className="form-label mt-5">Email</label>
                  <input
                    name="email"
                    onChange={change}
                    type="email"
                    className="form-control"
                    id="adminlogininput"
                    aria-describedby="emailHelp"
                  ></input>
                  {errors.email && (
                    <div className="text-danger errortext">{errors.email}</div>
                  )}

                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="adminlogininput"
                    aria-describedby="emailHelp"
                    name="password"
                    onChange={change}
                  ></input>
                  {errors.password && (
                    <div className="text-danger errortext">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col">
          <img className="w-100 m-5" src={AdminLoginimg} alt="Admin Login" />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
