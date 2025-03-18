import React, { useEffect, useState } from 'react'
import './InvestorAccept.css'
import AdminFooter from '../AdminFooter'
import AdminNavbar from '../AdminNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../BaseAPIs/AxiosInstance'
import { imageUrl } from '../../../ImageAPIs/Image_Urls'
import { toast } from "react-toastify";


function InvestorAccept() {
  const [investorData, setInvestordata]= useState({});
  const [imgFile, setImgFile] = useState("")

  const {id} =useParams()
    console.log('id',id);

    useEffect(() => {
      if (investorData.profile?.filename) {

          setImgFile(`${imageUrl}/${investorData.profile.filename}`)
      }
  }, [investorData.profile])

    function getData () {
        axiosInstance.post(`/viewInvestorById/${id}`)
        .then ((res)=>{
            console.log(res);
            if (res.status === 200){
                setInvestordata(res.data.data);
            }
        })
        .catch((err)=>{
            toast.error("Failed to fetch user details")
        });
      }
      
    useEffect (()=>{
        getData()
    },[id])

    const navigate =useNavigate();

    const acceptRequest=()=>{
      axiosInstance.post(`/approveInvestorReqsById/${id}`)
      .then ((res)=>{
        console.log(res);
        if (res.status === 200){
          alert("Accepted Successfully")
          navigate("/admin_dashboard")
        }
      })
      .catch((err)=>{
          toast.error("Error")
      });
    }

    const rejectRequest=()=>{
      axiosInstance.post(`/removeInvestorById/${id}`)
      .then ((res)=>{
        console.log(res);
        if (res.status === 200){
          alert("Request Removed")
          navigate("/admin_dashboard")
          
        }
      })
      .catch((err)=>{
          toast.error("Error")
      });
      navigate("/admin_dashboard")
    }
  return (
    <>
        <AdminNavbar/>
        <div className='container mb-3 mt-4' >
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div class="col">
            <div class="ad_invaccept_profile">
                <div class="ad_invaccept_profile_pic_div">
                    {imgFile && <img  className='ad_invaccept_profile_pic ' src={imgFile} alt="profile_image" />}
                </div>
                <h3 className='ad_invaccept_fname'>{investorData.name}</h3>
            </div>
        </div>
        <div class="col">
            <div class="ad_invaccept_profile">
                <div class="ad_invaccept_details1">
                    <table class="ad_invaccept_gfg">
                    <tr ><th className='ad_invaccept_head'>E-Mail</th></tr>
                    <tr><td>{investorData.email}</td></tr>
                    <tr><th className='ad_invaccept_head'>Investing Category</th></tr>
                    <tr><td>{investorData.investing_category}</td></tr>
                    <tr><th className='ad_invaccept_head'>Contact No</th></tr>
                    <tr><td>{investorData.contact}</td></tr>
                    <tr><th className='ad_invaccept_head'>Occupation</th></tr>
                    <tr><td>{investorData.occupation}</td></tr>
                    <tr><th className='ad_invaccept_head'>Nationality</th></tr>
                    <tr><td>{investorData.nationality}</td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="ad_invaccept_profile">
            <div class="ad_invaccept_details2">
                    <table class="ad_invaccept_gfg">
                    <tr ><th className='ad_invaccept_head'>Organization</th></tr>
                    <tr><td>{investorData.organization}</td></tr>
                    <tr><th className='ad_invaccept_head'>Description</th></tr>
                    <tr><td>{investorData.description}</td></tr>
                    <tr><th className='ad_invaccept_head'>Address</th></tr>
                    <tr><td>{investorData.address}</td></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr>
                        <button className='ad_invaccept_btn' type='submit' onClick={acceptRequest}>Accept</button>
                        <button className='ad_invaccept_cancelbtn' onClick={rejectRequest}>Reject</button>
                    </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
        <AdminFooter/>
    </>
  )
}

export default InvestorAccept