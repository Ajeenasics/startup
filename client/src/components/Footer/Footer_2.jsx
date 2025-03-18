import React from "react";
import "./Footer_2.css";
import startuplog from "../../assets/startuplogo.png";
import Adresslogo from "../../assets/adress.png";
import Phonelogo from "../../assets/phone.png";
import Arrowlogo from "../../assets/arrowlogo.png";
import Twiterlogo from "../../assets/twiterlogo.png";
import Facebooklogo from "../..//assets/facebooklogo.png";
import Linkedinlogo from "../../assets/linkedinlogo.png";
import Instalogo from "../../assets/Group 19 (1).png";
import Emaillogo from "../../assets/Vector.png";
import { Link } from "react-router-dom";

function Footer_2() {
  return (
    <div>
      <div class="foot2_firstcolumn ">
        <img className='foot2_startuplogo' src={startuplog} /> 
        {/* <h1 className="foot_softution_logo ">Softution</h1> */}
        <p className="foot2_firstcolumnpara ">
          we combine technical expertise with creative thinking to deliver
          innovative solutions that exceed our clients' expectations. We take a
          collaborative approach to every project, working closely with our
          clients to understand their unique goals and challenges and tailor our
          solutions to meet their specific needs.
        </p>
      </div>
      <div className="footer2bg ">
        <div className="foot_2">
          <div class="row  pt-4 ">
            <div class="col-3 foot2_secondcolumn ">
              <div>
                <div className="text-center">
                  <h1 className="foot2_secondcolumncontent">Get In Touch</h1>
                  <div className=" mb-3 footer_hr_line1"></div>
                  <div>
                    <div className="foot2_secondcolumnadress  ">
                      <div>
                        <img className="px-1" src={Adresslogo} />
                        <span>123 Street, New York,USA</span>
                      </div>
                      <div className="pt-3">
                        <img className="px-2 email_footer" src={Emaillogo} />
                        <span>info@example.com</span>
                      </div>
                      <div className="pt-3">
                        <img className="px-2" src={Phonelogo} />
                        <span>+012 345 67890</span>
                      </div>
                      <div className="mt-2 mx-2">
                        <Link
                          to="https://x.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img className="me-1" src={Twiterlogo} />
                        </Link>
                        <Link
                          to="https://www.facebook.com/login.php/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img className="me-1" src={Facebooklogo} />
                        </Link>
                        <Link
                          to="https://www.linkedin.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img className="" src={Linkedinlogo} />
                        </Link>
                        <Link
                          to="https://www.instagram.com/accounts/login/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img className="" src={Instalogo} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div>
                <div>
                  <h1 className="foot2_secondcolumncontent text-center">
                    Quick Links
                  </h1>
                  <div className=" mb-3 footer_hr_line2"></div>
                  <div>
                    <div className="foot2_thirdcolumnadress">
                      <ul className="footer2-list">
                        <li>
                          <Link to="/entrepreneur/enthomepage">Home</Link>
                        </li>
                        <li>
                          <Link to="/entrepreneur/viewallinvester">
                            Investors
                          </Link>
                        </li>
                        <li>
                          <Link to="/entrepreneur/viewmentors">Mentors</Link>
                        </li>
                        <li>
                          <Link to="/entrepreneur/viewstartup_plan">
                            Startup Plan
                          </Link>
                        </li>
                        <li>
                          <Link to="/entrepreneur/entprofile">My Profile</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div>
                <div>
                  <h1 className="foot2_secondcolumncontent text-center">
                    Popular Links
                  </h1>
                  <div className=" mb-3 footer_hr_line3"></div>
                  <div>
                    <div className="thirdcolumnadress">
                      <ul className="footer2-list">
                        <ul className="footer2-list">
                          <li>
                            <Link to="/entrepreneur/enthomepage">Home</Link>
                          </li>
                          <li>
                            <Link to="/entrepreneur/viewallinvester">
                              Investors
                            </Link>
                          </li>
                          <li>
                            <Link to="/entrepreneur/viewmentors">Mentors</Link>
                          </li>
                          <li>
                            <Link to="/entrepreneur/viewstartup_plan">
                              Startup Plan
                            </Link>
                          </li>
                          <li>
                            <Link to="/entrepreneur/entprofile">
                              My Profile
                            </Link>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="foor2_footerbotomset">
          <p className="foot2_botomcontent">
            All Rights Reserved. Designed by Student
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer_2;
