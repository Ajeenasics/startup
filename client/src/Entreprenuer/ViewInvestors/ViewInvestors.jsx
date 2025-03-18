import React, { useEffect, useState } from "react";
import "./ViewInvestors.css";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { toast } from "react-toastify";

function InvestorsView({ url }) {
  const navigate = useNavigate();

  const [investorData, setInvestordata] = useState({});
  const [investorReq, setInvestorreq] = useState([]);
  const [request, setRequest] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const { role, planID } = useParams();

  useEffect(() => {
    var disable = role == "status" ? true : false;
    setIsDisabled(disable);
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
          const activeInvestors = res.data.data.filter(investor => investor.isActive);
          setInvestordata(activeInvestors);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch investor details");
      });
      
    axiosInstance
      .post(`/viewInvestorReqByEntId/${localStorage.getItem("Enterprenuer")}`)
      .then((res) => {
        var temp = [];
        var temp2 = {};
        console.log(res, "ppa");

        for (var i in res.data.data) {
          temp.push(res.data.data[i].investorId._id);
          temp2[res.data.data[i].investorId._id] = res.data.data[i].status;
        }
        console.log(temp2, "temp2");
        setInvestorreq(temp);
        setRequest(temp2);
      })
      .catch((err) => {
        console.log(err)
        toast.error("Failed to fetch user details");
      });
  }, []);

  const navigateToInvestorView = (id) => {
    navigate(`/entrepreneur/investorreqview/${id+','+planID}`);
  };

  return (
    <>
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
                  <div class="ent_invreq_profile">
                    <img
                      src={`${imageUrl}/${data.profile.filename}`}
                      class="ent_invreq_profile_pic"
                      alt="..."
                    />
                    <div class="">
                      <h5 class="ent_invreq_fname">{data.name}</h5>
                      <h3 className="ent_invreq_name">INVESTOR</h3>
                      <button
                        className="ent_invreq_btn"
                        onClick={() => navigateToInvestorView(data._id)}
                        disabled={isDisabled}
                      >
                        {"Send Request"}
                      </button>
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
      <Footer />
    </>
  );
}
export default InvestorsView;
