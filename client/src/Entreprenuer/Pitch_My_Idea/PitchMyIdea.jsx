import React, { useState, useEffect } from "react";
import "./PitchMyIdea.css";
import { useNavigate } from "react-router-dom";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer_2 from "../../components/Footer/Footer_2";
import axiosInstance from "../../BaseAPIs/AxiosInstance";

function PitchMyIdea() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("Enterprenuertoken") == null &&
      localStorage.getItem("Enterprenuer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  const id = localStorage.getItem("Enterprenuer");
  const [userDetails, setUserDetails] = useState({});
  const [pmidata, setPmidata] = useState({
    epId: id,
    companyName: "",
    category: "",
    audience: "",
    workingArea: "",
    domain: "",
    market: "",
    value: "",
    competitor1: "",
    competitor2: "",
    differentiator: "",
    currentStatus: "",
    expectedHelpCategory: "",
    expectedHelp: "",
    equityAmount: "",
    Isactive: false,
    status: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .post(`/viewEntrepreneurById/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setUserDetails(res.data.data);
          setPmidata((prevState) => ({
            ...prevState,
            companyName: res.data.data.company_name,
            category: res.data.data.industry_sector,
          }));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user details", err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPmidata({ ...pmidata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    let formValid = true;

    const requiredFields = [
      "audience",
      "workingArea",
      "domain",
      "market",
      "value",
      "competitor1",
      "competitor2",
      "differentiator",
      "currentStatus",
      "expectedHelpCategory",
      "expectedHelp",
      "equityAmount",
    ];

    requiredFields.forEach((field) => {
      if (!pmidata[field].trim()) {
        formValid = false;
        formErrors[field] = `${field} is required`;
      }
    });

    setErrors(formErrors);

    if (formValid) {
      try {
        const response = await axiosInstance.post(
          `/pitchMyIdeaAddCompany/${id}`,
          pmidata
        );

        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/entrepreneur/enthomepage");
        }
      } catch (error) {
        console.error("Error:", error);
        const msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", pmidata);
    }
  };

  return (
    <>
      <HomepageNavbar />
      <section className="container">
        <div className="text-center headr">
          <h4 className="mt-3 pmi_mainheading">CREATE YOUR STARTUP</h4>
          <h3 className="pmi_sub_h3">Your Journey to Success</h3>
          <h3 className="pmi_sub_h3">Starts Here</h3>
          <div className="mb-5 pmi_hr_line"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pmi_main_div">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="px-2">My Company Name</label>
                    <input
                      className="pmi_input"
                      name="companyName"
                      placeholder={userDetails.company_name}
                      value={userDetails.company_name}
                      type="text"
                      readOnly
                    />
                  </td>
                  <td>
                    <label className="px-2">Category</label>
                    <select
                      className="pmi_input"
                      name="category"
                      value={userDetails.industry_sector}
                      readOnly
                      disabled
                    >
                      <option value="">Select Industry Sector</option>
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
                      <option value="Consumer Services">
                        Consumer Services
                      </option>
                      <option value="Fashion and Lifestyle">
                        Fashion and Lifestyle
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="mt-5 px-2">Audience</label>
                    <input
                      className="pmi_input"
                      name="audience"
                      placeholder="A defined audience"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.audience && (
                      <div className="text-danger errortext">
                        {errors.audience}
                      </div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Working Area</label>
                    <input
                      className="pmi_input"
                      name="workingArea"
                      placeholder="Solve a problem"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.workingArea && (
                      <div className="text-danger errortext">
                        {errors.workingArea}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="mt-5 px-2">Our Formula</label>
                    <input
                      className="pmi_input"
                      name="domain"
                      placeholder="Secret sauce"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.domain && (
                      <div className="text-danger errortext">
                        {errors.domain}
                      </div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Market</label>
                    <input
                      className="pmi_input"
                      name="market"
                      placeholder="Defined market"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.market && (
                      <div className="text-danger errortext">
                        {errors.market}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="mt-5 px-2">Value</label>
                    <input
                      className="pmi_input"
                      name="value"
                      placeholder="Defined value"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.value && (
                      <div className="text-danger errortext">
                        {errors.value}
                      </div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Competitor 1</label>
                    <input
                      className="pmi_input"
                      name="competitor1"
                      placeholder="Competitor 1"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.competitor1 && (
                      <div className="text-danger errortext">
                        {errors.competitor1}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="mt-5 px-2">Competitor 2</label>
                    <input
                      className="pmi_input"
                      name="competitor2"
                      placeholder="Competitor 2"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.competitor2 && (
                      <div className="text-danger errortext">
                        {errors.competitor2}
                      </div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Differentiator</label>
                    <input
                      className="pmi_input"
                      name="differentiator"
                      placeholder="One key differentiator"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.differentiator && (
                      <div className="text-danger errortext">
                        {errors.differentiator}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="mt-5 px-2">Current Status</label>
                    <input
                      className="pmi_input"
                      name="currentStatus"
                      placeholder="Current state of product/team"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.currentStatus && (
                      <div className="text-danger errortext">
                        {errors.currentStatus}
                      </div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Expected Help</label>
                    <input
                      className="pmi_input"
                      name="expectedHelpCategory"
                      placeholder="The ask"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.expectedHelpCategory && (
                      <div className="text-danger errortext">
                        {errors.expectedHelpCategory}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="mt-5 px-2">To Do</label>
                    <input
                      className="pmi_input"
                      name="expectedHelp"
                      placeholder="What you would do with the ask"
                      type="text"
                      onChange={handleInputChange}
                    />
                    {errors.expectedHelp && (
                      <div className="text-danger errortext">
                        {errors.expectedHelp}
                      </div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Equity Percentage</label>
                    <input
                      className="pmi_input"
                      name="equityAmount"
                      placeholder="Amount of equity offering"
                      type="number"
                      onChange={handleInputChange}
                    />
                    {errors.equityAmount && (
                      <div className="text-danger errortext">
                        {errors.equityAmount}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pmi_btn_div">
            <button className="pmi_btn">Pitch My Idea</button>
          </div>
        </form>
      </section>
      <Footer_2 />
    </>
  );
}

export default PitchMyIdea;
