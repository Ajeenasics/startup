import React, { useEffect, useState } from 'react'
import './MentorViewTutorials.css'
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CommonNavbar } from '../../commonNavbar/commonNavbar';
import MentorNav from '../MentorNav/MentorNav';
import Footer_2 from '../../Footer/Footer_2';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import { useNavigate } from 'react-router-dom';
import Footer_4 from '../../Footer/Footer_4';

function MentorViewTutorials() {
  
  const navigate=useNavigate();

  const [tutorialdata, setTutorialData]=useState("");
  const [videoFile, setVideoFile] = useState("");


  useEffect(()=>{
    axiosInstance.post('/ViewTutorialBymentorId/'+localStorage.getItem("Mentor"))
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
}, [tutorialdata.videolink])

  const removeMentorTutorial=(id)=>{
    axiosInstance.post(`/mentorRemoveTutorial/${id}`)
    .then((res)=>{
      if(res.status === 200){
        alert("Data deleted Successfully")
        window.location.reload(false)
        alert("One Data Deleted")
      }
    })
    .catch((err)=>{
      console.log(err);
      alert(err)
    })
  }

  const navigateToEditTutorial=(id)=>{
    navigate(`/mentor/edittutorials/${id}`)
  }
  return (
    <>
      <CommonNavbar />
      <MentorNav />
      <div className="text-center headr" >
        <h4 className="mt-3 mentor_viewtutorial_mainheading">VIEW TUTORIAL</h4>
        <h3 className="mentor_viewtutorial_sub_h3">Share Your Ideas</h3>
        <div className="mb-5 mentor_viewtutorial_hr_line"></div>
      </div>

      <div className='container' style={{minHeight:"70vh"}}>
      {console.log("datas",tutorialdata)}
         {
        (tutorialdata.length)>0?((tutorialdata).map((data) => {
          return(
          <div className='row mentor_viewtutorial_mainrow'>
            <div className='col-md-5 col-sm-12 mentor_viewtutorial_fir_col'>

                    
                    <video width="500" height="305" controls autoPlay src={`${imageUrl}/${data.videolink.filename}`} type="video/mp4"></video>
                
            </div>
            <div className='col-md-7 col-sm-12 mentor_viewtutorial_sec_col'>
              <div className='row montor_row_viewtutorial'>
                <div className='col-7'>
                  <p>{data.title}</p>
                </div>
                <div className='col-5'>
                  <FaRegCalendarAlt className='mentor-icon' />  {new Date(data.date).toDateString()}
                </div>
              </div>
              <label>{data.description}</label>
              <div className='mentor_viewtutorial_button_div'>
                <button className='menter_viewtutorial_btn' onClick={()=>navigateToEditTutorial(data._id)}><FaEdit /> Edit</button>
                <button className='menter_viewtutorial_btn mentor_addblog_secbtn' onClick={()=>removeMentorTutorial(data._id)}><RiDeleteBin5Fill /> Remove</button>
              </div>
            </div>
          </div>
        )
      })):(
      
        <h1>No Investors Found</h1>
      )
      } 
      </div>
      <Footer_4 />
    </>
  )
}

export default MentorViewTutorials