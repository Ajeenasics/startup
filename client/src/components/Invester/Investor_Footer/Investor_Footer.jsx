import React from 'react'
import "../../Footer/Footer_2.css";
import startuplog from "../../../assets/startuplogo.png";
import Adresslogo from "../../../assets/adress.png"
import Phonelogo from "../../../assets/phone.png"
import Arrowlogo from "../../../assets/arrowlogo.png"
import Twiterlogo from "../../../assets/twiterlogo.png"
import Facebooklogo from "../../../assets/facebooklogo.png"
import Linkedinlogo from "../../../assets/linkedinlogo.png"
import Instalogo from "../../../assets/Group 19 (1).png"
import Emaillogo from "../../../assets/Vector.png"

function Investor_Footer() {
  return (
    <>
        <div class="foot2_firstcolumn ">
                       <img className='foot2_startuplogo' src={startuplog} /> 
                       {/* <h1 className="foot_softution_logo ">Softution</h1> */}
                        <p className='foot2_firstcolumnpara '>we combine technical expertise with creative thinking to deliver innovative solutions that exceed our clients' expectations. We take a collaborative approach to every project, working closely with our clients to understand their unique goals and challenges and tailor our solutions to meet their specific needs.</p>
            </div>
            <div className='footer2bg '>
                <div className='foot_2'>
               
                <div class="row  pt-4 ">
                    
                    
                    <div class="col-3 foot2_secondcolumn ">
                        <div  >
                            <div className="text-center">
                                <h1 className='foot2_secondcolumncontent'>Get In Touch</h1>
                                <div className=" mb-3 footer_hr_line1"></div>
                                <div>
                                    <div className='foot2_secondcolumnadress  '>

                                    <div ><img className='px-1'  src={Adresslogo} /><span>123 Street, New York,USA</span></div>
                                    <div className='pt-3'><img className='px-2 email_footer' src={Emaillogo} /><span >info@example.com</span></div>
                                    <div className='pt-3'><img className='px-2' src={Phonelogo} /><span >+012 345 67890</span></div>
                                    <div className='mt-2 mx-2'>
                                            <img className='me-1' src={Twiterlogo} />
                                            <img className='me-1' src={Facebooklogo} />
                                            <img className='' src={Linkedinlogo} />
                                            <img className=''src={Instalogo} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="col-2">
                        <div  >
                            <div>
                                <h1 className='foot2_secondcolumncontent text-center'>Quick Links</h1>
                                <div className=" mb-3 footer_hr_line2"></div>
                                <div>
                                    <div className='foot2_thirdcolumnadress'>
                                        <ul className='footer2-list'>
                                            <li>Home</li>
                                            <li>Startup Ideas</li>
                                            <li>Chats</li>
                                            <li>Investments</li>
                                            <li>Settings</li>
                                        </ul>
            
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="col-2">
                        <div  >
                            <div>
                                <h1 className='foot2_secondcolumncontent text-center'>Popular Links</h1>
                                <div className=" mb-3 footer_hr_line3"></div>
                                <div>
                                <div className='thirdcolumnadress'>
                                        <ul className='footer2-list'>
                                            <li>Home</li>
                                            <li>Startup Ideas</li>
                                            <li>Chats</li>
                                            <li>Investments</li>
                                            <li>Settings</li>
                                        </ul>
                                </div>


                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                
                
                

            </div>
            <div className='foor2_footerbotomset'>
                    <p className='foot2_botomcontent'>All Rights Reserved. Designed by Student</p>

                </div>


        </div>
    </>
  )
}

export default Investor_Footer