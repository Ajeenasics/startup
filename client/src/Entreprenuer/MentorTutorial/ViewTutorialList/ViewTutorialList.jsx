import React,{ useEffect, useState } from 'react';
import  './ViewTutorialList.css';
import { FaRegCalendarAlt } from "react-icons/fa";
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import HomepageNavbar from '../../../components/commonNavbar/HomepageNavbar';
import Footer_2 from '../../../components/Footer/Footer_2';
import { CommonNavbar } from '../../../components/commonNavbar/commonNavbar';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import profile from '../../../assets/mentor_tutorial_profile.png'
import arrow from '../../../assets/mentor_tutorial_viewarrow.png'
import { useNavigate, useParams } from 'react-router-dom';

function ViewTutorialList() {
    const [tutorialdata, setTutorialData]=useState("");
  const [videoFile, setVideoFile] = useState("")

const {id}=useParams();

console.log(id,'id');

  useEffect(()=>{
    axiosInstance.post(`/ViewTutorialBymentorId/${id}`)
    .then((res)=>{
      console.log(res,"res");
      if(res.status === 200){
        setTutorialData(res.data.data)
      }
    })
    .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

  useEffect(() => {
    if (tutorialdata.videolink?.filename) {

        setVideoFile(`${imageUrl}/${tutorialdata.videolink.filename}`)
    }
}, [])

const navigate = useNavigate();

const navigateToTutorialView=(id)=>{
  navigate(`/entrepreneur/viewtutorial/${id}`)
}

  
  return (
    <>
        <CommonNavbar/>
        <HomepageNavbar/>
        <div className="text-center headr">
        <h4 className="mt-3 mentor_viewtutorial_mainheading">Our TUTORIAL</h4>
        <h3 className="mentor_viewtutorial_sub_h3">Share Your Future</h3>
        <div className="mb-5 mentor_viewtutorial_hr_line"></div>
      </div>
      <div className='container'>
       {console.log("datas",tutorialdata)}
       {
        (tutorialdata.length)>0?((tutorialdata).map((data) => {
          return( 
          <div className='row mentor_viewtutorial_mainrow'>
            <div className='col-md-5 col-sm-12 mentor_viewtutorial_fir_col'>
              
                    <video width="500" height="325" src={`${imageUrl}/${data.videolink.filename}`}  controls  autoPlay typeof='video/mp4'  >
                      
                    </video>
                        
            </div>
            <div className='col-md-7 col-sm-12 mentor_viewtutorial_sec_col'>
              <div className='row montor_row_viewtutorial'>
                <div className='col-7 mb-3'>
                  <img src={profile}/> Name
                </div>
                <div className='col-5'>
                  <FaRegCalendarAlt className='mentor-icon' /> {data.date}
                </div>
                <p className="men_tutrl_title">{data.title}</p>
              </div>
              
              <label>{data.description}</label>
              <div className="men_tutrl_view" >
            </div>
            </div>
            
          </div>
         )
      })):(
      
        <h1>No tutorial Found</h1>
      )
      }  
      </div>
        <Footer_2/>
    </>
  )
}

export default ViewTutorialList


                //  <a href='' onClick={()=>navigateToTutorialView(data._id)}><p>View  <img src={arrow}/> </p></a>
