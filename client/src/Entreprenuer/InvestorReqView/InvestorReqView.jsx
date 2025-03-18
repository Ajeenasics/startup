import React, { useEffect, useState } from "react";
import "./InvestorReqView.css";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomePageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { toast } from "react-toastify";

function InvestorReqView() {
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

  var { id } = useParams();
  var ids = id.split(",");
  id = ids[0];
  var planId = ids[1];

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

  useEffect(() => {
    getData();
  }, [id]);

  const handleConfirm = () => {
    axiosInstance
      .post(`/reqInvestorById`, {
        investorId: id,
        entId: localStorage.getItem("Enterprenuer"),
        planId: planId,
      })
      .then((res) => {
        alert(res.data.msg);
        navigate("/entrepreneur/viewrestatu/status"); // Navigate to a success page or another appropriate page
      })
      .catch((err) => {
        alert("Failed to approve investor request");
      });
  };

  const handleCancle = () => {
    navigate("/entrepreneur/viewstartup_plan");
  };

  return (
    <>
      <CommonNavbar />
      <HomePageNavbar />
      <div className="container mb-3 mt-4">
        <div className="text-center ">
          <h4 className="mt-3 ent_invreqview_mainheading">
            {investorData.name}
          </h4>
          <h3 className="ent_invreqview_sub_h3">Your Ideas, Our Mission</h3>
          <div className="mb-5 ent_invreqview_hr_line "></div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <div className="ent_invreqview_profile">
              <div className="ent_invreqview_profile_pic_div">
                {imgFile && (
                  <img
                    className="ent_invreqview_profile_pic "
                    src={imgFile}
                    alt="profile_image"
                  />
                )}
              </div>
              <h3 className="ent_invreqview_fname">{investorData.name}</h3>
            </div>
          </div>
          <div className="col">
            <div className="ent_invreqview_profile">
              <div className="ent_invreqview_details1">
                <table className="gfg">
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
          <div className="col">
            <div className="ent_invreqview_profile">
              <div className="ent_invreqview_details2">
                <table className="gfg">
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
                  <tr>
                    <button
                      className="ent_invreqview_confirmbtn"
                      onClick={handleConfirm}
                    >
                      Confirm Request
                    </button>
                    <button
                      className="ent_invreqview_cancelbtn"
                      onClick={handleCancle}
                    >
                      Cancel
                    </button>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InvestorReqView;
