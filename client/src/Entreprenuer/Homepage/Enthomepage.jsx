import React,{useEffect} from 'react'
import './Enthomepage.css'
import homecolumnimage from '../../assets/unsplash_gMsnXqILjp4.png'
import personimg from '../../assets/person.png'
import handshakeimg from '../../assets/handshake.png'
import smallarrow from '../../assets/smallarrow.png'
import phonelogo from '../../assets/phone.png'
import backphone from '../../assets/img5.png'
import arrow from '../../assets/arrowlogo.png'
import homepage_img from '../../assets/home_hero_img.png'
import HomepageNavbar from '../../components/commonNavbar/HomepageNavbar'
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar'
import Footer_2 from '../../components/Footer/Footer_2'
import { useNavigate ,Link} from 'react-router-dom'

function Enthomepage() {
    const navigate =useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("Enterprenuertoken")== null && localStorage.getItem("Enterprenuer") == null ){
          navigate("/");
        }
      },[navigate]);
    return (
        <>
            <CommonNavbar/>
            <HomepageNavbar/>   
            <div className='Enthomebgimage'>
                <img className='new_homepg_img w-100 h-100 object-fit-cover' src={homepage_img}/>
            </div>


            <div class="container   mt-5 mb-3">

                <div className="row">
                    <div className="col-lg-6">
                        <div class="card-data d-flex justify-content-between align-items-center">
                            <div class="info-card-outer">
                                <div className="info-card-inner d-flex align-items-center gap-4">
                                    <div class="info-icon1 d-flex justify-content-center align-items-center">
                                        <img src={personimg} alt="" />
                                    </div>
                                    <div class="info-detail d-flex flex-column align-items-center ">
                                        <span>Top Mentors</span>
                                        <span>12345</span>
                                    </div>
                                </div>
                            </div>
                            <div class="info-card-outer">
                                <div className="info-card-inner with-white d-flex align-items-center gap-4">
                                    <div class="info-icon2 d-flex justify-content-center align-items-center">
                                        <img className='home_handshakeimg' src={handshakeimg} alt="" />
                                    </div>
                                    <div class="info-detail d-flex flex-column align-items-center ">
                                        <span>Top Investors</span>
                                        <span>12345</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between  mt-4 '>
                            <div className='d-flex entsmallarowgap'>
                                <div><img src={smallarrow} alt='' /></div>
                                <h6 className='home_reply24'>Reply within 24 hours</h6>
                            </div>
                            <div className='d-flex entsmallarowgap'>
                                <div><img src={phonelogo} alt='' /></div>
                                <h6 className='home_24telephone'>24 hrs telephone support</h6>
                            </div>
                        </div>

                        <div className='mt-4 homepg_content'>
                            <p>Entrepreneur is your ultimate resource for everything related to starting, growing,
                                and managing your business. Whether you are a seasoned entrepreneur or just
                                beginning your journey, our platform offers a wealth of information, tools,
                                and inspiration to help you succeed.</p>
                        </div>

                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <div className='d-flex align-items-center phonelogospace'>
                                <div><img src={backphone}/></div>
                                <div className='d-flex flex-column'>
                                    <h6>Call to ask any question</h6>
                                    <a href="tel:">+012 345 6789</a>
                                </div>
                            </div>
                            <div>
                                <Link to="/entrepreneur/viewmentors">
                                    <span>View Top Mentors  <img src={arrow} alt="" /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6  ">
                        <img src={homecolumnimage} alt='' />

                    </div>
                </div>






            </div>





        <Footer_2/>
        </>
    )
}

export default Enthomepage
