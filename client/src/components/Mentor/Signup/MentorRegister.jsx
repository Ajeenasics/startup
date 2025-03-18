import React, { useState } from 'react'
import './MentorRegister.css'
import MentorRegImg from '../../../assets/mentor_register_img.png'
import Footer from '../../Footer/Footer'
import Navbar_2 from '../../commonNavbar/Navbar_2'
import axiosMultipartInstance from '../../../BaseAPIs/AxiosMultipartInstance';
import { useNavigate ,Link} from "react-router-dom";




function MentorRegister() {
  const navigate=useNavigate();

  const [mentordata, setMentorData] = useState({
        name:"",
        email:"",
        contact:"",
        password:"",
        confirm_password:"",
        expertise_area:"",
        description:"",
        subscription_amount:"",
        demo_videolink:"",
        profile:"",
    
  });

  const [errors, setErrors] = useState({
        name:"",
        email:"",
        contact:"",
        password:"",
        confirm_password:"",
        expertise_area:"",
        description:"",
        subscription_amount:"",
        demo_videolink:"",
        profile:"",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentordata, [name]: value });
  };

  const [profile , setprofile]=useState("")
  const [demo_videolink , setdemo_videolink]=useState(null)


  const [error , setError]=useState(null)
  const [errorVideo , setErrorVideo]=useState(null)



  const handleFileChange = (profile) => {
    if(!profile.name.match(/\.(jpg|jpeg|png|gif)$/)){
      const error="Only upload JPG JPEG PNG GIF file type ";
      setError(error);
      return
    }
    setError(null)
    setMentorData({...mentordata,profile});
    setprofile(profile.name)
  };

  const handleFileVideoChange = (demo_videolink) => {
    if(!demo_videolink.name.match(/\.(mp4|mov|wmv|avi)$/)){
      const error="Only upload MP4 MOV WMV AVI file type ";
      setErrorVideo(error);
      return
    }
    setErrorVideo(null)
    setMentorData({...mentordata,demo_videolink});
    setdemo_videolink(demo_videolink.name)

  };


  
  

  console.log(mentordata,"mentor_data_1");

  const handleSubmit = async (e) => {
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
    if (!mentordata.contact.trim()) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(mentordata.contact)) {
      formValid = false;
      errors.contact = "Enter a valid 10-digit contact number";
    }
    if (!mentordata.password.trim()) {
      formValid = false;
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        mentordata.password
      )
    ) {
      formValid = false;
      errors.password =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!mentordata.confirm_password.trim()) {
      formValid = false;
      errors.confirm_password = "Re-Enter the password";
    }else if(mentordata.password!==mentordata.confirm_password){
      errors.confirm_password="Passwords must match"
    }
    if (!mentordata.expertise_area.trim()) {
      formValid = false;
      errors.expertise_area = "Expertise Area is required";
    }
    if (!mentordata.subscription_amount.trim()) {
      formValid = false;
      errors.subscription_amount = "Subscription Amount is required";
    }
    if (!mentordata.description.trim()) {
      formValid = false;
      errors.description = "Description is required";
    }

    if(!mentordata.profile){
      formValid=false;
      errors.profile="Profile Pic Required"
    }
    if(!mentordata.demo_videolink){
      formValid=false;
      errors.profile="Demo Video Required"
    }
    
  
  setErrors(errors);

  if(
    mentordata.name &&
    mentordata.email &&
    mentordata.contact &&
    mentordata.password &&
    mentordata.expertise_area &&
    mentordata.description &&
    mentordata.subscription_amount 
    ){
      formValid=true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("name", mentordata.name);
      formData.append("email", mentordata.email);
      formData.append("contact", mentordata.contact);
      formData.append("password", mentordata.password);
      formData.append("confirm_password", mentordata.confirm_password);
      formData.append("expertise_area", mentordata.expertise_area);
      formData.append("subscription_amount", mentordata.subscription_amount);
      formData.append("description", mentordata.description);
      formData.append("files", mentordata.demo_videolink);      
      formData.append("files", mentordata.profile);
      console.log(formData,"formData");
      try {
        var response;
        if (mentordata) {
          response = await axiosMultipartInstance.post(
            "/registerMentor",
            formData
          );
        }
        console.log("Response:", response); 
        if(response.status==200){
          alert(response.data.msg)
          navigate("/mentor/login")
        }
        
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Please Fill All Data", mentordata);
    }
  }


  
  return (
    <>
  <Navbar_2/>

        <div className='container mb-5'>
        <div className="text-center headr">
            <h4 className="  mt-3  mentor_mainheading">MENTOR REGISTRATION</h4>
            <h3 className="mentor_sub_h3">Access Your World </h3>
            <h3 className="mentor_sub_h3">of Innovation</h3>
            <div className="  mb-5  mentor_hr_line "></div>
        </div>
        <form onSubmit={(e) =>{handleSubmit(e);}}>
        <div className='row'>
          <div className='col'>
          <img className=' mentor_reg_img' src={MentorRegImg}></img>

          </div>
          
          <div className='col'>
            <div class="">
            <label id="">Name</label>
              <input class="input-cal input-base" 
              name="name" 
              id="mentor_input" 
              placeholder="" 
              type="text"
              onChange={handleInputChange} />
              {errors.name && (<div className="text-danger errortext">{errors.name}</div>)}

            </div>
            
              <div class="pt-2 inv-reg-email">
              <label id="">E-mail ID</label>
                <input class="input-cal input-base" 
                id="mentor_input" 
                name="email" 
                placeholder="" 
                type="email"
                onChange={handleInputChange}/>
                {errors.email && (<div className="text-danger errortext">{errors.email}</div>)}

              </div>
              <div class=" pt-2 inv-reg-email">
              <label id="">Contact Number</label>
                <input class="input-cal input-base" 
                id="mentor_input" 
                name="contact" 
                placeholder="" 
                type="number"
                onChange={handleInputChange}/>
                {errors.contact && (<div className="text-danger errortext">{errors.contact}</div>)}

              </div>
              <div class=" pt-2 inv-reg-email">
              <label id="">Password</label>
                <input class="input-cal input-base" 
                id="mentor_input" 
                name="password" 
                placeholder="" 
                type="password"
                onChange={handleInputChange}/>
                {errors.password && (<div className="text-danger errortext">{errors.password}</div>)}

              </div>
              <div class=" pt-2">
              <label id="">Confirm Password</label>
                <input class="input-cal input-base" 
                id="mentor_input" 
                name="confirm_password" 
                placeholder=""
                 type="password"
                 onChange={handleInputChange}/>
                {errors.confirm_password && (<div className="text-danger errortext">{errors.confirm_password}</div>)}

              </div>
            </div>
            <div className='col'>
              <div class="">
              <label id="">Expertise Area</label>
                <select class="input-cal input-base " id="mentor_input" onChange={handleInputChange}  name="expertise_area">
                  <option hidden="">Select</option>
                <option value="Technology">Technology</option>
                <option value="E-commerce and Retail">E-commerce and Retail</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Finance and Insurance">Finance and Insurance</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Media and Entertainment">Media and Entertainment</option>
                <option value="Transportation and Logistics">Transportation and Logistics</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Environmental and Energy">Environmental and Energy</option>
                <option value="Consumer Services">Consumer Services</option>
                <option value="Fashion and Lifestyle">Fashion and Lifestyle</option>

                </select>
                {errors.expertise_area && (<div className="text-danger errortext">{errors.expertise_area}</div>)}

              </div>
              <div class=" pt-2">
              <label id="">Description</label>
                <input class="input-cal input-base" 
                id="mentor_input" 
                name="description" 
                placeholder="" 
                type="text"
                onChange={handleInputChange} />
                {errors.description && (<div className="text-danger errortext">{errors.description}</div>)}

              </div>
              <div class=" pt-2">
              <label id="">Subscription Amount</label>
                <input class="input-cal input-base" 
                id="mentor_input" 
                name="subscription_amount" 
                placeholder="" 
                type="number"
                onChange={handleInputChange} />
                {errors.subscription_amount && (<div className="text-danger errortext">{errors.subscription_amount}</div>)}

              </div>
              <div class="men_file_upload1">
              {demo_videolink && <div>{demo_videolink}</div>} {/* Display profile image name */}
              <label className='pt-3 px-1' id="">Demo Video </label>
              <label for="demo_video" class="men_reg_file_upload">
                  <div class="icon">Upload</div>
                  <input id="demo_video" type="file"  name="demo_videolink" onChange={(event)=>{handleFileVideoChange(event.target.files[0])}}  />
                </label>
                
              </div>
              {errors.profile && (<div className="text-danger errortext">{errors.profile}</div>)}
              {errorVideo && (<div className="text-danger errortext">{errorVideo}</div>)}

              <div class="men_file_upload1">
              <label className='pt-3 px-1' id="">Profile</label>
              {profile && <div>{profile}</div>} {/* Display profile image name */}
              <label for="profile" class="men_reg_file_upload">
                  <div class="icon">Upload</div>
                  <input id="profile" type="file"  name="profile" onChange={(event)=>{handleFileChange(event.target.files[0])}}  />
                </label>
                
              </div>
              {errors.profile && (<div className="text-danger errortext">{errors.profile}</div>)}
              {error && (<div className="text-danger errortext">{error}</div>)}

              <p className="mt-3 "> 
              Already registered please login <Link  to="/mentor/login">Login</Link>
            </p>
            </div>
            
            <div class=" pt-2">
              <button className='mentor_reg_btn mb-5'>Register</button> 
            
              </div>
          </div>
          </form>

      </div>
      <div className='mt-5 pt-5'>    <Footer/>
      </div>
    </>
  )
}

export default MentorRegister