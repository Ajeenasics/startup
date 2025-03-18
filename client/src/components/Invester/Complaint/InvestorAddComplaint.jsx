import React,{useState,useEffect} from 'react'
import './InvestorAddComplaint.css'
import Footer_2 from '../../Footer/Footer_2'
import InvestorNav from '../InvestorNav/InvestorNav'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../BaseAPIs/AxiosInstance'
import Footer_3 from '../../Footer/Footer_3'

function InvestorAddComplaint() {
    
const navigate=useNavigate();
  const navigateToHome=()=>{
        navigate('/investor/homepage')
    }
    useEffect(() => {
        if (
          localStorage.getItem("Investortoken") == null &&
          localStorage.getItem("Investor") == null
        ) {
          navigate("/");
        }
      }, [navigate]);

    const id = localStorage.getItem("Investor");
    console.log("id", id);

    const[complaintdata,setComplaintData]=useState("");
    const [errors, setErrors]=useState("");

    const handleInputChange=(e)=>{
        const{name,value}=e.target;
        setComplaintData({ ...complaintdata,[name]:value})
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let errors = {};
    
        let formValid = true;

        if (!complaintdata.description) {
            formValid = false;
            errors.description = "Enter your complaint message*";
          }

          setErrors(errors);

    if (
        complaintdata.description 
    ){
        formValid=true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
        
        try {
            var response;
            if (complaintdata) {
              response = await axiosInstance.post(
                `/investorAddComplaints/${id}`,
                complaintdata
              );
            }
            console.log("Response:", response); 
            if(response.status==200){
              alert(response.data.msg)
            //   navigate("/entrepreneur/login")
            }
            
          } catch (error) {
            console.error("Error:", error);
            let msg = error?.response?.data?.msg || "Error occurred";
            alert(msg);
          }
        } else {
          console.log("Form is not valid", formValid);
          console.log("Data entered", complaintdata);
        }
      };
  return (
    <>
        <InvestorNav/>
        <div className="text-center headr mt-3">
            <h3 className="inv_addcomp_sub_h3">Complaints</h3>
            <div className="  mb-5  inv_addcomp_hr_line "></div>
        </div>
        <section className='container mb-5'>
          <form onSubmit={(e)=>{handleSubmit(e);}}>
            <div className='inv_add_complaint'>
                <div className='pt-5 px-5'>
                    <textarea className='inv_compl_text mx-5' name='description' 
                    onChange={handleInputChange}
                    placeholder='Message'></textarea>
                </div>
                {errors.description && <p className='text-danger ent_compl_err_text'>{errors.description}</p>}

            <div className='inv_compl_btn_div '>
                <button className='inv_compl_btn'>Send</button>
            </div>
            </div>
            </form>
        </section>
        <Footer_3/>
    </>
  )
}

export default InvestorAddComplaint

/*<button className='inv_compl_btn' onChange={navigateToHome}>Cancel</button>*/
