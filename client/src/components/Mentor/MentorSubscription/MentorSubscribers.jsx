import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../../ImageAPIs/Image_Urls";
import MentorNav from "../MentorNav/MentorNav";
import Footer from "../../Footer/Footer";
import Footer_4 from "../../Footer/Footer_4";

function MentorSubscribers() {
  const navigate = useNavigate();

  //   const navigateToMentorView = (id) => {
  //     navigate(`/${id}`);
  //   };
  const [entdata, setEntData] = useState({});

  useEffect(() => {
    axiosInstance
      .post("/viewSubscriptionsByMentorId/" + localStorage.getItem("Mentor"))
      .then((res) => {
        console.log(res.data.data, "res");
        if (res.status === 200) {
          setEntData(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user details");
      });
  }, []);

  const chat = (id) => {
    navigate(`/mentor/mentorchat/${id}`);
  };

  return (
    <div>
      <MentorNav />
      <div
        className="container admin_entlist_con"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center ">
          <h4 className="  mt-3  inv_mainheading">View All</h4>
          <h3 className="inv_sub_h3">Entrepreneurs</h3>
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
              <th style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}></th>
            </tr>
          </thead>
          <tbody>
            {entdata.length > 0 ? (
              entdata.map((data) => {
                return (
                  <tr>
                    <th scope="row">
                      <img
                        src={`${imageUrl}/${data.entId?.image?.filename}`}
                        class="invviewadmin_profile_pic"
                        alt="..."
                      />
                      <label>{data.entId?.fname}
                      {data.entId?.lname}</label>
                    </th>
                    <td>{data.entId?.email}</td>
                    <td>{data.entId?.industry_sector}</td>
                    <td>{data.entId?.contact}</td>
                    <td>
                    <button className="btn btn-outline-primary  m-2" onClick={() => chat(data.entId?._id)}>Chat</button>
                  </td></tr>
                );
              })
            ) : (
              <h1>No Records</h1>
            )}
          </tbody>
        </table>
      </div>
      <Footer_4/>
    </div>
  );
}

export default MentorSubscribers;
