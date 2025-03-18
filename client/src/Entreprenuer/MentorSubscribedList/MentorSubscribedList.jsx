import React, { useEffect, useState } from "react";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer_2 from "../../components/Footer/Footer_2";
import eye from "../../assets/carbon_view-filled.png";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { toast } from "react-toastify";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { useNavigate,Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

function MentorSubscribedList() {
  const navigate = useNavigate();

  const navigateToMentorView = (id) => {
    navigate(`/entrepreneur/mentorviewsubscribed/${id}`);
  };

  const navigateTochat=(id)=>{
    navigate(`/entrepreneur/entrepreneurchat/${id}`);
  }

  const [mentorData, setMentorData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(
        "/viewSubscriptionsByEntrepId/" + localStorage.getItem("Enterprenuer")
      )
      .then((res) => {
        if (res.data.data && Array.isArray(res.data.data)) {
          setMentorData(res.data.data);
        } else {
          setMentorData([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, []);

  return (
    <>
      <CommonNavbar />
      <HomepageNavbar />
      <div className="container" style={{minHeight:"100vh"}}>
        <div className="text-center ">
          <h4 className="mt-3 inv_mainheading">View All</h4>
          <h3 className="inv_sub_h3">New Mentors</h3>
          <div className="mb-5 inv_hr_line"></div>
        </div>
        <table className="table" >
          <thead>
            <tr>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
                Name
              </th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
                E-Mail ID
              </th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
                Expertise Category
              </th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
                Contact No
              </th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
                Subscription Amount
              </th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
                Action
              </th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">
            </th>
            </tr>
          </thead>
          <tbody>
            {mentorData.length > 0 ? (
              mentorData.map((data) => (
                <tr key={data._id}>
                  <th scope="row">
                    {/* <img src={`${imageUrl}/${data.profile.filename}`}  */}
                    {/* class="invviewadmin_profile_pic" alt="..."/> */}
                    {data.mentorId.name}
                  </th>
                  <td>{data.mentorId.email}</td>
                  <td>{data.mentorId.expertise_area}</td>
                  <td>{data.mentorId.contact}</td>
                  <td>{data.mentorId.subscription_amount}</td>
                  <td style={{ color: "rgba(52, 133, 208, 1)" }}>
                    <img src={eye} alt="View Icon" />
                    <a href="#" onClick={() => navigateToMentorView(data._id)}>
                      View Details
                    </a>
                  </td>
                  <div className="btn btn-primary m-2" onClick={()=>navigateTochat(data.mentorId._id)}>Chat <TiArrowBack/></div>    
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No Records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer_2 />
    </>
  );
}

export default MentorSubscribedList;
