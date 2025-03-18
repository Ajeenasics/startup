import React from "react";
import "./LandingPageTopNav.css";
import Navbar from "react-bootstrap/Navbar";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import Frame from "../assets/Frame 40.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import why_choose_img1 from "../assets/why_choose_img1.png";
import why_choose_img2 from "../assets/why_choose_img2.png";
import why_choose_img3 from "../assets/why_choose_img3.png";
import why_choose_img4 from "../assets/why_choose_img4.png";
import our_service_img1 from "../assets/our_service_img1.png";
import our_service_img2 from "../assets/our_service_img2.png";
import our_service_img3 from "../assets/our_service_img3.png";
import our_service_img4 from "../assets/our_service_img4.png";
import our_service_img5 from "../assets/our_service_img5.png";
import our_service_img6 from "../assets/our_service_img6.png";
import startuplog from "../assets/startuplogo.png";
import Adresslogo from "../assets/adress.png";
import Phonelogo from "../assets/phone.png";
import Twiterlogo from "../assets/twiterlogo.png";
import Facebooklogo from "../assets/facebooklogo.png";
import Linkedinlogo from "../assets/linkedinlogo.png";
// import Linkedinlogo from "..assets/linkedinlogo.png";
import Instalogo from "../assets/Group 19 (1).png";
import Emaillogo from "../assets/Vector.png";
import { useNavigate } from "react-router-dom";
import img7 from "../assets/img7.png";
import { HashLink as Link } from "react-router-hash-link";

