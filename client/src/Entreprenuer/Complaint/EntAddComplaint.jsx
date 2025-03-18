import React, {useState,useEffect} from 'react'
import './EntAddComplaint.css'
import HomepageNavbar from '../../components/commonNavbar/HomepageNavbar'
import Footer_2 from '../../components/Footer/Footer_2'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/AxiosInstance';

function EntAddComplaint() {
    const navigate=useNavigate();
    const navigateToHome=()=>{
        navigate('/entrepreneur/enthomepage')
    }
    useEffect(() => {
        if (
          localStorage.getItem("Enterprenuertoken") == null &&
          localStorage.getItem("Enterprenuer") == null
        ) {
          navigate("/");
        }
      }, [navigate]);

    const id = localStorage.getItem("Enterprenuer");
    console.log("eid", id);

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
                `/entAddComplaints/${id}`,
                complaintdata
              );
            }
            console.log("Response:", response); 
            if(response.status==200){
              alert(response.data.msg)
              setTimeout(()=>{
                navigateToHome()
              },1000)
              
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
        <HomepageNavbar/>
        <div className="text-center headr mt-3">
            <h3 className="ent_addcomp_sub_h3">Complaints</h3>
            <div className="  mb-5  ent_addcomp_hr_line "></div>
        </div>
        <section className='container mb-5'>
            <form onSubmit={(e)=>{handleSubmit(e);}}>
            <div className='ent_add_complaint'>
                <div className='pt-5 px-5'>
                    <textarea className='ent_compl_text mx-5' placeholder='Message' 
                    onChange={handleInputChange}
                    name='description' ></textarea>
                </div>
                {errors.description && <p className='text-danger ent_compl_err_text'>{errors.description}</p>}
            
            <div className='ent_compl_btn_div'>
                <button className='ent_compl_btn'>Send</button>
                <button className='ent_compl_btn' type='reset' onClick={navigateToHome}>Cancel</button>
            </div>
            </div>
            </form>
        </section>
        <Footer_2/>
    </>
  )
}

export default EntAddComplaint