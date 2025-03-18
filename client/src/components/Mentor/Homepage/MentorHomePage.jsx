import React, {useEffect} from 'react'
import './MentorHomePage.css'
import { CommonNavbar } from '../../commonNavbar/commonNavbar'
import MentorNav from '../MentorNav/MentorNav'
import mentorHome_img from '../../../assets/mentor_home1.png'
import mentor_home2 from '../../../assets/mentor_home2.png'
import mentor_home_v1 from '../../../assets/mentor_home_v1.png'
import mentor_home_v2 from '../../../assets/mentor_home_v2.png'
import mentor_home_v3 from '../../../assets/mentor_home_v3.png'
import mentor_home_v4 from '../../../assets/mentor_home_v4.png'
import Footer from '../../Footer/Footer'
import Footer_2 from '../../Footer/Footer_2'
import { useNavigate } from 'react-router-dom'
import Footer_4 from '../../Footer/Footer_4'


function MentorHomePage() {
    const navigate =useNavigate()
    // useEffect(()=>{
    //     if(localStorage.getItem("Mentor")== null ){
    //       navigate("/");
    //     }
    //   },[navigate]);
  return (
    <>
        <CommonNavbar/>
        <MentorNav/>
        <div className='mentorHome_img'>
                <img className='homepg_img' src={mentorHome_img}/>
            </div>


            <div class="container   mt-5 mb-3">

                <div className="row mb-5">
                    <div className="col-lg-6">
                        <div class="card-data d-flex justify-content-between align-items-center mt-5">
                            <div class="info-card-outer">
                                <div className="info-card-inner d-flex align-items-center gap-4">
                                    <div class="info-icon1 d-flex justify-content-center align-items-center">
                                        <img src={mentor_home_v4} alt="" />
                                    </div>
                                    <div class="info-detail d-flex flex-column align-items-center ">
                                        <span>Subscriptions</span>
                                        <span>12345</span>
                                    </div>
                                </div>
                            </div>
                            <div class="info-card-outer">
                                <div className="info-card-inner with-white d-flex align-items-center gap-4">
                                    <div class="info-icon2 d-flex justify-content-center align-items-center">
                                        <img className='mentor_home_v1' src={mentor_home_v1} alt="" />
                                    </div>
                                    <div class="info-detail d-flex flex-column align-items-center ">
                                        <span>Tutorials</span>
                                        <span>12345</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-data d-flex justify-content-between align-items-center mt-5">
                        <div class="info-card-outer">
                                <div className="info-card-inner with-white d-flex align-items-center gap-4">
                                    <div class="info-icon2 d-flex justify-content-center align-items-center">
                                        <img className='home_handshakeimg' src={mentor_home_v3} alt="" />
                                    </div>
                                    <div class="info-detail d-flex flex-column align-items-center ">
                                        <span>Blogs</span>
                                        <span>12345</span>
                                    </div>
                                </div>
                            </div>
                            <div class="info-card-outer">
                                <div className="info-card-inner d-flex align-items-center gap-4">
                                    <div class="info-icon1 d-flex justify-content-center align-items-center">
                                        <img src={mentor_home_v2} alt="" />
                                    </div>
                                    <div class="info-detail d-flex flex-column align-items-center ">
                                        <span>Revenue</span>
                                        <span>12345</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        

                        
                                
                        
                    </div>
                    <div className="col-lg-6  ">
                        <img  src={mentor_home2} alt='' />

                    </div>
                </div>






            </div>


    <Footer_4/>
    </>
  )
}

export default MentorHomePage