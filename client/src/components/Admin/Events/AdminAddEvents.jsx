import React, { useState } from "react";
import "./AdminAddEvents.css";
import AdminFooter from "../AdminFooter";
import AdminNavbar from "../AdminNavbar";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { useNavigate, Link } from "react-router-dom";

function AdminAddEvents() {
  const [eventdata, setEventdata] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
    venue: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
    venue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventdata({ ...eventdata, [name]: value });
  };

  console.log(eventdata, "eventdata");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let formValid = true;

    if (!eventdata.title.trim()) {
      formValid = false;
      errors.title = "Event Name is required";
    }

    if (!eventdata.description.trim()) {
      formValid = false;
      errors.description = "Event Description is required";
    }

    if (!eventdata.time.trim()) {
      formValid = false;
      errors.time = "Event Time is required";
    }

    if (!eventdata.date.trim()) {
      formValid = false;
      errors.date = "Event Date is required";
    } else {
      const eventDate = new Date(eventdata.date);
      const currentDate = new Date();
      if (eventDate <= currentDate) {
        formValid = false;
        errors.date = "Event Date must be a future date";
      }
    }

    if (!eventdata.venue.trim()) {
      formValid = false;
      errors.venue = "Location is required";
    }

    setErrors(errors);

    if (
      eventdata.title &&
      eventdata.description &&
      eventdata.time &&
      eventdata.date &&
      eventdata.venue &&
      formValid
    ) {
      const formData = new FormData();
      formData.append("title", eventdata.title);
      formData.append("description", eventdata.description);
      formData.append("time", eventdata.time);
      formData.append("date", eventdata.date);
      formData.append("venue", eventdata.venue);
      console.log(formData, "formData");
      try {
        const response = await axiosInstance.post("/addEvent", formData);
        console.log("Response:", response);
        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/admin_dashboard/admin_vieweventlist");
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", eventdata);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="text-center ">
        <h4 className="mt-3 ad_addevent_mainheading">OUR EVENTS</h4>
        <h3 className="ad_addevent_sub_h3">Events</h3>
        <div className="mb-5 ad_addevent_hr_line"></div>
      </div>
      <section className="container">
        <div className="ad_addevent_div">
          <form className="px-5 pt-4" onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col">
                <table>
                  <tr>
                    <th className="px-2">Event Name:</th>
                    <td>
                      <input
                        className="ad_addevent_input"
                        type="text"
                        onChange={handleInputChange}
                        name="title"
                      />
                      {errors.title && (
                        <div className="text-danger errortext">
                          {errors.title}
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-2">Event Date:</th>
                    <td>
                      <input
                        className="ad_addevent_input_date mt-3"
                        type="date"
                        onChange={handleInputChange}
                        name="date"
                      />
                      {errors.date && (
                        <div className="text-danger errortext">
                          {errors.date}
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-2 pt-3">Event Time:</th>
                    <td>
                      <input
                        className="ad_addevent_input mt-3"
                        type="time"
                        onChange={handleInputChange}
                        name="time"
                      />
                      {errors.time && (
                        <div className="text-danger errortext">
                          {errors.time}
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
              <div className="col">
                <tr>
                  <th className="px-2">Event Location:</th>
                  <td>
                    <input
                      className="ad_addevent_input_date mt-3"
                      type="text"
                      onChange={handleInputChange}
                      name="venue"
                    />
                    {errors.venue && (
                      <div className="text-danger errortext">
                        {errors.venue}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="px-2">Event Description:</th>
                  <td>
                    <textarea
                      className="ad_addevent_input_des"
                      onChange={handleInputChange}
                      name="description"
                    />
                    {errors.description && (
                      <div className="text-danger errortext">
                        {errors.description}
                      </div>
                    )}
                  </td>
                </tr>
              </div>
            </div>
            <button className="ad_addevent_addbtn ms-5">Add Events</button>
          </form>
          
        </div>
      </section>
      <AdminFooter />
    </>
  );
}

export default AdminAddEvents;
