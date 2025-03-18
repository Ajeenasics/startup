import React, { useState, useEffect } from "react";
import "./EntViewEvents.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer_2 from "../../components/Footer/Footer_2";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import profile from "../../assets/mentor_tutorial_profile.png";
import ad_event_view from "../../assets/ad_event_view.jpg";
import { useNavigate } from "react-router-dom";

function EntViewEvents() {
  const [eventdata, setEventData] = useState("");

  useEffect(() => {
    axiosInstance
      .post("/viewEvents")
      .then((res) => {
        console.log(res, "res");
        var events=res.data.data
        if (res.status === 200) {
          axiosInstance
            .post("/viewEventRegistratiobyentid/"+localStorage.getItem("Enterprenuer"))
            .then((res) => {
              console.log(res, "kkkk");
              let regEventId = []
              for( var i in res.data.data){
                regEventId.push(res.data.data[i].eventId._id)
              }
              var result=[]
              for (var j in events ){
                if(!regEventId.includes(events[j]._id)){
                  result.push(events[j])
                }
              }
            setEventData(result);
            })
            .catch((err) => {
              // toast.error("Failed to fetch user details");
            });
           
        }
      })
      .catch((err) => {
        // toast.error("Failed to fetch user details");
      });
  }, []);

  const navigate = useNavigate();

  const navigateToEventRegister = (eventid) => {
    navigate("/entrepreneur/registerevents/" + eventid);
  };

  return (
    <>
      <CommonNavbar />
      <HomepageNavbar />
      <div className="text-center headr">
        <h4 className="mt-3 mentor_viewtutorial_mainheading">OUR EVENTS</h4>
        <h3 className="mentor_viewtutorial_sub_h3">Share Your Future</h3>
        <div className="mb-5 mentor_viewtutorial_hr_line"></div>
      </div>
      <div className="container" style={{minHeight:"100vh"}}>
        {eventdata?.length > 0 ? (
          eventdata.map((data) => {
            return (
              <div className="row mentor_viewtutorial_mainrow">
                <div className="col-md-5 col-sm-12 mentor_viewtutorial_fir_col">
                  <img className="ent_viewevents_img" src={ad_event_view} />
                </div>
                <div className="col-md-7 col-sm-12 mentor_viewtutorial_sec_col">
                  <div className="row montor_row_viewtutorial">
                    <div className="ent_viewevent_date_loc">
                      <div className="col-5">
                        <FaRegCalendarAlt className="mentor-icon" /> {data.date}
                      </div>
                      <div className="ent_viewevents_loc">
                        <h5>{data.venue}</h5>
                      </div>
                    </div>
                    <p className="ent_tutrl_title">{data.title}</p>
                  </div>

                  <label>{data.description}</label>
                  <div className="men_tutrl_view mb-5">
                    <button
                      className="ent_viewevent_register_btn"
                      onClick={() => navigateToEventRegister(data._id)}
                    >
                      Register{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No events Found</h1>
        )}
      </div>
      <Footer_2 />
    </>
  );
}

export default EntViewEvents;
