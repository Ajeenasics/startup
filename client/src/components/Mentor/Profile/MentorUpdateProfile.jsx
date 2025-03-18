import React, { useEffect, useState } from "react";
import "./MentorUpdateProfile.css";
import { CommonNavbar } from "../../commonNavbar/commonNavbar";
import Navbar_2 from "../../commonNavbar/Navbar_2";
import Footer_2 from "../../Footer/Footer_2";
import inv_camera_icon from "../../../assets/inv_camera_icon.png";
import axiosMultipartInstance from "../../../BaseAPIs/AxiosMultipartInstance";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../../ImageAPIs/Image_Urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MentorNav from "../MentorNav/MentorNav";
import Footer_4 from "../../Footer/Footer_4";

function MentorUpdateProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("MentorToken") == null &&
      localStorage.getItem("Mentor") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [mentordata, setMentorData] = useState({
    name: "",
    email: "",
    contact: "",
    expertise_area: "",
    description: "",
    subscription_amount: "",
    demo_videolink: "",
    profile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    expertise_area: "",
    description: "",
    subscription_amount: "",
    demo_videolink: "",
    profile: "",
  });

  const [imgFile, setImgFile] = useState({});

  useEffect(() => {
    if (mentordata.profile?.filename) {
      setImgFile(`${imageUrl}/${mentordata.profile.filename}`);
    }
  }, [mentordata.profile]);

  const id = localStorage.getItem("Mentor");
  console.log("Mentor_id", id);

  function getData() {
    axiosInstance
      .post(`/viewMentorById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setMentorData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }
  useEffect(() => {
    getData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentordata, [name]: value });
  };
  console.log(mentordata, "investorData");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setMentorData({ ...mentordata, [name]: files[0] });

    console.log(files);
  };
  console.log("use de", mentordata);

  const onSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    let formValid = true;

    if (!mentordata.name.trim()) {
      formValid = false;
      errors.name = "Name is required";
    }
    if (!mentordata.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!mentordata.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }

    if (!mentordata.expertise_area.trim()) {
      formValid = false;
      errors.expertise_area = "Investing Category is required";
    }

    if (!mentordata.description.trim()) {
      formValid = false;
      errors.description = "Description is required";
    }

    setErrors(errors);

    if (
      mentordata.name &&
      mentordata.email &&
      mentordata.contact &&
      mentordata.investing_category &&
      mentordata.description &&
      mentordata.subscription_amount
    ) {
      formValid = true;
    }
    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("name", mentordata.name);
      formData.append("email", mentordata.email);
      formData.append("contact", mentordata.contact);
      formData.append("expertise_area", mentordata.expertise_area);
      formData.append("description", mentordata.description);
      formData.append("subscription_amount", mentordata.subscription_amount);
      formData.append("files", mentordata.demo_videolink);
      formData.append("files", mentordata.profile);
      console.log(formData, "formData");
      try {
        var response;
        if (mentordata) {
          response = await axiosMultipartInstance.post(
            `/editMentorById/${id}`,
            formData
          );
        }
        console.log("Response:", response);
        if (response.status == 200) {
          alert(response.data.msg);
          getData();
        }
      } catch (error) {
        console.log(error);
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", editMentorById);
    }
  };
  return (
    <>
      <CommonNavbar />
      <MentorNav />
      <div className="text-center mt-4">
        <div className="text-center">
          <h5 className="men_updateprofile_heading">UPDATE YOUR PROFILE</h5>
          <h5>Your Journey to Success</h5>
          <h5>Starts Here</h5>
          <div className="men_profile_underline mt-3"></div>
        </div>
      </div>
      <div class="container text-center mt-5 mb-4">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
        <div className='mb-5'>
        {imgFile && <img className='men_profile_round mt-1 mb-5' src={imgFile} alt="profile_image" />}
      </div>
          <div className="mb-5">
            <label for="profile" class="men_profile_upload">
              <div class="icon">
                <img src={inv_camera_icon} />
              </div>
              <input
                id="profile"
                type="file"
                name="profile"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div class="row">
            <div class="col-lg-6 profile-inputtag">
              <input
                type="text"
                placeholder={mentordata.name}
                value={mentordata.name}
                name="name"
                onChange={handleChange}
              ></input>
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}

              <input
                className="mt-4"
                type="email"
                placeholder={mentordata.email}
                value={mentordata.email}
                name="email"
                onChange={handleChange}
              ></input>
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}

              <input
                className="mt-4"
                type="text"
                placeholder={mentordata.contact}
                value={mentordata.contact}
                name="contact"
                onChange={handleChange}
              ></input>
              {errors.contact && (
                <span className="text-danger">{errors.contact}</span>
              )}

              <div className="men_updateid_div_upload">
                <label className="pt-3 men_updateid_label" placeholder="">
                  Update Demo Video link
                </label>
                <label for="id_doc" class="men_updateid_upload">
                  <div class="icon">Upload</div>
                  <input
                    id="id_doc"
                    type="file"
                    name="demo_videolink"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <div class="col-lg-6 profile-inputtag">
              <select
                className="men_update_profile_expertise"
                placeholder={mentordata.expertise_area}
                value={mentordata.expertise_area}
                name="expertise_area"
                onChange={handleChange}
              >
                <option value="">Select Investing Category</option>
                <option value="Technology">Technology</option>
                <option value="E-commerce and Retail">
                  E-commerce and Retail
                </option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Finance and Insurance">
                  Finance and Insurance
                </option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Media and Entertainment">
                  Media and Entertainment
                </option>
                <option value="Transportation and Logistics">
                  Transportation and Logistics
                </option>
                <option value="Real Estate">Real Estate</option>
                <option value="Environmental and Energy">
                  Environmental and Energy
                </option>
                <option value="Consumer Services">Consumer Services</option>
                <option value="Fashion and Lifestyle">
                  Fashion and Lifestyle
                </option>
              </select>
              {errors.expertise_area && (
                <span className="text-danger">{errors.expertise_area}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={mentordata.description}
                value={mentordata.description}
                name="description"
                onChange={handleChange}
              ></input>
              {errors.description && (
                <span className="text-danger">{errors.description}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={mentordata.subscription_amount}
                value={mentordata.subscription_amount}
                name="subscription_amount"
                onChange={handleChange}
              ></input>
              {errors.subscription_amount && (
                <span className="text-danger">
                  {errors.subscription_amount}
                </span>
              )}

              <button className="men_profileupdate_btn mt-4">
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer_4/>
    </>
  );
}

export default MentorUpdateProfile;
