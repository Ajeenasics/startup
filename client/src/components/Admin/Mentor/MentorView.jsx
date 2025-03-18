import React, { useEffect, useState } from 'react'
import AdminFooter from '../AdminFooter'
import AdminNavbar from '../AdminNavbar'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../BaseAPIs/AxiosInstance'
import { imageUrl } from '../../../ImageAPIs/Image_Urls'
import { toast } from "react-toastify";

function MentorView() {
    const [mentordata, setMentorData]= useState({});
  const [imgFile, setImgFile] = useState("")
  const [videoFile, setVideoFile] = useState("")


  const {id} =useParams()
    console.log('id',id);

    useEffect(() => {
      if (mentordata.profile?.filename) {

          setImgFile(`${imageUrl}/${mentordata.profile.filename}`)
      }
  }, [mentordata.profile])

  useEffect(() => {
    if (mentordata.demo_videolink?.filename) {

        setVideoFile(`${imageUrl}/${mentordata.demo_videolink.filename}`)
    }
}, [mentordata.demo_videolink])

    function getData () {
        axiosInstance.post(`/viewMentorById/${id}`)
        .then ((res)=>{
            console.log(res);
            if (res.status === 200){
                setMentorData(res.data.data);
            }
        })
        .catch((err)=>{
            toast.error("Failed to fetch user details")
        });
      }
      
    useEffect (()=>{
        getData()
    },[id])

  return (
    <>
         <AdminNavbar/>
        <div className='container mb-3 mt-4' >
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div class="col">
            <div class="ad_menaccept_profile">
                <div class="ad_menaccept_profile_pic_div">
                    {imgFile && <img  className='ad_menaccept_profile_pic ' src={imgFile} alt="profile_image" />}
                </div>
                <h3 className='ad_invaccept_fname'>{mentordata.name}</h3>
            </div>
        </div>
        <div class="col">
            <div class="ad_menaccept_profile">
                <div class="ad_menaccept_details1">
                    <table class="ad_menaccept_gfg">
                    <tr ><th className='ad_menaccept_head'>E-Mail</th></tr>
                    <tr><td>{mentordata.email}</td></tr>
                    <tr><th className='ad_menaccept_head'>Expertise Category</th></tr>
                    <tr><td>{mentordata.expertise_area}</td></tr>
                    <tr><th className='ad_menaccept_head'>Contact No</th></tr>
                    <tr><td>{mentordata.contact}</td></tr>
                    <tr><th className='ad_menaccept_head'>Subscription Amount</th></tr>
                    <tr><td>{mentordata.subscription_amount}</td></tr>
                    <tr><th className='ad_menaccept_head'>Description</th></tr>
                    <tr><td>{mentordata.description}</td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="ad_menaccept_profile">
            <div class="ad_menaccept_details2">
                    <table class="ad_menaccept_gfg">
                    <tr ><th className='ad_menaccept_head'>Demo Video</th></tr>
                    <tr><td>
                    { videoFile && 
                    <video width="300" height="200" controls autostart autoPlay src={videoFile} type="video/mp4">
                      
                    </video>
                    }
                    </td></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    
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

export default MentorView