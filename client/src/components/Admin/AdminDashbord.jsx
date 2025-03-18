import React, { useEffect, useState } from "react";
import home1 from "../../assets/hugeicons_alms (1).png";
import home2 from "../../assets/hugeicons_mentoring (1).png";
import home3 from "../../assets/Group 56.png";
import home4 from "../../assets/Vector.png";
import "./Admin.css"
import RecentIvesitors from './Investor/RecentIvesitors';
import RecentMentors from "./Mentor/RecentMentors";
import AdminFooter from "./AdminFooter";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminDashbord() {

  const [investordata , setInvetordata]=useState("")
  const [entrepreneurdata, setEntrepreneurdata]=useState("")
  const [mentordata, setMentordata]=useState("")
  const [eventdata, setEventdata]=useState("")
const navigate=useNavigate()
  // useEffect(()=>{
  //   if(localStorage.getItem("admin")== null){
  //     navigate("/admin_login");
  //   }
  // },[navigate]);

  useEffect(()=>{
    axiosInstance.post('/viewInvestors')
    .then((res)=>{
      console.log(res);
      if (res.status == 200){
        setInvetordata(res.data.data.length);

      }
  })
  .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

  useEffect(()=>{
    axiosInstance.post('/viewEntrepreneurs')
    .then((res)=>{
      console.log(res);
      if (res.status == 200){
        setEntrepreneurdata(res.data.data.length);
      }
  })
  .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

  useEffect(()=>{
    axiosInstance.post('/viewMentors')
    .then((res)=>{
      console.log(res);
      if (res.status == 200){
        setMentordata(res.data.data.length);
      }
  })
  .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

  useEffect(()=>{
    axiosInstance.post('/viewEvents')
    .then((res)=>{
      console.log(res);
      if (res.status == 200){
        setEventdata(res.data.data.length);
      }
  })
  .catch((err)=>{
      toast.error("Failed to fetch user details")
  });
  },[])

  return (
    <div>
    <div className="container mt-5">
      <div>
        <p className="text-info">Overview</p>
        <h5 className="mt-3">Admin Dashboard</h5>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="card">
            <div className="p-3 admincard">
              Investors
              <div className="row mt-4">
                <div className="col-6">
                  <h3>{investordata}</h3>
                </div>
                <div className="col-6 ">
                  <img className="w-25" src={home1}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="p-3 admincard">
              Mentors
              <div className="row mt-4">
                <div className="col-6">
                  <h3>{mentordata}</h3>
                </div>
                <div className="col-6 ">
                  <img className="w-25" src={home2}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="p-3 admincard">
              Entrepreneurs
              <div className="row mt-4">
                <div className="col-6">
                  <h3>{entrepreneurdata}</h3>
                </div>
                <div className="col-6 ">
                  <img className="w-25" src={home3}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="p-3 admincard">
              Events
              <div className="row mt-4">
                <div className="col-6">
                  <h3>{eventdata}</h3>
                </div>
                <div className="col-6 ">
                  <img className="w-25" src={home4}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecentIvesitors/>
      <RecentMentors/>
    </div>
    <AdminFooter/>
</div>
  );
}

export default AdminDashbord;
