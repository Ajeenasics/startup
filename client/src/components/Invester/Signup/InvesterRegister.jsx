import React, { useState } from "react";
import "./InvesterRegister.css";
import InvestorRegImg from "../../../assets/investor_register.png";
import Footer from "../../Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import Navbar_2 from "../../commonNavbar/Navbar_2";
import axiosMultipartInstance from "../../../BaseAPIs/AxiosMultipartInstance";

function InvesterRegister() {
  const navigate = useNavigate();

  const [investordata, setInvestordata] = useState({
    name: "",
    email: "",
    contact: "",
    organization: "",
    nationality: "",
    password: "",
    confirm_password: "",
    investing_category: "Technology",
    occupation: "",
    description: "",
    address: "",
    profile: "",
    identification_document: "",
  });
  const [profile, setProfileName] = useState(""); // To store profile image name
  const [identification_document, setIdentificationDocument] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    organization: "",
    nationality: "",
    password: "",
    confirm_password: "",
    investing_category: "",
    occupation: "",
    description: "",
    address: "",
    profile: "",
    identification_document: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvestordata({ ...investordata, [name]: value });
  };

  const [errorprofile, setErrorProfile] = useState(null);
  const [errorid_doc, setErrorID_Doc] = useState(null);

  const handleFileProfileChange = (file) => {
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const error = "Only upload JPG JPEG PNG GIF file type ";
      setErrorProfile(error);
      return;
    }
    setErrorProfile(null);
    setInvestordata({ ...investordata, profile: file });
    setProfileName(file.name); // Set the name of the profile image
  };

  const handleFileIdDocChange = (file) => {
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const error = "Only upload JPG JPEG PNG GIF file type ";
      setErrorID_Doc(error);
      return;
    }
    setErrorID_Doc(null);
    setInvestordata({ ...investordata, identification_document: file });
    setIdentificationDocument(file.name); // Set the name of the identification document
  };

  console.log(investordata, "investor_data_1");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    let formValid = true;

    if (!investordata.name.trim()) {
      formValid = false;
      errors.name = "Name is required";
    }
    if (!investordata.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
      console.log("p", formValid);
    } else if (!investordata.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
      console.log("i", formValid);
    }
    if (!investordata.contact.trim()) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(investordata.contact)) {
      formValid = false;
      errors.contact = "Enter a valid 10-digit contact number";
    }
    if (!investordata.organization.trim()) {
      formValid = false;
      console.log("tx", formValid);

      errors.organization = "Organization is required";
    }
    if (!investordata.nationality.trim()) {
      formValid = false;
      console.log("ty", formValid);

      errors.nationality = "Nationality name is required";
    }
    if (!investordata.password.trim()) {
      formValid = false;
      console.log("z", formValid);

      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        investordata.password
      )
    ) {
      formValid = false;
      console.log("z1", formValid);

      errors.password =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!investordata.confirm_password.trim()) {
      formValid = false;
      console.log("z2", formValid);

      errors.confirm_password = "Confirm password is required";
    } else if (investordata.password !== investordata.confirm_password) {
      errors.confirm_password = "Passwords must match";
    }
    if (!investordata.investing_category == null) {
      formValid = false;
      console.log("3", formValid);

      errors.Investing_category = "Investing Category is required";
    }
    if (!investordata.occupation.trim()) {
      formValid = false;
      console.log("z4", formValid);

      errors.occupation = "Occupation is required";
    }
    if (!investordata.description.trim()) {
      formValid = false;
      console.log("z5", formValid);

      errors.description = "Description is required";
    }
    if (!investordata.address.trim()) {
      formValid = false;
      console.log("z6", formValid);

      errors.address = "Address is required";
    }
    if (!investordata.profile) {
      errors.profile = "Upload a profile image";
    }

    if (!investordata.identification_document) {
      errors.identification_document = "Upload a Identification document";
    }

    setErrors(errors);

    if (
      investordata.name &&
      investordata.email &&
      investordata.contact &&
      investordata.organization &&
      investordata.nationality &&
      investordata.password &&
      investordata.investing_category &&
      investordata.occupation &&
      investordata.description &&
      investordata.address &&
      investordata.profile &&
      investordata.identification_document
    ) {
      formValid = true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("name", investordata.name);
      formData.append("email", investordata.email);
      formData.append("contact", investordata.contact);
      formData.append("organization", investordata.organization);
      formData.append("nationality", investordata.nationality);
      formData.append("password", investordata.password);
      formData.append("investing_category", investordata.investing_category);
      formData.append("occupation", investordata.occupation);
      formData.append("description", investordata.description);
      formData.append("address", investordata.address);
      formData.append("files", investordata.profile);
      formData.append("files", investordata.identification_document);
      console.log(formData, "formData");
      try {
        var response;
        if (investordata) {
          response = await axiosMultipartInstance.post(
            "/registerInvestor",
            formData
          );
        }
        console.log("Response:", response);
        if (response.status == 200) {
          alert(response.data.msg);
          navigate("/investor/login");
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", investordata);
    }
  };

  return (
    <>
      <Navbar_2 />
      <div className="container">
        <div className="text-center ">
          <h4 className="  mt-3  inv_mainheading">REGISTER NOW</h4>
          <h3 className="inv_sub_h3">Access Your World </h3>
          <h3 className="inv_sub_h3">of Innovation</h3>
          <div className="  mb-5  inv_hr_line "></div>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="row">
            <div className="col">
              <img className="inv-reg-img" src={InvestorRegImg}></img>
            </div>

            <div className="col">
              <div class="">
                <label id="">Name</label>
                <input
                  class="input-cal input-base"
                  name="name"
                  id="input"
                  onChange={handleInputChange}
                  placeholder=""
                  type="text"
                />
                {errors.name && (
                  <div className="text-danger errortext">{errors.name}</div>
                )}
              </div>
              <div class="   pt-2 inv-reg-email">
                <label id="">E-mail ID</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  name="email"
                  onChange={handleInputChange}
                  placeholder=""
                  type="text"
                />
                {errors.email && (
                  <div className="text-danger errortext">{errors.email}</div>
                )}
              </div>
              <div class=" pt-2 inv-reg-email">
                <label id="">Contact Number</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  name="contact"
                  onChange={handleInputChange}
                  placeholder=""
                  type="text"
                />
                {errors.contact && (
                  <div className="text-danger errortext">{errors.contact}</div>
                )}
              </div>
              <div class=" pt-2 inv-reg-email">
                <label id="">Organization</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  name="organization"
                  onChange={handleInputChange}
                  placeholder=""
                  type="text"
                />
                {errors.organization && (
                  <div className="text-danger errortext">
                    {errors.organization}
                  </div>
                )}
              </div>
              <div class=" pt-2 inv-reg-email">
                <label id="">Nationality</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  name="nationality"
                  onChange={handleInputChange}
                  placeholder=""
                  type="text"
                />
                {errors.nationality && (
                  <div className="text-danger errortext">
                    {errors.nationality}
                  </div>
                )}
              </div>
              <div class=" pt-2 inv-reg-email">
                <label id="">Password</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  name="password"
                  onChange={handleInputChange}
                  placeholder=""
                  type="password"
                />
                {errors.password && (
                  <div className="text-danger errortext">{errors.password}</div>
                )}
              </div>
              <div class=" pt-2">
                <label id="">Confirm Password</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  name="confirm_password"
                  onChange={handleInputChange}
                  placeholder=""
                  type="password"
                />
                {errors.confirm_password && (
                  <div className="text-danger errortext">
                    {errors.confirm_password}
                  </div>
                )}
              </div>
            </div>
            <div className="col mb-5">
              <div class="">
                <label id="">Investing Category</label>
                <select
                  class="input-cal input-base "
                  id="input"
                  onChange={handleInputChange}
                  name="investing_category"
                >
                  <option value="Technology">Technology</option>
                  <option value="E-commerce and Retail">
                    E-commerce and Retail
                  </option>
                  <option value="Health and Wellness">
                    Health and Wellness
                  </option>
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
                {errors.investing_category && (
                  <div className="text-danger errortext">
                    {errors.investing_category}
                  </div>
                )}
              </div>
              <div class=" pt-2">
                <label id="">Occupation</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  onChange={handleInputChange}
                  name="occupation"
                  placeholder=""
                  type="text"
                />
                {errors.occupation && (
                  <div className="text-danger errortext">
                    {errors.occupation}
                  </div>
                )}
              </div>
              <div class=" pt-2">
                <label id="">Description</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  onChange={handleInputChange}
                  name="description"
                  placeholder=""
                  type="text"
                />
                {errors.description && (
                  <div className="text-danger errortext">
                    {errors.description}
                  </div>
                )}
              </div>
              <div class=" pt-2">
                <label id="">Address</label>
                <input
                  class="input-cal input-base"
                  id="input"
                  onChange={handleInputChange}
                  name="address"
                  placeholder=""
                  type="text"
                />
                {errors.address && (
                  <div className="text-danger errortext">{errors.address}</div>
                )}
              </div>
              <div className="inv_file_upload1">
                <label className="pt-3 px-1">Profile</label>
                <label for="file" class="int_reg_file_upload">
                  <div class="icon">Upload</div>
                  <input
                    id="file"
                    type="file"
                    name="profile"
                    onChange={(event) => {
                      handleFileProfileChange(event.target.files[0]);
                    }}
                  />
                </label>
                <label>
                {" "}
                {profile && (
                  <label className="ent_profile_name_p">
                    {profile}
                  </label>
                )}
              </label>
              </div>
              {errors.profile && (
                <div className="text-danger errortext">{errors.profile}</div>
              )}
              {errorprofile && (
                <div className="text-danger errortext">{errorprofile}</div>
              )}

              <div className="inv_file_upload2">
                <label className="pt-3 px-1" placeholder="">
                  Upload Identification Document
                </label>
                <label for="file2" class="int_reg_file_upload">
                  <div class="icon">Upload</div>
                  <input
                    id="file2"
                    type="file"
                    name="identification_document"
                    onChange={(event) => {
                      handleFileIdDocChange(event.target.files[0]);
                    }}
                  />
                </label>
              </div>
              <label>
                {" "}
                {identification_document && (
                  <label className="ent_profile_name_p">
                    {identification_document}
                  </label>
                )}
              </label>
              {errors.identification_document && (
                <div className="text-danger errortext">
                  {errors.identification_document}
                </div>
              )}
              {errorid_doc && (
                <div className="text-danger errortext">{errorid_doc}</div>
              )}
              <p className="mt-3 ">
                Already registered please login{" "}
                <Link to="/investor/login">Login</Link>
              </p>
              <div class=" pt-4">
                <button className="inv-reg-btn">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default InvesterRegister;