import { CommonNavbar } from "../components/commonNavbar/commonNavbar";
import Navbar_2 from "../components/commonNavbar/Navbar_2";
function LandingPageTopNav() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/entrepreneur/login");
  };

  return (
    <>
      <CommonNavbar />

      <Navbar_2 />

      {/* <div className="sticky">
        <div className="landingtopheader">
          <div className="landingsecondheader">
            <Navbar className="px-4">
              <Navbar.Brand href="#home" className="text-light">
                <img src={Frame} alt="Frame" />
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="px-5">
                  <a href="#Home" className="text-decoration-none" ><p className="navbarstext">Home</p></a>
                </Navbar.Text>
                <Navbar.Text className="px-5">
                  <a href="#About" className="text-decoration-none" ><p className="navbarstext">About Us</p></a>
                </Navbar.Text>
                <Navbar.Text className="px-5">
                  <a href="#Services" className="text-decoration-none" ><p className="navbarstext">Services</p></a>
                </Navbar.Text>
                <Navbar.Text className="px-5" onClick={navigateToLogin}>
                <p className="navbarstext">Sign Up</p>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div> */}
      <div className="landingpagemaindiv" id="Home">
        <div className="hero_text">
          "Turning Vision into Reality: Where Innovative Ideas Meet Relentless
          Execution"
          
        </div>
      </div>
      <div className="container landingpagemainseconddiv">
        <div className="row">
          <div className="col-4 landingpagemainseconddiv1 pt-4 px-5">
            <div className="row">
              <div className="col-3 ">
                <img src={img1} alt="Happy Entrepreneurs" />
              </div>
              <div className="col-8">
                <span className="hero_span">Happy Entrepreneurs</span>
                <h4 className="hero_h4_number">12345</h4>
              </div>
            </div>
          </div>
          <div className="col-4 landingpagemainseconddiv2 pt-4 px-5">
            <div className="row">
              <div className="col-3">
                <img src={img2} alt="Services Provide" />
              </div>
              <div className="col-8">
                <span className="hero_span">Services Provide</span>
                <h4 className="hero_h4_number">12345</h4>
              </div>
            </div>
          </div>
          <div className="col-4 landingpagemainseconddiv1 pt-4 px-5">
            <div className="row">
              <div className="col-3">
                <img src={img7} alt="Branches" className="branches_img" />
              </div>
              <div className="col-8">
                <span className="hero_span">Branches</span>
                <h4 className="hero_h4_number">12345</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <div className="row" id="aboutsection">
          <div className="col-6" id="About">
            <h3 className="aboutusheading">ABOUT US</h3>
            <h2 className="aboutus_h2">
              Empowering Entrepreneurs to <br></br>Innovate and Grow
            </h2>
            <p className="mt-5 aboutus_p">
              At application, we are dedicated to empowering entrepreneurs to
              transform their innovative ideas into thriving businesses. Our
              mission is to provide comprehensive support and resources to help
              startups succeed in today's competitive landscape.
            </p>

            <div className="row pt-3">
              <h4 className="range_of_service">
                We offer a wide range of services, including:
              </h4>
              <div className="col-6 pt-2">
                <div>
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-1 range_of_service_span">
                    Startup Registration & Support
                  </span>
                </div>
                <div className="mt-4">
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-3 range_of_service_span">
                    Mentorship & Guidance
                  </span>
                </div>
                <div className="row mt-5">
                  <div className="col-3">
                    {" "}
                    <img src={img5}></img>
                  </div>
                  <div className="col-8">
                    {" "}
                    <span className="range_of_service_span">
                      Call to ask any question
                    </span>
                    <h6 className="text-info">+1234567789</h6>
                  </div>
                </div>
              </div>

              <div className="col-6 pt-2">
                <div>
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-3 range_of_service_span">
                    24/7 Support
                  </span>
                </div>
                <div className="mt-4">
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-3 range_of_service_span">
                    Investment Tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mt-5">
            <img className="about_img" src={img4}></img>
          </div>
        </div>
      </section>

      <section>
        <div className="container ">
          <div className="  text-center">
            <h4 className="  mt-5 pt-5 mainheadings"> WHY CHOOSE US</h4>
            <h3 className="why_choose_sub_h3">We Are Here to Grow Your </h3>
            <h3 className="why_choose_sub_h3">Business Exponentially</h3>
            <div className="  mb-5  hr_line "></div>
          </div>
          <div className="row">
            <div className="col">
              <img src={why_choose_img1} className="why_choose_img"></img>
              <h4 className="why_choose_heading">
                Startup Registration & Support
              </h4>
              <p className="why_choose_p">
                Guiding you through the process of establishing and legally
                structuring your business.
              </p>
              <img className="mt-5 why_choose_img" src={why_choose_img3}></img>
              <h4 className="why_choose_heading">Mentorship & Guidance</h4>
              <p className="why_choose_p">
                Connecting you with experienced mentors who offer valuable
                insights and advice to navigate the challenges of
                entrepreneurship.
              </p>
            </div>
            <div className="col">
              <img src={img6}></img>
            </div>
            <div className="col">
              <img src={why_choose_img2} className="why_choose_img"></img>
              <h4 className="why_choose_heading">Investment Tracking</h4>
              <p className="why_choose_p">
                Helping you monitor and manage your investments to maximize
                growth and profitability.
              </p>
              <img className="mt-5 why_choose_img" src={why_choose_img4}></img>
              <h4 className="why_choose_heading">24/7 Support</h4>
              <p className="why_choose_p">
                Providing round-the-clock assistance to ensure your startup's
                needs are met at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="Services">
        <div className="container ">
          <div className="  text-center">
            <h4 className=" mt-5 pt-5 mainheadings ">OUR SERVICES</h4>
            <h3 className="our_service_sub_h3">Bridging the Gap Between </h3>
            <h3 className="our_service_sub_h3">Ideas and Success</h3>
            <div className="  mb-5  hr_line "></div>
          </div>
          <div className="row text-center">
            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img1} className="our_service_img"></img>
              <h6 className="our_service_heading">Security and Privacy</h6>
              <p className="our_service_p">
                We prioritize the safety and confidentiality of your data,
                ensuring robust security measures to protect your business.
              </p>
            </div>
            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img2} className="our_service_img"></img>
              <h6 className="our_service_heading">Analytics and Reporting</h6>
              <p className="our_service_p">
                Gain valuable insights with our comprehensive analytics and
                reporting tools, designed to drive informed decision-making.
              </p>
            </div>

            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img3} className="our_service_img"></img>
              <h6 className="our_service_heading">Entrepreneur Guidance</h6>
              <p className="our_service_p">
                Receive expert guidance tailored to your unique entrepreneurial
                journey, helping you navigate challenges and seize
                opportunities.
              </p>
            </div>
          </div>

          <div className="row  text-center">
            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img6} className="our_service_img"></img>
              <h6 className="our_service_heading">Direct Communication</h6>
              <p className="our_service_p">
                Maintain clear and effective communication channels, fostering
                seamless collaboration and efficient problem-solving.
              </p>
            </div>
            <div className="col-3 p-5 m-5 our_service_card">
              <img src={our_service_img5} className="our_service_img"></img>
              <h6 className="our_service_heading">Investment Tracking</h6>
              <p className="our_service_p">
                Monitor and manage your investments with precision, optimizing
                your financial strategies for maximum growth.
              </p>
            </div>

            <div className="col-3 p-5 m-5 our_service_card">
              <img src={our_service_img4} className="our_service_img"></img>
              <h6 className="our_service_heading">Investment Opportunities</h6>
              <p className="our_service_p">
                Explore and capitalize on lucrative investment opportunities to
                fuel your business expansion and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div class="firstcolumn ">
          <img className="startuplogo" src={startuplog} />
          {/* <h1 className="foot_softution_logo ">Softution</h1> */}
          <p className="firstcolumnpara ">
            we combine technical expertise with creative thinking to deliver
            innovative solutions that exceed our clients' expectations. We take
            a collaborative approach to every project, working closely with our
            clients to understand their unique goals and challenges and tailor
            our solutions to meet their specific needs.
          </p>
        </div>
        <div className="footerbg ">
          <div className="foot">
            <div class="row  pt-4 ">
              <div class="col-3 secondcolumn  ">
                <div>
                  <div className="text-center">
                    <h1 className="secondcolumncontent text-center">
                      Get In Touch
                    </h1>
                    <div className=" mb-3 footer_hr_line1"></div>
                    <div>
                      <div className="secondcolumnadress  ">
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
                    <h1 className="secondcolumncontent text-center">
                      Quick Links
                    </h1>
                    <div className=" mb-3 footer_hr_line2"></div>
                    <div>
                      <div className="thirdcolumnadress">
                        <ul className="footer-list">
                          <li>
                            <Link smooth to="/#Home">
                              Home
                            </Link>
                          </li>
                          <li>
                            {" "}
                            <Link smooth to="/#aboutsection">
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link smooth to="/#Services">
                              Services
                            </Link>
                          </li>
                          <li>
                            <Link smooth to="/#Home">
                              Sign In
                            </Link>
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
                    <h1 className="secondcolumncontent text-center">
                      Popular Links
                    </h1>
                    <div className=" mb-3 footer_hr_line3"></div>
                    <div>
                      <div className="thirdcolumnadress">
                        <ul className="footer-list">
                          <li>
                            <Link smooth to="/#Home">
                              Home
                            </Link>
                          </li>
                          <li>
                            {" "}
                            <Link smooth to="/#aboutsection">
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link smooth to="/#Services">
                              Services
                            </Link>
                          </li>
                          <li>
                            <Link smooth to="/#Home">
                              Sign In
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footerbotomset">
            <p className="botomcontent">
              All Rights Reserved. Designed by Student
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPageTopNav;
