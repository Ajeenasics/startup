import React from 'react'
import './Services.css'
import our_service_img1 from "../../assets/our_service_img1.png";
import our_service_img2 from "../../assets/our_service_img2.png";
import our_service_img3 from "../../assets/our_service_img3.png";
import our_service_img4 from "../../assets/our_service_img4.png";
import our_service_img5 from "../../assets/our_service_img5.png";
import our_service_img6 from "../../assets/our_service_img6.png";
import Navbar_2 from '../../components/commonNavbar/Navbar_2';
import Footer from '../../components/Footer/Footer';
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar';


function Services() {
  return (
    <>
    <CommonNavbar/>
    <Navbar_2/>
    <section id="Services">
        <div className="container">
          <div className="  text-center">
            <h4 className="mt-2 mainheadings ">OUR SERVICES</h4>
            <h3 className="our_service_sub_h3">Bridging the Gap Between </h3>
            <h3 className="our_service_sub_h3">Ideas and Success</h3>
            <div className="  mb-5  service_hr_line "></div>
          </div>
          <div className="row text-center">
            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img1} className="our_service_img"></img>
              <h6 className="our_service_heading">Security and Privacy</h6>
              <p className="our_service_p">
              We prioritize the safety and confidentiality of your data, ensuring robust security measures to protect your business.
              </p>
            </div>
            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img2} className="our_service_img" ></img>
              <h6 className="our_service_heading">Analytics and Reporting</h6>
            <p className="our_service_p">
              Gain valuable insights with our comprehensive analytics and reporting tools, designed to drive informed decision-making.
              </p>
            </div>

            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img3} className="our_service_img"></img>
              <h6 className="our_service_heading">Entrepreneur Guidance</h6>
              <p className="our_service_p">
              Receive expert guidance tailored to your unique entrepreneurial journey, helping you navigate challenges and seize opportunities.
              </p>
          </div>
          </div>

          <div className="row  text-center">
            <div className="col p-5 m-5 our_service_card">
              <img src={our_service_img6} className="our_service_img"></img>
              <h6 className="our_service_heading">Direct Communication</h6>
              <p className="our_service_p">
              Maintain clear and effective communication channels, fostering seamless collaboration and efficient problem-solving.
              </p>
            </div>
            <div className="col-3 p-5 m-5 our_service_card">
              <img src={our_service_img5} className="our_service_img"></img>
              <h6 className="our_service_heading">Investment Tracking</h6>
              <p className="our_service_p">
              Monitor and manage your investments with precision, optimizing your financial strategies for maximum growth.
              </p>
            </div>
            
            <div className="col-3 p-5 m-5 our_service_card">
              <img src={our_service_img4} className="our_service_img"></img>
              <h6 className="our_service_heading">Investment Opportunities</h6>
              <p className="our_service_p">
              Explore and capitalize on lucrative investment opportunities to fuel your business expansion and success.
              </p>
              
            </div>
          
        </div>
        
      </div>
      
      </section>
      <Footer/>
    </>
  )
}

export default Services