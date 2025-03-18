import React, { useState } from 'react';
import './EntRegisterEvents.css';
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar';
import HomepageNavbar from '../../components/commonNavbar/HomepageNavbar';
import Footer_2 from '../../components/Footer/Footer_2';
import axiosInstance from '../../BaseAPIs/AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for alerts

function EntRegisterEvents() {
  const navigate = useNavigate();
  const [eventregdata, setEventRegData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    location: ""
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    location: ""
  });
  const { eventId } = useParams();
  const entId = localStorage.getItem("Enterprenuer");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventRegData({ ...eventregdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let formValid = true;

    if (!eventregdata.fname.trim()) {
      formValid = false;
      errors.fname = "First Name is required";
    }

    if (!eventregdata.lname.trim()) {
      formValid = false;
      errors.lname = "Last Name is required";
    }

    if (!eventregdata.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!eventregdata.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }

    if (!eventregdata.contact.trim()) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (eventregdata.contact.length <= 9) {
      errors.contact = "Enter a valid 10-digit contact number";
    }

    if (!eventregdata.location.trim()) {
      formValid = false;
      errors.location = "Location is required";
    }

    setErrors(errors);

    if (formValid) {
      try {
        const response = await axiosInstance.post("/registerEventEntrepreneur", {
          ...eventregdata,
          entId,
          eventId
        });

        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/entrepreneur/viewevents");
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    }
  };

  return (
    <>
      <CommonNavbar />
      <HomepageNavbar />
      <div className="text-center">
        <h4 className="mt-3 ad_addevent_mainheading">OUR EVENTS</h4>
        <h3 className="ad_addevent_sub_h3">Event Registration</h3>
        <div className="mb-5 ad_addevent_hr_line"></div>
      </div>
      <section className='container mb-5'>
        <div className='ent_event_reg_div'>
          <form className='pt-5' onSubmit={handleSubmit}>
            <table>
              <tr>
                <th className='px-5'>First Name :</th>
                <th>
                  <input 
                    type='text' 
                    className='ent_event_reg_input' 
                    name='fname'
                    onChange={handleInputChange}
                  />
                </th>
                {errors.fname && (<div className="text-danger mx-1 errortext">{errors.fname}</div>)}
              </tr>
              <tr>
                <th className='px-5 pt-3'>Last Name :</th>
                <th className='pt-3'>
                  <input 
                    type='text' 
                    className='ent_event_reg_input' 
                    name='lname'
                    onChange={handleInputChange}
                  />
                </th>
                {errors.lname && (<div className="text-danger mx-1 mt-3 errortext">{errors.lname}</div>)}
              </tr>
              <tr>
                <th className='px-5 pt-3'>E-Mail ID :</th>
                <th className='pt-3'>
                  <input 
                    type='text' 
                    className='ent_event_reg_input' 
                    name='email'
                    onChange={handleInputChange}
                  />
                </th>
                {errors.email && (<div className="text-danger mx-1 mt-3 errortext">{errors.email}</div>)}
              </tr>
              <tr>
                <th className='px-5 pt-3'>Contact Number :</th>
                <th className='pt-3'>
                  <input 
                    type='text' 
                    className='ent_event_reg_input' 
                    name='contact'
                    onChange={handleInputChange}
                  />
                </th>
                {errors.contact && (<div className="text-danger mx-1 mt-3 errortext">{errors.contact}</div>)}
              </tr>
              <tr>
                <th className='px-5 pt-3'>Location :</th>
                <th className='pt-3'>
                  <input 
                    type='text' 
                    className='ent_event_reg_input' 
                    name='location'
                    onChange={handleInputChange}
                  />
                </th>
                {errors.location && (<div className="text-danger mx-1 mt-3 errortext">{errors.location}</div>)}
              </tr>
            </table>
            <div className=''>
              <button className='ent_event_register_btn'>Register</button>
            </div>
          </form>
        </div>
      </section>
      <Footer_2 />
    </>
  );
}

export default EntRegisterEvents;
