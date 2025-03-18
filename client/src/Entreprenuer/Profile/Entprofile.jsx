import React, { useEffect, useState } from "react";
import "./Entprofile.css";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer_2 from "../../components/Footer/Footer_2";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import axiosMultipartInstance from "../../BaseAPIs/AxiosMultipartInstance";
import { imageUrl } from "../../ImageAPIs/Image_Urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Entprofile({url}) {
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    company_name: "",
    corporate_id_no: "",
    industry_sector: "",
    company_description: "",
    email: "",
    location: "",
    contact: "",
    address: "",
    password: "",
    image: { filename: "" },
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    company_name: "",
    corporate_id_no: "",
    industry_sector: "",
    company_description: "",
    email: "",
    location: "",
    contact: "",
    // username: "",
    address: "",
    image: "",
  });

  console.log(url,);
  const [imgFile, setImgFile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("Enterprenuertoken") == null &&
      localStorage.getItem("Enterprenuer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (userDetails.image?.filename) {
      setImgFile(`${imageUrl}/${image.filename}`);
    }
  }, [userDetails.image]);

  const id = localStorage.getItem("Enterprenuer");
  console.log("eid", id);

  function getData() {
    axiosInstance
      .post(`/viewEntrepreneurById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setUserDetails(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }
  useEffect(() => {
    getData();
  }, [id]);

  const image = userDetails.image;
  console.log(userDetails, "details");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUserDetails({ ...userDetails, [name]: files[0] });

    console.log(files);
  };
  console.log("use de", userDetails);

  const onSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    let formValid = true;

    if (!userDetails.fname.trim()) {
      formValid = false;
      errors.fname = "First Name is required";
    }
    if (!userDetails.lname.trim()) {
      formValid = false;
      errors.lname = "Last Name is required";
    }
    if (!userDetails.company_name.trim()) {
      formValid = false;
      errors.company_name = "Company name is required";
    }
    if (!userDetails.corporate_id_no.trim()) {
      formValid = false;
      errors.corporate_id_no = "Corporate Identification Number is required";
    }
    if (!userDetails.industry_sector.trim()) {
      formValid = false;
      errors.industry_sector = "Industry sector is required";
    }
    if (!userDetails.company_description.trim()) {
      formValid = false;
      errors.company_description = "Company description is required";
    }
    if (!userDetails.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!userDetails.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }
    if (!userDetails.contact == null) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (userDetails.contact.length < 10) {
      errors.contact = "Enter a valid 10-digit contact number";
    }
    if (!userDetails.location.trim()) {
      formValid = false;
      errors.location = "Location is required";
    }
    
    if (!userDetails.address.trim()) {
      formValid = false;
      errors.address = "Address is required";
    }

    setErrors(errors);
    if (
      userDetails.fname &&
      userDetails.lname &&
      userDetails.company_name &&
      userDetails.corporate_id_no &&
      userDetails.industry_sector &&
      userDetails.company_description &&
      userDetails.email &&
      userDetails.location &&
      userDetails.contact &&
      // userDetails.username &&
      userDetails.address &&
      userDetails.image
    ) {
      formValid = true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      try {
        var response;
        response = await axiosMultipartInstance.post(
          `/editEntrepreneurById/${id}`,
          userDetails
        );

        console.log("Response:", response);
        if (response.status == 200) {
          alert(response.data.msg);
          getData();
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Updation Failed", formValid);
      console.log("Data Not entered", userDetails);
    }
  };
console.log(imgFile,"l");
  return (
    <>
      <CommonNavbar />
      <HomepageNavbar />
      <div className="text-center mt-4">
        <div className="text-center">
          <h5 className="your_profile">YOUR PROFILE</h5>
          <h5>Keep Your Profile Updated!</h5>
          <div className="yourprofile_underline mt-3"></div>
        </div>

       <div>
          {imgFile && (
            <img
              className="profile_round mt-5"
              src={imgFile}
              alt="profile_image"
            />
          )}
        </div> 
      </div>

      <div class="container text-center mt-5 mb-4">
        <form onSubmit={onSubmit}>
          <div class="row">
            <div class="col-lg-6 profile-inputtag">
              <input
                type="text"
                placeholder={userDetails.fname}
                value={userDetails.fname}
                name="fname"
                onChange={handleChange}
              ></input>
              {errors.fname && (
                <span className="text-danger">{errors.fname}</span>
              )}

              <input
                className="mt-4"
                type="text"
                placeholder={userDetails.company_name}
                value={userDetails.company_name}
                name="company_name"
                onChange={handleChange}
              ></input>
              {errors.company_name && (
                <span className="text-danger">{errors.company_name}</span>
              )}
              <select
                className="mt-4 select_industry"
                placeholder={userDetails.industry_sector}
                value={userDetails.industry_sector}
                name="industry_sector"
                onChange={handleChange}
              >
                <option value="">Select Industry Sector</option>
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
              {errors.industry_sector && (
                <span className="text-danger">{errors.industry_sector}</span>
              )}
              <input
                className="mt-4"
                type="email"
                placeholder={userDetails.email}
                value={userDetails.email}
                name="email"
                onChange={handleChange}
              ></input>
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={userDetails.contact}
                value={userDetails.contact}
                name="contact"
                onChange={handleChange}
              ></input>
              {errors.contact && (
                <span className="text-danger">{errors.contact}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={userDetails.address}
                value={userDetails.address}
                name="address"
                onChange={handleChange}
              ></input>
              {errors.address && (
                <span className="text-danger">{errors.address}</span>
              )}
            </div>
            <div class="col-lg-6 profile-inputtag">
              <input
                type="text"
                placeholder={userDetails.lname}
                value={userDetails.lname}
                name="lname"
                onChange={handleChange}
              ></input>
              {errors.lname && (
                <span className="text-danger">{errors.lname}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={userDetails.corporate_id_no}
                value={userDetails.corporate_id_no}
                name="corporate_id_no"
                onChange={handleChange}
              ></input>
              {errors.corporate_id_no && (
                <span className="text-danger">{errors.corporate_id_no}</span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={userDetails.company_description}
                value={userDetails.company_description}
                name="company_description"
                onChange={handleChange}
              ></input>
              {errors.company_description && (
                <span className="text-danger">
                  {errors.company_description}
                </span>
              )}
              <input
                className="mt-4"
                type="text"
                placeholder={userDetails.location}
                value={userDetails.location}
                name="location"
                onChange={handleChange}
              ></input>
              {errors.location && (
                <span className="text-danger">{errors.location}</span>
              )}
              {/* <input
                className="mt-4"
                type="text"
                placeholder={userDetails.username}
                value={userDetails.username}
                name="username"
                onChange={handleChange}
              ></input>
              {errors.username && (
                <span className="text-danger">{errors.username}</span>
              )} */}
              <div className="ent_pro_file_upload1">
                <label className="pt-3 px-1">Your image</label>
                <label for="file" class="ent_pro_file_upload">
                  <div class="icon">Upload</div>
                  <input
                    id="file"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <button className="yourprofileupdate_btn mt-5">
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer_2 />
    </>
  );
}

export default Entprofile;
