import React, { useEffect, useState } from 'react'
import './RecentMentors.css'
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import AdminNavbar from '../AdminNavbar'
import { toast } from "react-toastify";
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import { Link } from 'react-router-dom';
import eye from "../../../assets/carbon_view-filled.png";
import { useNavigate } from 'react-router-dom';
import AdminFooter from '../AdminFooter';

function RecentMentorList() {
    const navigate = useNavigate();
    const navigateToMentorView = (id)=>{
        navigate(`/admin_dashboard/mentor_accept/${id}`)
      }
    const [mentorData, setMentorData]= useState({});

  useEffect(()=>{
    axiosInstance.post('/viewMentorsReqs')
    .then((res)=>{
      console.log(res,"res");
      if(res.status === 200){
        setMentorData(res.data.data)
      }
    })
    .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])
  return (
    <>
        <AdminNavbar/>
    <div className='container'>
    <div className="text-center ">
          <h4 className="  mt-3  inv_mainheading">View All</h4>
          <h3 className="inv_sub_h3">New Mentors</h3>
          <div className="  mb-5  inv_hr_line "></div>
    </div>
    <table className="table">
      
  <thead >
    <tr  >
      <th  style={{backgroundColor:"rgba(140, 220, 249, 1)"}} scope="col">Name</th>
      <th  style={{backgroundColor:"rgba(140, 220, 249, 1)"}} scope="col">E-Mail ID</th>
      <th  style={{backgroundColor:"rgba(140, 220, 249, 1)"}} scope="col">Expertise Category</th>
      <th  style={{backgroundColor:"rgba(140, 220, 249, 1)"}} scope="col">Contact No</th>
      <th  style={{backgroundColor:"rgba(140, 220, 249, 1)"}} scope="col">Subscription Amount</th>
      <th  style={{backgroundColor:"rgba(140, 220, 249, 1)"}} scope="col"> Action</th>

    </tr>
  </thead>
  <tbody>
  {
        (mentorData.length)>0?((mentorData).map((data) => {
          return(
      
    <tr>
      <th scope="row">
      <img src={`${imageUrl}/${data.profile.filename}`} 
      class="invviewadmin_profile_pic" alt="..."/>
        {data.name}</th>
      <td>{data.email}</td>
      <td>{data.expertise_area}</td>
      <td>{data.contact}</td>
      <td>{data.subscription_amount}</td>
      <td style={{color:"rgba(52, 133, 208, 1)"}} ><img src={eye}></img> <a href="" onClick={()=>navigateToMentorView(data._id)}>View Details</a></td>

    </tr>
   )
  })):(
  
    <h1>No Records</h1>
  )
  } 
  </tbody>

  
</table>
  
      </div>
      <AdminFooter/>
    </>
  )
}

export default RecentMentorList