import React from 'react'
import './AboutUs.css'
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import Navbar_2 from '../../components/commonNavbar/Navbar_2';
import Footer from '../../components/Footer/Footer';
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar';


function AboutUs() {
  return (
    <>
    <CommonNavbar/>
    <Navbar_2/>
        <section className="container mb-5">
        <div className="row" id="aboutsection">
          <div className="col-6" id="About">
            <h3 className="aboutusheading">ABOUT US</h3>
            <h2 className="aboutus_h2">
              Empowering Entrepreneurs to <br></br>Innovate and Grow
            </h2>
            <p className="mt-5 aboutus_p">
            At application, we are dedicated to empowering entrepreneurs to transform their innovative ideas into thriving businesses. Our mission is to provide comprehensive support and resources to help startups succeed in today's competitive landscape.
            </p>

            <div className="row pt-3">
              <h4 className="range_of_service">We offer a wide range of services, including:</h4>
              <div className="col-6 pt-2">
                <div>
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-1 range_of_service_span">Startup Registration & Support</span>
                </div>
                <div className="mt-4">
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-3 range_of_service_span">Mentorship & Guidance</span>
                </div>
                <div className="row mt-5">
                  <div className="col-3">
                    {" "}
                    <img src={img5}></img>
                  </div>
                  <div className="col-8">
                    {" "}
                    <span className="range_of_service_span">Call to ask any question</span>
                    <h6 className="text-info">+1234567789</h6>
                  </div>
                </div>
              </div>

              <div className="col-6 pt-2">
                <div>
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-3 range_of_service_span">24/7 Support</span>
                </div>
                <div className="mt-4">
                  {" "}
                  <img src={img3} className="range_of_service_img"></img>
                  <span className="ms-3 range_of_service_span">Investment Tracking</span>
                </div>
              </div>
              
            </div>  
         
          
        </div>
        <div className="col-6 mt-5">
            <img className="about_img" src={img4}></img>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default AboutUs