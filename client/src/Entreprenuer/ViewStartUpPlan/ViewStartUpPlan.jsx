import React, { useEffect, useState } from "react";
import "./ViewStartUpPlan.css";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomePageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import { toast } from "react-toastify";
import delbtn from "../../assets/del_btn.png";
import editbtn from "../../assets/edit_btn.png";
import Footer_2 from "../../components/Footer/Footer_2";

function ViewStartUpPlan() {
  const navigate = useNavigate();

  const navigateToRequestInvestor = (id) => {
    navigate(`/entrepreneur/viewinvestors/${id}`);
  };
  const navigateToEditStartUpPlan = (id) => {
    console.log();
    navigate(`/entrepreneur/editstartup_plan/${id}`);
  };

  const [data, setData] = useState({});
  const [investorReq, setInvestorreq] = useState([]);
  const [request, setRequest] = useState({});
  const { role } = useParams();


  console.log(request,"requested");
  console.log(investorReq,"investorReq requested");
  useEffect(() => {
    if (
      localStorage.getItem("Enterprenuertoken") == null &&
      localStorage.getItem("Enterprenuer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .post(
        "/viewStartUpPlanByEntrepId/" + localStorage.getItem("Enterprenuer")
      )
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });

    axiosInstance
      .post(`/viewInvestorReqByEntId/${localStorage.getItem("Enterprenuer")}`)
      .then((res) => {
        var temp = [];
        var temp2 = {};
        console.log(res, "res-pp");

        for (var i in res.data.data) {
          if (res.data.data[i].planId) {
            temp.push(res.data.data[i].planId._id);
            temp2[res.data.data[i].planId._id] = res.data.data[i].status;
          }
        }
        console.log(temp, "temp");

        console.log(temp2, "temp2");
        setInvestorreq(temp);
        setRequest(temp2);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch user details");
      });
  }, []);

  const deleteStartUpPlan = (id) => {
    // console.log("id",id);
    axiosInstance
      .post(`/deleteStartupPlanById/${id}`)

      .then((res) => {
        if (res.status === 200) {
          alert("Data deleted Successfully");
          window.location.reload(false);
          alert("One Data Deleted");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <CommonNavbar />
      <HomePageNavbar />
      <div className="container mb-3" style={{ minHeight: "80vh" }}>
        <div className="text-center ">
          <h4 className="  mt-3  ent_viewsplan_mainheading">
            CREATE YOUR STARTUP
          </h4>
          <h3 className="ent_viewsplan_sub_h3">
            Your big opportunity may be right
          </h3>
          <h3 className="ent_viewsplan_sub_h3"> where you are now</h3>
          <div className="  mb-5  ent_viewsplan_hr_line "></div>
        </div>

        {data?.length > 0 ? (
          data.map((data1) => {
            return (
              <div>
                <h3>{data1.companyName}:</h3>

                <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
                  <div class="col">
                    <div class="ent_viewsplan_profile">
                      <tr className="ent_viewsplan_subhead">
                        <th>Company Name:</th>
                      </tr>
                      <tr>
                        <td>
                         
                           {data1.companyName}
                        
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>Is developing:</th>
                      </tr>
                      <tr>
                        <td>
                         
                            {data1.category}
                      
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>To help:</th>
                      </tr>
                      <tr>
                        <td>
                         
                            {data1.audience}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>To solve:</th>
                      </tr>
                      <tr>
                        <td>
                          
                            {data1.workingArea}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>With:</th>
                      </tr>
                      <tr>
                        <td>
                         
                            {data1.domain}
                        
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ent_viewsplan_profile">
                      <tr className="ent_viewsplan_subhead">
                        <th>We compete in the growing:</th>
                      </tr>
                      <tr>
                        <td>
                          
                            {data1.market}
                        
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>Which last year was a:</th>
                      </tr>
                      <tr>
                        <td>
                          {data1.value}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>We are similar to competitor 1:</th>
                      </tr>
                      <tr>
                        <td>
                         {data1.competitor1}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>Competitor 2:</th>
                      </tr>
                      <tr>
                        <td>
                         {data1.competitor2}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>But we:</th>
                      </tr>
                      <tr>
                        <td>
                          {data1.differentiator}
                          
                        </td>
                      </tr>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ent_viewsplan_profile">
                      <tr className="ent_viewsplan_subhead">
                        <th>Currently we have:</th>
                      </tr>
                      <tr>
                        <td>
                          {data1.currentStatus}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>We are looking for:</th>
                      </tr>
                      <tr>
                        <td>
                          {data1.expectedHelpCategory}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>To help us:</th>
                      </tr>
                      <tr>
                        <td>
                          {data1.expectedHelp}
                          
                        </td>
                      </tr>
                      <tr className="ent_viewsplan_subhead">
                        <th>In exchange for:</th>
                      </tr>
                      <tr>
                        <td>
                         {data1.equityAmount}
                          
                        </td>
                      </tr>
                      <div className="ent_viewsplan_reqbtn_div">
                      

                        <button
                          className="ent_viewsplan_reqbtn"
                          onClick={() => navigateToRequestInvestor(data1._id)}
                          disabled={
                            investorReq.includes(data1._id) ? true : false
                          }
                        >
                          {role == "status"
                            ? (request[data1._id] ? request[data1._id] : "request an Investor" )
                            : investorReq.includes(data1._id)
                            ? "Request submited"
                            : "Request an Investor"}
                        </button>
                        {role == "status"
                          && request[data1._id] == "accepted" || request[data1._id] == "rejected" ? '' : <><button className="ent_viewsplan_editbtn">
                          <img
                            src={editbtn}
                            onClick={() => navigateToEditStartUpPlan(data1._id)}
                          />
                        </button>
                        <button
                          className="ent_viewsplan_delbtn"
                          onClick={() => deleteStartUpPlan(data1._id)}
                        >
                          <img src={delbtn} />
                        </button> </>
                      }
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No startup plans are available</h3>
        )}
      </div>
      <Footer_2/>
    </>
  );
}

export default ViewStartUpPlan;
