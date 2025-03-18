import React, { useEffect, useState } from "react";
import arrow from "../../../assets/arrowlogo.png"
import eye from "../../../assets/carbon_view-filled.png"
import { toast } from "react-toastify";
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function RecentMentors() {
  const navigate = useNavigate();

    const navigateToMoreMentor = () => {
        navigate("/admin_dashboard/recent_mentorlist");
    };
    const navigateToMentorView = (id)=>{
      navigate(`/admin_dashboard/mentor_accept/${id}`)
    }
  const [mentorData, setMentorData]= useState({});

  useEffect(()=>{
    axiosInstance.post('/viewlessmentors')
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
    <div>
      <div className="mt-5">
        <p className="text-info">View</p>
        <div>
          <h4>Recent Mentors</h4>
          <table className="table">
            <thead style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}>
              <tr style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}>
                <th
                  style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                  scope="col"
                >
                  Name
                </th>
                <th
                  style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                  scope="col"
                >
                  E-Mail ID
                </th>
                <th
                  style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                  scope="col"
                >
                  Expertise Category
                </th>
                <th
                  style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                  scope="col"
                >
                  Contact No
                </th>
                <th
                  style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                  scope="col"
                >
                  Subscription Amount
                </th>
                <th
                  style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                  scope="col"
                >
                  {" "}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {
        (mentorData.length)>0?((mentorData).map((data) => {
          return(
              <tr>
                <th scope="row"><img src={`${imageUrl}/${data.profile.filename}`} 
      class="invviewadmin_profile_pic" alt="..."/>
        {data.name}</th>
                <td>{data.email}</td>
                <td>{data.expertise_area}</td>
                <td>{data.contact}</td>
                <td>{data.subscription_amount}</td>
                <td style={{color:"rgba(52, 133, 208, 1)"}} ><img src={eye}></img><a href="" onClick={()=>navigateToMentorView(data._id)} >View Details</a>  
                </td>
              </tr>
              )
            })):(
            
              <h1>No Records</h1>
            )
            } 
            </tbody>
          </table>
        </div>
      </div>      <p style={{color:"rgba(52, 133, 208, 1)"}} className='text-end'><a href="" onClick={navigateToMoreMentor} >View All</a> <img src={arrow}></img></p>

    </div>
  );
}

export default RecentMentors;
