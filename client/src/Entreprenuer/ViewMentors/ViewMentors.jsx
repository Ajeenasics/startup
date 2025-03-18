import React, { useEffect, useState }from 'react'
import './ViewMentors.css'
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar'
import HomepageNavbar from '../../components/commonNavbar/HomepageNavbar'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../BaseAPIs/AxiosInstance'
import { imageUrl } from '../../ImageAPIs/Image_Urls'
import { toast } from "react-toastify";
import Footer_2 from '../../components/Footer/Footer_2'

function ViewMentors() {
    const navigate=useNavigate();

  const navigateToMentorView=(id)=>{
    navigate(`/entrepreneur/mentorsview/${id}`)
  }

  const [mentordata, setMentordata]= useState({});

  useEffect(()=>{
    if(localStorage.getItem("Enterprenuertoken")== null && localStorage.getItem("Enterprenuer") == null ){
      navigate("/");
    }
  },[navigate]);

  useEffect(()=>{
    axiosInstance.post('/viewMentors')
    .then((res)=>{
      console.log(res,"res");
      if(res.status === 200){
        setMentordata(res.data.data)
      }
    })
    .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

 

  return (
    <>
        <CommonNavbar/>
    <HomepageNavbar/>
      <div className="container mb-4" style={{minHeight:"80vh"}}>
        <div className="text-center ">
            <h4 className="  mt-3  ent_menview_mainheading">TOP MENTORS</h4>
            <h3 className="ent_menview_sub_h3">Shape Your Future</h3>
            <div className="  mb-5  ent_menview_hr_line "></div>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {console.log("datas",mentordata)}
         {
        (mentordata?.length)>0?((mentordata).map((data) => {
          return(
            
          <div class="col">
            <div class="ent_menview_profile " onClick={()=>navigateToMentorView(data._id)}>
              <img src={`${imageUrl}/${data.profile.filename}`} class="ent_menview_profile_pic" alt="..."/>
              <div class="">
                <h5 class="ent_menview_name" >{data.name}</h5>
                <h3 className='ent_menview_fname'>MENTOR</h3>
              </div>
            </div>
          </div>
            
          )
        })):(
        
          <h1>No Record Found</h1>
        )
        } 
          
        </div>
      </div>
      <Footer_2/>
    </>
  )
}

export default ViewMentors