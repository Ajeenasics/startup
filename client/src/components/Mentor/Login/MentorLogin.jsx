import React, { useState } from 'react'
import './MentorLogin.css'
import Frame from "../../../assets/Frame 40.png";
import MentorLoginImg from '../../../assets/mentor_login_img.png'
import { Link, useNavigate } from "react-router-dom";
import Footer from '../../Footer/Footer';
import Navbar from "react-bootstrap/Container"
import Navbar_2 from '../../commonNavbar/Navbar_2';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';


function MentorLogin() {
  const navigate=useNavigate();

  const [loginData, SetloginData] = useState({email:"",password:""})
  const [errors, setErrors] =useState({email:"",password:""})

  const change=(e)=>{
    const {name,value}=e.target;
    SetloginData({...loginData,[name]:value});
  };
  console.log(loginData,"loginData");

  const formValidating=(fieldName,value)=>{
    if(!value.trim()){
      return `${fieldName} is required`;
    }
    if (fieldName === "Email" && !value.endsWith("@gmail.com")){
      return "Email must be a valid Gmail address";
    }
    if(fieldName === "Password"){
      const passwordRegex=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if(!passwordRegex.test(value)){
        return "Password must contain at least one number,one special character, and one capital letter"
      }
    }
    return "";
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    let errors={};
    let formValid=true;
    errors.email=formValidating("Email",loginData.email)
    errors.password=formValidating("Password",loginData.password)
    formValid=false;
    setErrors(errors);

    if(loginData.email && loginData.password){
      formValid=true;
    }

    if(!errors.email && !errors.password && formValid){
      axiosInstance.post("/loginMentor",loginData)

      .then((result)=>{
        console.log(result,"fulldata");
        if(result.data.status == 200){
          const { data,token }=result.data;
          if(data.adminApproved === true){
          console.log("id",data._id);
          localStorage.setItem("Mentor",data._id);
          localStorage.setItem("MentorToken",token);
          console.log(data);
          alert("Mentor Login Successfully");
          navigate("/mentor/homepage")
          }else{
            alert("Admin Not approved")
          }
        }
        else{
          alert(result.data.msg);
        }
      })
      .catch((err)=>{
        console.log(err);
        alert(err);
      });
    }
  };

  return (
    <>
    <Navbar_2/>
    
    <div className="container">
      <div className="text-center headr">
            <h4 className="  mt-3  mentor_mainheading"> MENTOR LOGIN</h4>
            <h3 className="mentor_sub_h3">Your Journey to Success </h3>
            <h3 className="mentor_sub_h3">Starts Here</h3>
            <div className="  mb-5  mentor_hr_line"></div>

        </div>
        <div className='row px-4'>
      <div className="col mentor_login_img_div">
        <img className="mentor_login_img mb-4" src={MentorLoginImg} />
      </div>
      <div className='col mt-5 px-5'>
      <form className="mentor_loginform" onSubmit={(e)=>{handleSubmit(e);}}>
        <label className="mentor_login_email_label">Your Email</label>
        <input
          type="email"
          name="email"
          onChange={change}
          className="mentor_login_email"/>
                    {errors.email &&(<div className='text-danger errortext'>{errors.email}</div>)}

        <label className="mentor_login_password_label">Password</label>
        <input
          type="password"
          name="password"
          onChange={change}
          className="mentor_login_password"
        />          {errors.password &&(<div className='text-danger errortext'>{errors.password}</div>)}

        <p className="text mt-2"><Link to="/mentor/forgot">Forgot password</Link></p>
        
        <button className="mentor_login_loginbtn" >
          Log In
        </button>
        <p className="mt-3 "> 
          please register first <Link  to="/mentor/signup">Register</Link>
        </p>
      </form>
      </div>
      </div>
    </div>
     <Footer/>

    </>
  )
}

export default MentorLogin