import React, { useState, useEffect } from "react";
import AdminFooter from "../AdminFooter";
import AdminNavbar from "../AdminNavbar";
import { toast } from "react-toastify";
import eye from "../../../assets/carbon_view-filled.png";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../../ImageAPIs/Image_Urls";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";

function AdminViewEventRegList() {
  // const navigate = useNavigate();
  // const navigateToInvestorView = (id)=>{
  //     navigate(`/admin_dashboard/viewinvestor/${id}`)
  //   }
  const [eventregdata, setEventRegData] = useState("");

  const {eventid}=useParams()

  useEffect(() => {
    axiosInstance
      .post("/viewEventRegistrationsByEventId/"+eventid)
      .then((res) => {
        console.log(res, "test");
        if (res.status === 200) {
          setEventRegData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className="container" style={{ minHeight: "80vh" }}>
        <div className="text-center ">
          <h4 className="  mt-3  inv_mainheading">VIEW</h4>
          <h3 className="inv_sub_h3">Event Registration</h3>
          <div className="  mb-5  inv_hr_line "></div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col-"
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
                Contact No
              </th>
              <th
                style={{ backgroundColor: "rgba(140, 220, 249, 1)" }}
                scope="col"
              >
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {eventregdata?.length > 0 ? (
              eventregdata.map((data) => {
                return (
                  <tr>
                    <th scope="row">
                      {data.fname} {data.lname}
                    </th>
                    <td>{data.email}</td>
                    <td>{data.contact}</td>
                    <td>{data.location}</td>
                    {/* <td style={{color:"rgba(52, 133, 208, 1)"}} ><img src={eye}></img> <a href="" onClick={()=>navigateToInvestorView(data._id)}>View Details</a></td> */}
                  </tr>
                );
              })
            ) : (
              <h1>No Records</h1>
            )}
          </tbody>
        </table>
      </div>

      <AdminFooter />
    </>
  );
}

export default AdminViewEventRegList;
