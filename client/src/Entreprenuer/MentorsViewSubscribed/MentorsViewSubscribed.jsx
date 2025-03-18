import React, { useEffect, useState } from "react";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomePageNavbar from "../../components/commonNavbar/HomepageNavbar";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { toast } from "react-toastify";
import Footer_2 from "../../components/Footer/Footer_2";

function MentorsViewSubscribed() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mentorData, setMentorData] = useState({});
  const [imgFile, setImgFile] = useState("");
  const [videoFile, setVideoFile] = useState("");

  useEffect(() => {
    if (
      !localStorage.getItem("Enterprenuertoken") &&
      !localStorage.getItem("Enterprenuer")
    ) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post("/viewSubscriptionById/" + id)
      .then((res) => {
        console.log(res);
        setMentorData(res.data.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, [id]);

  const chat = () => {
    navigate(`/entrepreneur/entrepreneurchat/${mentorData.mentorId._id}`);
  };

  const navigateToTutorialListView = (id) => {
    navigate(`/entrepreneur/viewtutoriallist/${id}`);
  };

  const navigateToBlogListView = (id) => {
    navigate(`/entrepreneur/viewbloglist/${id}`);
  };

  console.log(mentorData, "p");
  return (
    <div>
      <CommonNavbar />
      <HomePageNavbar />
      <div className="container mb-3 mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <div className="ad_menaccept_profile">
              <div className="text-center" style={{ borderRadius: "25px" }}>
                <img
                  style={{ borderRadius: "25px", padding: "5%", width: "300px", height: "300px" }}
                  src={`${imageUrl}/${mentorData.mentorId?.profile.originalname}`}
                  alt="Mentor"
                />
              </div>
              <button onClick={() => navigateToTutorialListView(mentorData.mentorId._id)} className="ms-5 mt-5 btn btn-primary">
                View Tutorials
              </button>
              <button onClick={() => navigateToBlogListView(mentorData.mentorId._id)} className="mt-5 ms-5 btn btn-primary">
                View Blogs
              </button>
              <h3 className="ad_invaccept_fname">{mentorData.name}</h3>
            </div>
          </div>
          <div className="col">
            <div className="ad_menaccept_profile">
              <div className="ad_menaccept_details1">
                <table className="ad_menaccept_gfg">
                  <tbody>
                    <tr>
                      <th className="ad_menaccept_head">E-Mail</th>
                    </tr>
                    <tr>
                      <td>{mentorData.mentorId?.email}</td>
                    </tr>
                    <tr>
                      <th className="ad_menaccept_head">Expertise Category</th>
                    </tr>
                    <tr>
                      <td>{mentorData.mentorId?.expertise_area}</td>
                    </tr>
                    <tr>
                      <th className="ad_menaccept_head">Contact No</th>
                    </tr>
                    <tr>
                      <td>{mentorData.mentorId?.contact}</td>
                    </tr>
                    <tr>
                      <th className="ad_menaccept_head">Subscription Amount</th>
                    </tr>
                    <tr>
                      <td>{mentorData.mentorId?.subscription_amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="ad_menaccept_profile">
              <div className="ad_menaccept_details2">
                <table className="ad_menaccept_gfg">
                  <tbody>
                    <tr>
                      <th className="ad_menaccept_head">Description</th>
                    </tr>
                    <tr>
                      <td>{mentorData.mentorId?.description}</td>
                    </tr>
                    <tr>
                      <th className="ad_menaccept_head">Demo Video</th>
                    </tr>
                    <tr>
                      <td>
                        <video width="300" height="200" controls autoPlay src={`${imageUrl}/${mentorData.mentorId?.demo_videolink.filename}`} type="video/mp4"></video>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button onClick={chat}>Chat</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer_2 />
    </div>
  );
}

export default MentorsViewSubscribed;
