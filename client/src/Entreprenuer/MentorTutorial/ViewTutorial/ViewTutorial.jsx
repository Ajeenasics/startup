import React, { useState,useEffect } from 'react'
import './ViewTutorial.css'
import { FaRegCalendarAlt } from "react-icons/fa";
import { CommonNavbar } from '../../../components/commonNavbar/commonNavbar'
import HomepageNavbar from '../../../components/commonNavbar/HomepageNavbar'
import Footer_2 from '../../../components/Footer/Footer_2'
import profile from '../../../assets/mentor_tutorial_profile.png'
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import { useParams } from 'react-router-dom';

function ViewTutorial() {
    const [tutorialdata, setTutorialData]=useState("");
  const [videoFile, setVideoFile] = useState("")

  const {id}=useParams();

  console.log(id);
    
  useEffect(()=>{
        axiosInstance.post(`/mentorViewTutorialById/${id}`)
        .then((res)=>{
            console.log(res,"res");
            if(res.status === 200){
              setTutorialData(res.data.data)
              console.log(tutorialdata,"tutorialdata");
            }
          })
          .catch((err)=>{
            toast.error("Failed to fetch user details")
        });
        },[id])
        console.log(tutorialdata,"tutorialdata");

        useEffect(() => {
            if (tutorialdata.videolink?.filename) {
        
                setVideoFile(`${imageUrl}/${tutorialdata.videolink.filename}`)
            }
        }, [tutorialdata.videolink])
  return (
    <>
    <CommonNavbar/>
    <HomepageNavbar/>
        <div className="text-center headr">
        <h4 className="mt-3 mentor_viewtutorial_mainheading">Our TUTORIAL</h4>
        <h3 className="mentor_viewtutorial_sub_h3">Share Your Future</h3>
        <div className="mb-5 mentor_viewtutorial_hr_line"></div>
      </div>
      <div className='container mb-5' style={{backgroundColor:"#EEF9FF"}}>
        <div className='row '>
            <div className='mentor_viewtutrl_video mt-5'>
            { videoFile &&    <video src={videoFile} controls autoPlay width='700' type="video/mp4" >

                </video> }
                
            </div>
            <div className='mentor_viewtutrl_subtitle_name'>
                    <p><img src={profile}/>Name</p>
                    <p><FaRegCalendarAlt className='mentor-icon' /> {tutorialdata.date}</p>
            </div>
            <div className='mentor_viewtutrl_subtitle_title'>
                <h5>{tutorialdata.title}</h5>
            </div>
            <div className='mentor_viewtutrl_subtitle_title'>
                <p>{tutorialdata.description}</p>
            </div>

        </div>
      </div>
      <Footer_2/>
    </>
  )
}

export default ViewTutorial