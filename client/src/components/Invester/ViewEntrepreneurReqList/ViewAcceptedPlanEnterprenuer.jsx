import React, { useEffect, useState } from "react";
// import "./ViewEntrepreneurReq.css";
import { CommonNavbar } from "../../commonNavbar/commonNavbar";
import Footer_2 from "../../Footer/Footer_2";
import InvestorNav from "../InvestorNav/InvestorNav";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../../ImageAPIs/Image_Urls";

function ViewAcceptedPlanEnterprenuer() {
  const [plan, setPlan] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(imageUrl);
  useEffect(() => {
    axiosInstance
      .post("/viewInvestorReqById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setPlan(res.data.data);
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, [id]);

  return (
    <>
      <CommonNavbar />
      <InvestorNav />
      <div className="container mb-3 mt-4" style={{minHeight:"170vh"}}>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          <div className="col">
            <div className="ad_invaccept_profile">
              <div className="ad_invaccept_profile_pic_div">
                <img
                  src={`${imageUrl}/${plan.entId?.image.filename}`}
                  className="ad_invaccept_profile_pic "
                  alt="profile_image"
                />
              </div>
              <h3 className="ad_invaccept_fname">
                Name : {plan.entId?.fname}
              </h3>
            </div>
          </div>
          <div className="col">
            <div className="ad_invaccept_profile">
              <div className="ad_invaccept_details1">
                <table className="ad_invaccept_gfg">
                  <tr>
                    <th className="ad_invaccept_head">E-Mail</th>
                    <td>{plan.entId?.email}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="ad_invaccept_head">Investing Category</td>
                    <td>{plan.entId?.industry_sector}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="ad_invaccept_head">Contact No</th>
                    <td>{plan.entId?.contact}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  
                  <tr>
                    <td></td>
                  </tr>
                  
                </table>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="ad_invaccept_profile">
              <div className="ad_invaccept_details2">
                <table className="ad_invaccept_gfg">
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="ad_invaccept_head">Description</th>
                    <td>{plan.entId?.company_description}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="ad_invaccept_head">Address</th>
                    <td>{plan.entId?.address}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <div className="invview_ent_viewsplan_profile">
              <tr className="invview_ent_viewsplan_subhead mt-5 mb-5">
                <th>Company Name : {plan.planId?.companyName} </th>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td className="g"><b>Is developing :</b> {plan.planId?.currentStatus}</td>
              </tr>
             <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead mt-5 pt-5">
                <td><b>To help:</b>{plan.planId?.expectedHelp}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td><b> To solve : </b>{plan.planId?.market}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td> <b> With: </b>{plan.planId?.domain}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
            </div>
          </div>
          <div className="col">
            <div className="invview_ent_viewsplan_profile">
              <tr className="invview_ent_viewsplan_subhead mt-2">
                <td><b>We compete in the growing : </b>{plan.planId?.workingArea}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td><b> We are similar to competitor 1: </b>{plan.planId?.competitor1}</td>
              </tr>
             <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead mt-2">
                <td><b>Competitor 2 : </b> {plan.planId?.competitor2}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td><b>But we : </b>{plan.planId?.differentiator}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
            </div>
          </div>
          <div className="col">
            <div className="invview_ent_viewsplan_profile">
              <tr className="invview_ent_viewsplan_subhead">
                <td><b>Currently we have : </b>{plan.planId?.currentStatus}:</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td><b>We are looking for:</b>{plan.planId?.expectedHelpCategory}:</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td><b>To help us : </b>{plan.planId?.expectedHelpCategory}:</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
              <tr className="invview_ent_viewsplan_subhead">
                <td><b> In exchange for : </b>{plan.planId?.equityAmount}</td>
              </tr>
              <tr>
                <td>
                  <input className="invview_ent_viewsplan_value" type="text" />
                </td>
              </tr>
            </div>
          </div>
        </div>
      </div>
      <Footer_2 />
    </>
  );
}

export default ViewAcceptedPlanEnterprenuer;
