import React, { useEffect, useState } from "react";
import { CommonNavbar } from "../commonNavbar/commonNavbar";
import Footer_2 from "../Footer/Footer_2";
import eye from "../../assets/carbon_view-filled.png";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { useNavigate } from "react-router-dom";
import InvestorNav from "./InvestorNav/InvestorNav";
import Footer_3 from "../Footer/Footer_3";

function ViewAcceptedEntereprenuer() {
  const [entData, setEntData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("/viewAcceptedReqsByInvId/" + localStorage.getItem("Investor"))
      .then((res) => {
        if (res.status === 200) {
          const acceptedData = res.data.data.filter(data => data.status === "accepted");
          console.log(acceptedData);
          setEntData(acceptedData);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const navigateToInvestorView = (id) => {
    navigate(`/investor/acceptedentrepreneur_req/${id}`);
  };

  const navigateToInvestorChat = (id) => {
    navigate(`/investor/investorchatwithent/${id}`);
  };
  return (
    <>
      <CommonNavbar />
      <InvestorNav />
      <div className="container" style={{ minHeight: "100vh" }}>
        <div className="text-center ">
          <h4 className="mt-3 inv_mainheading">View All Accepted</h4>
          <h3 className="inv_sub_h3">Entrepreneurs</h3>
          <div className="mb-5 inv_hr_line"></div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">Name</th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">E-Mail ID</th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">Industry Sector</th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">Contact No</th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">Corporate Identification Number</th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col">Action</th>
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }} scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {entData.length > 0 ? (
              entData.map((data) => (
                <tr key={data._id}>
                  <th scope="row">{data.entId.fname}</th>
                  <td>{data.entId.email}</td>
                  <td>{data.entId.industry_sector}</td>
                  <td>{data.entId.contact}</td>
                  <td>{data.entId.corporate_id_no}</td>
                  <td style={{ color: "rgba(52, 133, 208, 1)" }}>
                    <img src={eye} alt="view-icon" />{" "}
                    <a href="#" onClick={() => navigateToInvestorView(data._id)}>View Details</a>
                  </td>
                  <td className="btn btn-primary w-100 m-2" onClick={() => navigateToInvestorChat(data.entId._id)}>Chat</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No accepted requests available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer_3 />
    </>
  );
}

export default ViewAcceptedEntereprenuer;
