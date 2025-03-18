import React from "react";
import AdminLoginimg from "../../assets/Forgot password-rafiki (1) 1.png";
import { Link } from "react-router-dom";
function Adminforgot() {

  
  return (
    <div className="">
      <div className="Adminloginmain p-5">
        <div className="row container pt-3">
          <div className="col">
            <div>
              <div className="adminloginform">
                <form>
                  <div className="">
                    <label for="exampleInputEmail1" className="form-label ">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="adminlogininput"
                      aria-describedby="emailHelp"
                    ></input>

                    <label for="exampleInputEmail1" className="form-label mt-4">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control "
                      id="adminlogininput"
                      aria-describedby="emailHelp"
                    ></input>

                    <label for="exampleInputEmail1" className="form-label mt-4">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control "
                      id="adminlogininput"
                      aria-describedby="emailHelp"
                    ></input>
                  </div>
                  <div className="row text-center mt-5">
                    <div className="col">
                      {" "}
                      <button
                        type="submit"
                        className="btn btn-primary px-4 py-2"
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className="col">
                      {" "}
                      <button
                        type="submit"
                        className="btn btn-primary px-5 py-2"
                      >
                        <Link className="text-light text-decoration-none" to="/admin_login">Cancel</Link>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col">
            <img className="w-100 ms-4" src={AdminLoginimg}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminforgot;
