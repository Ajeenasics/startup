import React, { useEffect, useState } from 'react'
import './RequestInvestor.css'
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar'
import HomepageNavbar from '../../components/commonNavbar/HomepageNavbar'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../BaseAPIs/AxiosInstance'
import { imageUrl } from '../../ImageAPIs/Image_Urls'
import Footer_2 from '../../components/Footer/Footer_2'
function RequestInvestor() {



  const navigate=useNavigate();

  const navigateToInvestorView=(id)=>{
    navigate(`/entrepreneur/investorsview/${id}`)
  }


  const navigateToInvestorChat=(id)=>{
    navigate(`/entrepreneur/entchatwithinvestor/${id}`)
  }


  const [investorData, setInvestordata]= useState([]);
  const [id, setId]= useState(localStorage.getItem("Enterprenuer"));

  useEffect(()=>{
    if(localStorage.getItem("Enterprenuertoken")== null && localStorage.getItem("Enterprenuer") == null ){
      navigate("/");
    }
  },[navigate]);

  useEffect(()=>{
    axiosInstance.post(`/viewAcceptedReqsByEntId/${id}`)
    .then((res)=>{
      console.log(res,"res");
      var tempm = []
      for (var i in res.data.data) {
        tempm.push(res.data.data[i].investorId) 
      }
        setInvestordata(tempm)
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
            <h4 className="  mt-3  ent_invview_mainheading">TOP INVESTORS</h4>
            <h3 className="ent_invview_sub_h3">Your Ideas, Our Mission</h3>
            <div className="  mb-5  ent_invview_hr_line "></div>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">
         {
        (investorData?.length)>0?((investorData).map((data) => {
          return(
            
          <div class="col">
            <div class="ent_invview_profile " onClick={()=>navigateToInvestorView(data._id)}>
              <img src={`${imageUrl}/${data.profile.filename}`} class="ent_invview_profile_pic" alt="..."/>
              <div class="">
                <h5 class="ent_invview_fname" >{data.name}</h5>
                <h3 className='ent_invview_name'>INVESTOR</h3>
                
              </div>
            </div>
            <div className='p-2 text-center' style={{backgroundColor:"#EEF9FF" , marginRight:"24%"}}>
                <button onClick={()=>navigateToInvestorChat(data._id)} className='btn btn-primary'>Chat</button>
                </div>
          </div>
            
          )
        })):(
        
          <h4>No investors available</h4>
        )
        } 
          
        </div>
      </div>
      <Footer_2/>
    </>
    
  )
}

export default RequestInvestor