import React, { useEffect, useState } from 'react';
import AdminFooter from '../AdminFooter';
import AdminNavbar from '../AdminNavbar';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';
import { imageUrl } from '../../../ImageAPIs/Image_Urls';
import { toast } from "react-toastify";

function InvestorView() {
  const [investorData, setInvestordata] = useState({});
  const [imgFile, setImgFile] = useState("");

  const { id } = useParams();
  console.log('id', id);

  useEffect(() => {
    if (investorData.profile?.filename) {
      setImgFile(`${imageUrl}/${investorData.profile.filename}`);
    }
  }, [investorData.profile]);

  function getData() {
    axiosInstance.post(`/viewInvestorById/${id}`)
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

  const toggleInvestorStatus = (id, currentStatus) => {
    const endpoint = currentStatus ? `/deActivateInvestorById/${id}` : `/activateInvestorById/${id}`;
    axiosInstance.post(endpoint)
      .then((res) => {
        if (res.status === 200) {
          let msg = res.data.msg || `Investor is now ${currentStatus ? "Inactive" : "Active"}`;
          alert(msg);
          setInvestordata(prevData => ({
            ...prevData,
            isActive: !currentStatus
          }));
        } else {
          toast.error("Error on status change");
        }
      })
      .catch((err) => {
        toast.error("Failed to change investor status");
      });
  };

  return (
    <>
      <AdminNavbar />
      <div className='container mb-3 mt-4'>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <div className="ad_invaccept_profile">
              <div className="ad_invaccept_profile_pic_div">
                {imgFile && <img className='ad_invaccept_profile_pic' src={imgFile} alt="profile_image" />}
              </div>
              <h3 className='ad_invaccept_fname'>{investorData.name}</h3>
            </div>
          </div>
          <div className="col">
            <div className="ad_invaccept_profile">
              <div className="ad_invaccept_details1">
                <table className="ad_invaccept_gfg">
                  <tr><th className='ad_invaccept_head'>E-Mail</th></tr>
                  <tr><td>{investorData.email}</td></tr>
                  <tr><th className='ad_invaccept_head'>Investing Category</th></tr>
                  <tr><td>{investorData.investing_category}</td></tr>
                  <tr><th className='ad_invaccept_head'>Contact No</th></tr>
                  <tr><td>{investorData.contact}</td></tr>
                  <tr><th className='ad_invaccept_head'>Occupation</th></tr>
                  <tr><td>{investorData.occupation}</td></tr>
                  <tr><th className='ad_invaccept_head'>Nationality</th></tr>
                  <tr><td>{investorData.nationality}</td></tr>
                </table>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="ad_invaccept_profile">
              <div className="ad_invaccept_details2">
                <table className="ad_invaccept_gfg">
                  <tr><th className='ad_invaccept_head'>Organization</th></tr>
                  <tr><td>{investorData.organization}</td></tr>
                  <tr><th className='ad_invaccept_head'>Description</th></tr>
                  <tr><td>{investorData.description}</td></tr>
                  <tr><th className='ad_invaccept_head'>Address</th></tr>
                  <tr><td>{investorData.address}</td></tr>
                  <tr className="mt-3 text-center">
                    <td colSpan="2">
                      <button
                        onClick={() => toggleInvestorStatus(investorData._id, investorData.isActive)}
                        className={`btn ${investorData.isActive ? 'btn-danger' : 'btn-primary'} rounded-pill`}
                      >
                        {investorData.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
}

export default InvestorView;
