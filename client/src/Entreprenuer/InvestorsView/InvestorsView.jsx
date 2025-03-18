import React, { useEffect, useState } from "react";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomePageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { toast } from "react-toastify";
import Footer_2 from "../../components/Footer/Footer_2";
function InvestorsView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("Enterprenuertoken") == null &&
      localStorage.getItem("Enterprenuer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [investorData, setInvestordata] = useState({});
  const [imgFile, setImgFile] = useState("");

  useEffect(() => {
    if (investorData.profile?.filename) {
      setImgFile(`${imageUrl}/${investorData.profile.filename}`);
    }
  }, [investorData.profile]);

  const { id } = useParams();
  console.log("id", id);

  function getData() {
    axiosInstance
      .post(`/viewInvestorById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setInvestordata(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }
  const navigateToInvestorChat=(id)=>{
    navigate(`/entrepreneur/entchatwithinvestor/${id}`)
  }

  useEffect(() => {
    getData();
  }, [id]);
  return (
    <>
      <CommonNavbar />
      <HomePageNavbar />
      <div className="container mb-3">
        <div className="text-center ">
          <h4 className="  mt-3  ent_invreqview_mainheading">
            Investor Details
          </h4>
          <h3 className="ent_invreqview_sub_h3">Your Ideas, Our Mission</h3>
          <div className="  mb-5  ent_invreqview_hr_line "></div>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div class="col">
            <div class="ent_invreqview_profile">
              <div class="ent_invreqview_profile_pic_div">
                {imgFile && (
                  <img
                    className="ent_invreqview_profile_pic "
                    src={imgFile}
                    alt="profile_image"
                  />
                )}
              </div>
              <h3 className="ent_invreqview_fname">{investorData.name}</h3>
              <div className="text-center mt-5 ms-5">
                {" "}
                <button className="btn btn-primary" onClick={()=>{navigateToInvestorChat(investorData._id)}}>Chat</button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="ent_invreqview_profile">
              <div class="ent_invreqview_details1">
                <table class="gfg">
                  <tr>
                    <th className="ent_invreqview_head">E-Mail</th>
                  </tr>
                  <tr>
                    <td>{investorData.email}</td>
                  </tr>
                  <tr>
                    <th className="ent_invreqview_head">Investing Category</th>
                  </tr>
                  <tr>
                    <td>{investorData.investing_category}</td>
                  </tr>
                  <tr>
                    <th className="ent_invreqview_head">Contact No</th>
                  </tr>
                  <tr>
                    <td>{investorData.contact}</td>
                  </tr>
                  <tr>
                    <th className="ent_invreqview_head">Occupation</th>
                  </tr>
                  <tr>
                    <td>{investorData.occupation}</td>
                  </tr>
                  <tr>
                    <th className="ent_invreqview_head">Nationality</th>
                  </tr>
                  <tr>
                    <td>{investorData.nationality}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="ent_invreqview_profile">
              <div class="ent_invreqview_details2">
                <table class="gfg">
                  <tr>
                    <th className="ent_invreqview_head">Organization</th>
                  </tr>
                  <tr>
                    <td>{investorData.organization}</td>
                  </tr>
                  <tr>
                    <th className="ent_invreqview_head">Description</th>
                  </tr>
                  <tr>
                    <td>{investorData.description}</td>
                  </tr>
                  <tr>
                    <th className="ent_invreqview_head">Address</th>
                  </tr>
                  <tr>
                    <td>{investorData.address}</td>
                  </tr>
                  <tr></tr>
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
      <Footer_2 />
    </>
  );
}

export default InvestorsView;
