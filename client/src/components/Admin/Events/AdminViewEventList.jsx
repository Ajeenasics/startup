import React, { useState, useEffect } from "react";
import "./AdminViewEventList.css";
import AdminFooter from "../AdminFooter";
import AdminNavbar from "../AdminNavbar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { useNavigate, Link } from "react-router-dom";
import ad_event_view from "../../../assets/ad_event_view.jpg";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function AdminViewEventList() {
  const navigate = useNavigate();

  const navigateToeditBlog = (id) => {
    navigate(`/mentor/editblogs/${id}`);
  };

  const [eventdata, setEventData] = useState("");

  useEffect(() => {
    axiosInstance
      .post("/viewEvents")
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setEventData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, []);

  const removeEvent = (id) => {
    axiosInstance
      .post(`/removeEventById/${id}`)
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
      <AdminNavbar />

      <div className="text-center headr">
        <h4 className="mt-3 mentor_viewblog_mainheading">OUR BLOGS</h4>
        <h3 className="mentor_viewblog_sub_h3">Share Your Ideas</h3>
        <div className="mb-5 mentor_viewblog_hr_line"></div>
      </div>
      <div className="container">
        <div className="row ms-5 p-5">
          <div className="col-4 ms-5">
            <Link
              to="/admin_dashboard/admin_addevent"
              className="btn btn-primary"
            >
              <FaPlus /> Add A Event
            </Link>
          </div>
        </div>
        {eventdata?.length > 0 ? (
          eventdata.map((data) => {
            return (
              <div className="row mentor_viewblog_mainrow">
                <div className="col-md-5 col-sm-12 mentor_viewblogs_fir_col">
                  <img
                    src={ad_event_view}
                    className="img-fluid mentorviewblog_coverimage"
                    alt="Blog"
                  />
                  <div className="col-3">
                    <Link
                      to={`/admin_dashboard/admin_vieweventreglist/${data?._id}`}
                      className="btn btn-primary px-5 m-3"
                    >
                      <FaEye/>ViewRegistrations
                    </Link>
                  </div>
                </div>
                <div className="col-md-7 col-sm-12 mentor_viewblogs_sec_col">
                  <div className="row montor_row_viwblog">
                    <div className="col-5">
                      <FaRegCalendarAlt className="mentor-icon" />{new Date(data.date).toDateString()}
                    </div>
                    <div className="ad_event_view_location">
                      <h5>{data.venue}</h5>
                    </div>
                    <div className="col-7">
                      <p>{data.title}</p>
                    </div>
                  </div>
                  <label>{data.description}</label>
                  <div className="mentor_viewblog_button_div">
                    <button
                      className="menter_viewblog_btn mentor_addblog_secbtn"
                      onClick={() => removeEvent(data._id)}
                    >
                      <RiDeleteBin5Fill /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No Records Required</h3>
        )}
      </div>
      <AdminFooter />
    </>
  );
}

export default AdminViewEventList;
