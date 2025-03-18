import React, { useEffect, useState } from 'react'
import './ViewBlogList.css'
import { CommonNavbar } from '../../../components/commonNavbar/commonNavbar'
import HomepageNavbar from '../../../components/commonNavbar/HomepageNavbar'
import Footer_2 from '../../../components/Footer/Footer_2'
import { FaRegCalendarAlt } from "react-icons/fa";
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import profile from '../../../assets/mentor_tutorial_profile.png'
import { useParams } from 'react-router-dom'

function ViewBlogList() {
    const [blogdata, setBlogData]=useState("");

    const {id}=useParams();
    console.log(id,"id");

  useEffect(()=>{
    axiosInstance.post(`/viewBlogByMentorId/${id}`)
    .then((res)=>{
      console.log(res,"res");
      if(res.status === 200){
        setBlogData(res.data.data)
      }
    })
    .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

  // const removeMentorBlog=(id)=>{
  //   axiosInstance.post(`/mentorRemoveBlog/${id}`)
  //   .then((res)=>{
  //     if(res.status === 200){
  //       alert("Data deleted Successfully")
  //       window.location.reload(false)
  //       alert("One Data Deleted")
  //     }
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //     alert(err)
  //   })
  // }
  return (
    <>
        <CommonNavbar/>
        <HomepageNavbar/>
        <div className="text-center headr">
        <h4 className="mt-3 mentor_viewblog_mainheading">OUR BLOGS</h4>
        <h3 className="mentor_viewblog_sub_h3">Share Your Ideas</h3>
        <div className="mb-5 mentor_viewblog_hr_line"></div>
      </div>
      <div className='container'>
      {
        (blogdata.length)>0?((blogdata).map((data) => {
          return(
          <div className='row mentor_viewblog_mainrow'>
            <div className='col-md-5 col-sm-12 mentor_viewblogs_fir_col'>
              <img src={`${imageUrl}/${data.coverImage.filename}`} className='img-fluid mentorviewblog_coverimage' alt='Blog' />
            </div>
            <div className='col-md-7 col-sm-12 mentor_viewblogs_sec_col'>
              <div className='row montor_row_viwblog'>
                <div className='col-7'>
                  <p><img src={profile}/>  Name</p>
                </div>
                <div className='col-5'>
                  <FaRegCalendarAlt className='mentor-icon' /> {data.date}
                </div>
              </div>
              <div></div>
              <h5 className='mentor_blogview_blogname'>{data.blogName}</h5>
              <label>{data.description}</label>
              
            </div>
          </div>
        )
      })):(<h3>No Records Required</h3>)
      } 
      </div>
        <Footer_2/>
    </>
  )
}

export default ViewBlogList