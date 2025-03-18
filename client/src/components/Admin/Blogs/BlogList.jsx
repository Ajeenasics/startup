import React, { useEffect, useState } from 'react'
import './BlogList.css'
import AdminFooter from '../AdminFooter'
import AdminNavbar from '../AdminNavbar'
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'
import { imageUrl } from '../../../ImageAPIs/Image_Urls';


function BlogList() {
    const navigate=useNavigate();

  

  const [blogdata, setBlogData]=useState("");

  useEffect(()=>{
    axiosInstance.post('/viewAllBlogs')
    .then((res)=>{
      console.log(res,"res");
      if(res.status === 200){
        setBlogData(res.data.data)
      }
    })
    .catch((err)=>{
  });
  },[])

  const removeMentorBlog=(id)=>{
    axiosInstance.post(`/mentorRemoveBlog/${id}`)
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
  return (
    <>
        <AdminNavbar/>
        <div className="text-center headr" >
            <h4 className="mt-3 ad_mentor_viewblog_mainheading">OUR BLOGS</h4>
            <h3 className="ad_mentor_viewblog_sub_h3">Share Your Ideas</h3>
            <div className="mb-5 ad_mentor_viewblog_hr_line"></div>
        </div>
        <div className='container ' style={{minHeight:"60vh"}}>
      {
        (blogdata.length)>0?((blogdata).map((data) => {
          return(
          <div className='row ad_mentor_viewblog_mainrow'>
            <div className='col-md-5 col-sm-12 ad_mentor_viewblogs_fir_col'>
              <img src={`${imageUrl}/${data.coverImage.filename}`} className='img-fluid ad_mentorviewblog_coverimage' alt='Blog' />
            </div>
            <div className='col-md-7 col-sm-12 ad_mentor_viewblogs_sec_col'>
              <div className='row ad_montor_row_viwblog'>
              <div className='col-5'>
                  <FaRegCalendarAlt className='ad_mentor-icon' /> {new Date(data.date).toDateString()}
                </div>
                
                
              </div>
              <div className='col-7 ad_mentor_blogname'>
                  <h4>{data.blogName}</h4>
                </div>
              <label>{data.description}</label>
              <div className='ad_mentor_viewblog_button_div'>
                <button className='ad_menter_viewblog_btn mentor_addblog_secbtn'
                onClick={()=>removeMentorBlog(data._id)}
                ><RiDeleteBin5Fill /> Remove</button>
              </div>
            </div>
          </div>
        )
      })):(<h3>No Records Required</h3>)
      } 
      </div>

        <AdminFooter/>
    </>
  )
}

export default BlogList