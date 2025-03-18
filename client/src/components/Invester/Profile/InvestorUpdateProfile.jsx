import React, { useEffect, useState } from "react";
import "./InvestorUpdateProfile.css";
import { CommonNavbar } from "../../commonNavbar/commonNavbar";
import Navbar_2 from "../../commonNavbar/Navbar_2";
import Footer_2 from "../../Footer/Footer_2";
import inv_camera_icon from "../../../assets/inv_camera_icon.png";
import axiosMultipartInstance from "../../../BaseAPIs/AxiosMultipartInstance";
import axiosInstance from "../../../BaseAPIs/AxiosInstance";
import { imageUrl } from "../../../ImageAPIs/Image_Urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InvestorNav from "../InvestorNav/InvestorNav";
import Footer_3 from "../../Footer/Footer_3";

function InvestorUpdateProfile({ url }) {

  const navigate = useNavigate();


  useEffect(() => {
    if (
      localStorage.getItem("InvestorToken") == null &&
      localStorage.getItem("Investor") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [investorDetails, setInvestorDetails] = useState({
    name: "",
    email: "",
    contact: "",
    organization: "",
    nationality: "",
    investing_category: "",
    occupation: "",
    description: "",
    address: "",
    profile: { filename: "" },
    identification_document: { filename: "" },
  });
  console.log(url);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    organization: "",
    nationality: "",
    investing_category: "",
    occupation: "",
    description: "",
    address: "",
    profile: "",
    identification_document: "",
  });


  const profile = investorDetails.profile;
  console.log(investorDetails, "details");

  const [imgFile, setImgFile] = useState("");

  useEffect(() => {
    if (investorDetails.profile?.filename) {
      setImgFile(`${url}/${profile.filename}`);
    }
  }, [investorDetails.profile]);

  const id = localStorage.getItem("Investor");
  console.log("Investor_id", id);

  function getData() {
    axiosInstance
      .post(`/viewInvestorById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setInvestorDetails(res.data.data);
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
    setInvestorDetails({ ...investorDetails, [name]: value });
  };
  console.log(investorDetails, "investorData");
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setInvestorDetails({ ...investorDetails, [name]: files[0] });

    console.log(files);
  };
  console.log("use de", investorDetails);

  const onSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    let formValid = true;

    if (!investorDetails.name.trim()) {
      formValid = false;
      errors.name = "Name is required";
    }
    if (!investorDetails.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!investorDetails.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }
    // if (!investorDetails.contact.trim()) {
    //   formValid = false;
    //   errors.contact = "Contact number is required";
    // } else if (investorDetails.contact.length <=9) {
    //   errors.contact = "Enter a valid 10-digit contact number";
    // }
    if (!investorDetails.organization.trim()) {
      formValid = false;
      errors.organization = "Organization is required";
    }
    if (!investorDetails.nationality.trim()) {
      formValid = false;
      errors.nationality = "Nationality name is required";
    }
    if (!investorDetails.investing_category.trim()) {
      formValid = false;
      errors.investing_category = "Investing Category is required";
    }
    if (!investorDetails.occupation.trim()) {
      formValid = false;
      errors.occupation = "Occupation is required";
    }
    if (!investorDetails.description.trim()) {
      formValid = false;
      errors.description = "Description is required";
    }
    if (!investorDetails.address.trim()) {
      formValid = false;
      errors.address = "Address is required";
    }

    setErrors(errors);

    if (
      investorDetails.name &&
      investorDetails.email &&
      investorDetails.contact &&
      investorDetails.organization &&
      investorDetails.nationality &&
      investorDetails.investing_category &&
      investorDetails.occupation &&
      investorDetails.description &&
      investorDetails.address &&
      investorDetails.profile 
    ) {
      formValid = true;
    }
    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("name", investorDetails.name);
      formData.append("email", investorDetails.email);
      formData.append("contact", investorDetails.contact);
      formData.append("organization", investorDetails.organization);
      formData.append("nationality", investorDetails.nationality);
      formData.append("password", investorDetails.password);
      formData.append("investing_category", investorDetails.investing_category);
      formData.append("occupation", investorDetails.occupation);
      formData.append("description", investorDetails.description);
      formData.append("address", investorDetails.address);
      formData.append("profile", investorDetails.profile);


      console.log(formData, "formData");
      try {
        var response;
        if (investorDetails) {
          response = await axiosMultipartInstance.post(
            `/editInvestorById/${id}`,
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
      console.log("Data entered", investorDetails);
    }
  };

  return (
    <>
      <CommonNavbar />
      <InvestorNav />
      <div className="text-center mt-4">
        <div className="text-center">
          <h5 className="inv_updateprofile_heading">UPDATE YOUR PROFILE</h5>
          <h5>Your Journey to Success</h5>
          <h5>Starts Here</h5>
          <div className="inv_profile_underline mt-3"></div>
        </div>
      </div>
      <div class="container text-center mt-5 mb-4">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div className=" mb-5">
            {imgFile && (
              <img
                className="inv_profile_round mt-1 mb-5"
                src={imgFile}
                alt="profile_image"
              />
            )}
          </div>
          <div className="mb-5">
            <label for="profile" class="inv_profile_upload">
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
                placeholder={investorDetails.name}
                value={investorDetails.name}
                name="name"
                onChange={handleChange}
              ></input>
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}

              <input
                className="mt-4"
                type="email"
                placeholder={investorDetails.email}
                value={investorDetails.email}
                name="email"
                onChange={handleChange}
              ></input>
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={investorDetails.organization}
                value={investorDetails.organization}
                name="organization"
                onChange={handleChange}
              ></input>
              {errors.organization && (
                <span className="text-danger">{errors.organization}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={investorDetails.nationality}
                value={investorDetails.nationality}
                name="nationality"
                onChange={handleChange}
              ></input>
              {errors.nationality && (
                <span className="text-danger">{errors.nationality}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={investorDetails.address}
                value={investorDetails.address}
                name="address"
                onChange={handleChange}
              ></input>
              {errors.address && (
                <span className="text-danger">{errors.address}</span>
              )}
              <input
              className="mt-4"
              type="text"
              placeholder={investorDetails.description}
              value={investorDetails.description}
              name="description"
              onChange={handleChange}
            ></input>
            {errors.description && (
              <span className="text-danger">{errors.description}</span>
            )}
              
              
            </div>
            
            <div class="col-lg-6 profile-inputtag">
              <select
                className="inv_update_profile_industry_sector"
                placeholder={investorDetails.investing_category}
                value={investorDetails.investing_category}
                name="investing_category"
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

                        {errors.investing_category  && (
                            <span className="text-danger">{errors.investing_category}</span>
                          )}
                        
                        <input className='mt-4' 
                        type='text' 
                        placeholder={investorDetails.occupation}
                        value={investorDetails.occupation}
                        name="occupation"
                        onChange={handleChange}
                        
                        ></input>
                        {errors.occupation  && (
                            <span className="text-danger">{errors.occupation}</span>
                          )}
                        <input className='mt-4' 
                        type='text' 
                        placeholder={investorDetails.description}
                        value={investorDetails.description}
                        name="description"
                        onChange={handleChange}
                        
                        ></input>
                        {errors.description  && (
                            <span className="text-danger">{errors.description}</span>
                          )}
                        <input className='mt-4' 
                        type='text' 
                        placeholder={investorDetails.address}
                        value={investorDetails.address}
                        name="address"
                        onChange={handleChange}
                        
                        ></input>
                        {errors.address  && (
                            <span className="text-danger">{errors.address}</span>
                          )}
                        
                        {/* <div className='inv_updateid_div_upload'>
            <label className='pt-3 inv_updateid_label' placeholder=''>Update Identification Document</label>
            <label for="id_doc" class="inv_updateid_upload">
                <div class="icon">Upload</div>
                <input id="id_doc"  type="file"  name="identification_document" onChange={handleFileChange}  />
              </label>
             
            </div> */}

              {errors.investing_category && (
                <span className="text-danger">{errors.investing_category}</span>
              )}

              <input
                className="mt-4"
                type="text"
                placeholder={investorDetails.contact}
                value={investorDetails.contact}
                name="contact"
                onChange={handleChange}
              ></input>
              {errors.contact && (
                <span className="text-danger">{errors.contact}</span>
              )}
              
              <input
                className="mt-4"
                type="text"
                placeholder={investorDetails.occupation}
                value={investorDetails.occupation}
                name="occupation"
                onChange={handleChange}
              ></input>
              {errors.occupation && (
                <span className="text-danger">{errors.occupation}</span>
              )}
             
              
              <div className="mt-4">
            <button className="yourprofileupdate_btn">
                Update Profile
              </button>
            </div>
            </div>
          </div>
        </form>
      </div>
      <Footer_3 />
    </>
  );
}

export default InvestorUpdateProfile;
