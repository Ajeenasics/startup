import React, { useEffect, useState } from "react";
import "./ViewInvestors.css";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { toast } from "react-toastify";
import Footer_2 from "../../components/Footer/Footer_2";

function ViewAllInversetes() {
    const navigate = useNavigate();

    const [investorData, setInvestordata] = useState([]);
  
    useEffect(() => {
      
  const navigateToInvestersView=(id)=>{
    navigate(`/entrepreneur/mentorsview/${id}`)
  }
      if (
        localStorage.getItem("Enterprenuertoken") == null &&
        localStorage.getItem("Enterprenuer") == null
      ) {
        navigate("/");
      }
    }, [navigate]);
  
    useEffect(() => {
      axiosInstance
        .post(`/viewInvestorByCategory/${localStorage.getItem("EnterprenuerCategory")}`)
        .then((res) => {
          if (res.status === 200) {
            setInvestordata(res.data.data);
          }
        })
        .catch((err) => {
          toast.error("Failed to fetch user details");
        });
        
      axiosInstance
        .post(`/viewInvestorReqByEntId/${localStorage.getItem("Enterprenuer")}`)
       
    }, []);
  
    const navigateToInvestorView = (id) => {
      navigate(`/entrepreneur/investorsview//${id}`);
    };
  
  return (
    <div>    <>
    <CommonNavbar />
    <HomepageNavbar />
    <div className="container mb-4" style={{ minHeight: "80vh" }}>
      <div className="text-center ">
        <h4 className="  mt-3  ent_invreq_mainheading">TOP INVESTORS</h4>
        <h3 className="ent_invreq_sub_h3">Your Ideas, Our Mission</h3>
        <div className="  mb-5  ent_invreq_hr_line "></div>
      </div>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        {investorData?.length > 0 ? (
          investorData.map((data) => {
            return (
              <div class="col">
                <div class="ent_invreq_profile" onClick={()=>navigateToInvestorView(data._id)}>
                  <img
                    src={`${imageUrl}/${data.profile.filename}`}
                    class="ent_invreq_profile_pic"
                    alt="..."
                  />
                  <div class="">
                    <h5 class="ent_invreq_fname">{data.name}</h5>
                    <h3 className="ent_invreq_name">INVESTOR</h3>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Investors Found</h1>
        )}
      </div>
    </div>
    <Footer_2 />
  </>
</div>
  )
}

export default ViewAllInversetes