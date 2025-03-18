import React,{ useState } from 'react'
import './EditStartUpPlan.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import HomepageNavbar from '../../components/commonNavbar/HomepageNavbar'
import Footer_2 from '../../components/Footer/Footer_2';
import axiosInstance from '../../BaseAPIs/AxiosInstance';
import { CommonNavbar } from '../../components/commonNavbar/commonNavbar';

function EditStartUpPlan() {

    const [startupdata, setStartupData]=useState({
        companyName: "",
        category: "",
        audience:"",
        workingArea:"",
        domain:"",
        market:"",
        value:"",
        competitor1: "",
        competitor2: "",
        differentiator: "",
        currentStatus: "",
        expectedHelpCategory:"",
        expectedHelp:"",
        equityAmount: "",
      });
      const [errors, setErrors]=useState({
        companyName: "",
        category: "",
        audience:"",
        workingArea:"",
        domain:"",
        market:"",
        value:"",
        competitor1: "",
        competitor2: "",
        differentiator: "",
        currentStatus: "",
        expectedHelpCategory:"",
        expectedHelp:"",
        equityAmount: "",
      });
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/entrepreneur/login");
      };
      useEffect(() => {
        if (localStorage.getItem("Enterprenuertoken") == null && localStorage.getItem("Enterprenuer") == null) {
          navigate("/");
        }
    }, [navigate]);

    const {id}=useParams();
    console.log(id,"id");

    function getData () {
        axiosInstance.post(`/viewStartupPlanById/${id}`)
        .then ((res)=>{
            console.log(res);
            if (res.status === 200){
                setStartupData(res.data.data);
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("Failed to fetch user details")
        });
      }
    useEffect(()=>{
        getData()
      },[id]);

    

    
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStartupData({ ...startupdata, [name]: value });
      };

      const handleSubmit=async (e)=>{
        e.preventDefault();
    
        let errors={};
        let formValid=true;
    
        if(!startupdata.companyName.trim()){
            formValid=false;
            errors.companyName="Company Required"
        }
        if(!startupdata.category.trim()){
            formValid=false;
            errors.category="Category Required"
        }
        if(!startupdata.audience.trim()){
            formValid=false;
            errors.audience="Audience Required"
        }
        if(!startupdata.workingArea.trim()){
            formValid=false;
            errors.workingArea="Working Area Required"
        }
        if(!startupdata.domain.trim()){
            formValid=false;
            errors.domain="Domain Required"
        }
        if(!startupdata.market.trim()){
            formValid=false;
            errors.market="Market Required"
        }
        if(!startupdata.value.trim()){
            formValid=false;
            errors.value="Value Required"
        }
        if(!startupdata.competitor1.trim()){
            formValid=false;
            errors.competitor1="Competitor1 Required"
        }
        if(!startupdata.competitor2.trim()){
            formValid=false;
            errors.competitor2="Competitor2 Required"
        }
        if(!startupdata.differentiator.trim()){
            formValid=false;
            errors.differentiator="Differentiator Required"
        }
        if(!startupdata.currentStatus.trim()){
            formValid=false;
            errors.currentStatus="CurrentStatus Required"
        }
        if(!startupdata.expectedHelpCategory.trim()){
            formValid=false;
            errors.expectedHelpCategory="Expected Category Required"
        }
        if(!startupdata.expectedHelp.trim()){
            formValid=false;
            errors.expectedHelp="Expected Required"
        }
        if(!startupdata){
            formValid=false;
            errors.equityAmount="Equity Amount Required"
        }
        setErrors(errors);
    
        if(
            startupdata.companyName &&
            startupdata.category &&
            startupdata.audience &&
            startupdata.workingArea &&
            startupdata.domain &&
            startupdata.market &&
            startupdata.value &&
            startupdata.competitor1 &&
            startupdata.competitor2 &&
            startupdata.differentiator &&
            startupdata.currentStatus &&
            startupdata.expectedHelpCategory &&
            startupdata.expectedHelp &&
            startupdata.equityAmount
        ){
            formValid=true;
        }
        if(Object.keys(errors).length === 0 && formValid){
            try {
              var response;
              if (startupdata) {
                response = await axiosInstance.post(
                  `/editStartupPlanById/${id}`,
                  startupdata
                );
              }
              console.log("Response:", response); 
              if(response.status==200){
                alert(response.data.msg)
                navigate("/entrepreneur/viewstartup_plan")
              }
              
            } catch (error) {
              console.error("Error:", error);
              let msg = error?.response?.data?.msg || "Error occurred";
              alert(msg);
            }
          } else {
            console.log("Form is not valid", formValid);
            console.log("Data entered", startupdata);
          }
      }
  return (
    <>
        <CommonNavbar/>
        <HomepageNavbar/>
        <section className='container'>
        <div className="text-center headr">
            <h4 className="  mt-3  startupplan_edit_mainheading"> CREATE YOUR STARTUP</h4>
            <h3 className="startupplan_edit_sub_h3">Your Journey to Success </h3>
            <h3 className="startupplan_edit_sub_h3">Starts Here</h3>
            <div className="  mb-5  startupplan_edit_hr_line"></div>

        </div>
        <form onSubmit={(e) =>{handleSubmit(e);}}>
        <div className="pmi_main_div">
            <table>
              <tr>
                  <td>
                    <label className="px-2">My Company Name</label>
                    <input
                        class="startupplan_edit_input" 
                        placeholder={startupdata.companyName} 
                        value={startupdata.companyName}
                        name="companyName"
                        type="text"
                        onChange={handleInputChange}
                    />
                    {errors.companyName && (
                        <div className="text-danger errortext">
                        {errors.companyName}
                        </div>
                    )}
                  </td>
                  <td>
                    <label className="px-2">Category</label>
                    <select
                        class="startupplan_edit_input" 
                        placeholder={startupdata.category} 
                        value={startupdata.category} 
                        name="category"
                        onChange={handleInputChange}
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
                    {errors.category && (
                        <div className="text-danger errortext">{errors.category}</div>
                    )}
                  </td>
              </tr>
              <tr>
                  <td>
                    <label className="mt-5 px-2">Audience</label>
                        <input
                            class="startupplan_edit_input" 
                            placeholder={startupdata.audience} 
                            value={startupdata.audience} 
                            name="audience"
                            type="text"
                            onChange={handleInputChange}
                        />
                        {errors.audience && (
                            <div className="text-danger errortext">{errors.audience}</div>
                        )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Working Area</label>
                        <input
                            class="startupplan_edit_input" 
                            placeholder={startupdata.workingArea} 
                            value={startupdata.workingArea}
                            name="workingArea"
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
                    <label className="mt-5 px-2">Domain</label>
                        <input
                            class="startupplan_edit_input" 
                            placeholder={startupdata.domain} 
                            value={startupdata.domain}
                            name="domain"
                            type="text"
                            onChange={handleInputChange}
                        />
                        {errors.domain && (
                            <div className="text-danger errortext">{errors.domain}</div>
                        )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Market</label>
                        <input
                            class="startupplan_edit_input" 
                            placeholder={startupdata.market} 
                            value={startupdata.market}
                            name="market"
                            type="text"
                            onChange={handleInputChange}
                        />
                        {errors.market && (
                            <div className="text-danger errortext">{errors.market}</div>
                        )}
                  </td>
              </tr>
              <tr>
                  <td>
                    <label className="mt-5 px-2">Value</label>
                    <input
                        class="startupplan_edit_input" 
                        placeholder={startupdata.value} 
                        value={startupdata.value}
                        name="value"
                        type="text"
                        onChange={handleInputChange}
                    />
                    {errors.value && (
                        <div className="text-danger errortext">{errors.value}</div>
                    )}
                  </td>
                  <td>
                    <label className="mt-5 px-2">Competitor 1</label>
                    <input
                        class="startupplan_edit_input" 
                        placeholder={startupdata.competitor1} 
                        value={startupdata.competitor1}
                        name="competitor1"
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
                            class="startupplan_edit_input" 
                            placeholder={startupdata.competitor2} 
                            value={startupdata.competitor2}
                            name="competitor2"
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
                            class="startupplan_edit_input" 
                            placeholder={startupdata.differentiator} 
                            value={startupdata.differentiator}
                            name="differentiator"
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
                            class="startupplan_edit_input" 
                            placeholder={startupdata.currentStatus} 
                            value={startupdata.currentStatus}
                            name="currentStatus"
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
                    <label className="mt-5 px-2">Expected Help Category</label>
                        <input
                            class="startupplan_edit_input" 
                            placeholder={startupdata.expectedHelpCategory} 
                            value={startupdata.expectedHelpCategory}
                            name="expectedHelpCategory"
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
                        <label className="mt-5 px-2">Expected Help</label>
                        <input
                        class="startupplan_edit_input" 
                        placeholder={startupdata.expectedHelp} 
                        value={startupdata.expectedHelp}
                        name="expectedHelp"
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
                    <label className="mt-5 px-2">Equity Amount</label>
                        <input
                            class="startupplan_edit_input" 
                            placeholder={startupdata.equityAmount} 
                            value={startupdata.equityAmount}
                            name="equityAmount"
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
            </table>
          </div>
        
            <div className='startupplan_edit_btn_div'>
                <button className='startupplan_edit_btn'>Update</button> 
            </div>
            </form>
    </section>
    <Footer_2/>
    </>
  )
}

export default EditStartUpPlan