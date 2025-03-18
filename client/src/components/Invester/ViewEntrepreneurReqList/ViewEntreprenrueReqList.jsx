import React, { useEffect, useState } from "react";
import { CommonNavbar } from "../../commonNavbar/commonNavbar";
import Footer_2 from "../../Footer/Footer_2";
import InvestorNav from "../InvestorNav/InvestorNav";
import eye from "../../../assets/carbon_view-filled.png";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Footer_3 from "../../Footer/Footer_3";

function ViewEntreprenrueReqList() {
  const [entData, setentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("/viewInvestorReqByInvId/" + localStorage.getItem("Investor"))
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
            setentData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, []);

  const navigateToInvestorView = (id) => {
    navigate(`/investor/entrepreneur_req/${id}`);
  };

  return (
    <>
      <CommonNavbar />
      <InvestorNav />
      <div className="container" style={{minHeight:"100vh"}}>
        <div className="text-center ">
          <h4 className="  mt-3  inv_mainheading">View All</h4>
          <h3 className="inv_sub_h3">Entrepreneur Requests</h3>
          <div className="  mb-5  inv_hr_line "></div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                Name
              </th>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                E-Mail ID
              </th>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                Industry Sector
              </th>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                Contact No
              </th>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                Corporate Identification Number
              </th>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {entData.length > 0 ? (
              entData.map((data) => {
                return (
                  <tr className={data.status=="pending" ? "" : "d-none"} >
                    <th scope="row">
                      {/* <img src={`${imageUrl}/${data.profile.filename}`}  */}
                      {/* class="invviewadmin_profile_pic" alt="..."/> */}
                      {data.entId.fname}
                    </th>
                    <td>{data.entId.email}</td>
                    <td>{data.entId.industry_sector}</td>
                    <td>{data.entId.contact}</td>
                    <td>{data.entId.corporate_id_no}</td>
                    <td style={{ color: "rgba(52, 133, 208, 1)" }}>
                      <img src={eye}></img>{" "}
                      <a
                        href=""
                        onClick={() => navigateToInvestorView(data._id)}
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1 className="text-center">No pending request Available</h1>
            )}
          </tbody>
        </table>
      </div>
      <Footer_3 />
    </>
  );
}

export default ViewEntreprenrueReqList;
