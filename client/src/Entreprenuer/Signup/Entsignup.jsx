import React,{useState} from "react";
import "./Entsignup.css";
import Entbodyimage from "../../assets/Entregbodyimage.png";
import { useNavigate,Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar_2 from "../../components/commonNavbar/Navbar_2";
import axiosMultipartInstance from "../../BaseAPIs/AxiosMultipartInstance";


function Entsignup() {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/entrepreneur/login");
  };
  
  const [data, setData] = useState({
    fname: "",
    lname: "",
    company_name:"",
    corporate_id_no:"",
    industry_sector:"",
    company_description:"",
    email: "",
    location: "",
    contact: "",
    // username: "",
    address: "",
    password: "",
    image: "",
    c_password: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    company_name:"",
    corporate_id_no:"",
    industry_sector:"",
    company_description:"",
    email: "",
    location: "",
    contact: "",
    // username: "",
    address: "",
    password: "",
    image: "",
    c_password: "",
  });

  const [error , setError]=useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  
const [profilename,setProfileName]=useState();

  const handleFileChange = (image) => {
    if(!image.name.match(/\.(jpg|jpeg|png|gif)$/)){
      const error="Only JPG JPEG PNG GIF images upload";
      setError(error);
      return
    }
    setError(null)
    console.log(image,"image");
    const name=image.name
    setProfileName(name)
    setData({...data,image});

  };

  console.log(data,"kkk");


  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    let formValid = true;

    if (!data.fname.trim()) {
      formValid = false;
      errors.fname = "First Name is required";
    }
    if (!data.lname.trim()) {
      formValid = false;
      errors.lname = "Last Name is required";
    }
    if (!data.company_name.trim()) {
      formValid = false;
      errors.company_name = "Company name is required";
    }
    if (!data.corporate_id_no.trim()) {
      formValid = false;
      errors.corporate_id_no = "Corporate Identification Number is required";
    }
    if (!data.industry_sector.trim()) {
      formValid = false;
      errors.industry_sector = "Industry sector is required";
    }
    if (!data.company_description.trim()) {
      formValid = false;
      errors.company_description = "Company description is required";
    }
    if (!data.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!data.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }
    if (!data.location.trim()) {
      formValid = false;
      errors.location = "Location is required";
    }
    if (!data.contact.trim()) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(data.contact)) {
      formValid = false;
      errors.contact = "Enter a valid 10-digit contact number";
    }
    // if (!data.username.trim()) {
    //   formValid = false;
    //   errors.username = "Username is required";
    // }
    if (!data.address.trim()) {
      formValid = false;
      errors.address = "Address is required";
    }
    if (!data.password.trim()) {
      formValid = false;
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        data.password
      )
    ) {
      formValid = false;
      errors.password =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!data.c_password.trim()) {
      formValid = false;
      errors.c_password = "Confirm Passwords is required";
    }else if(data.password!==data.c_password){
      errors.c_password="Passwords must match"
    }

    if(!data.image){
      formValid=false;
      errors.image="Profile Pic Required"
    }

    
    setErrors(errors);

    console.log(data.image);
    if (
      data.fname &&
      data.lname &&
      data.company_name &&
      data.corporate_id_no &&
      data.industry_sector &&
      data.company_description &&
      data.email &&
      data.location &&
      data.contact &&
      // data.username &&
      data.address &&
      data.password &&
      data.c_password &&
      data.image
    ) {
      formValid = true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("fname", data.fname);
      formData.append("lname", data.lname);
      formData.append("company_name", data.company_name);
      formData.append("corporate_id_no", data.corporate_id_no);
      formData.append("industry_sector", data.industry_sector);
      formData.append("company_description", data.company_description);
      formData.append("email", data.email);
      formData.append("location", data.location);
      formData.append("contact", data.contact);
      // formData.append("username", data.username);
      formData.append("address", data.address);      
      formData.append("password", data.password);
      formData.append("c_password", data.c_password);
      formData.append("file", data.image);
      try {
        console.log(formData, "formdata");
        var response;
        if (formData) {
          response = await axiosMultipartInstance.post(
            "/registerEntrepreneur",
            data
          );
        }
        console.log("Response:", response); 
        if(response.status==200){
          alert(response.data.msg)
          navigate("/entrepreneur/login")
        }
        
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", data);
    }
  };
  return (
    <>
    <Navbar_2/>
    <div className="container">
      <div className="text-center headr">
          <h4 className="  mt-3  ent_mainheading">REGISTER NOW</h4>
          <h3 className="ent_sub_h3">Access Your World </h3>
          <h3 className="ent_sub_h3">of Innovation</h3>
          <div className="  mb-5  ent_hr_line "></div>
      </div>
      <form onSubmit={(e) => { handleSubmit(e);}}>
      <div className='row'>
        <div className="col">
          <img className='ent_reg_img' src={Entbodyimage}></img>
        </div>
        
          <div className='col-4'>
            <div class="">
            <label id="">First Name</label>
              <input class="input-cal input-base" name="fname" onChange={handleInputChange} id="ent_input" placeholder="" type="text"/>
              {errors.fname && (<div className="text-danger errortext">{errors.fname}</div>)}
            </div>
            <div class=" pt-2 ">
            <label id="">Company Name</label>
              <input class="input-cal input-base" id="ent_input" onChange={handleInputChange} name="company_name" placeholder="" type="text"/>
              {errors.company_name && (<div className="text-danger errortext">{errors.company_name}</div>)}
            </div>
            <div class=" pt-2">
            <label id="">Industry Sector</label>
              <select class="input-cal input-base " id="ent_input" onChange={handleInputChange}  name="industry_sector">
                <option value="">Select Industry Sector</option>
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
              {errors.industry_sector && (<div className="text-danger errortext">{errors.industry_sector}</div>)}
            </div>
            <div class=" pt-2 ">
            <label id="">E-Mail ID</label>
              <input class="input-cal input-base" id="ent_input" onChange={handleInputChange} name="email" placeholder="" type="text"/>
              {errors.email && (<div className="text-danger errortext">{errors.email}</div>)}
            </div>
            <div class=" pt-2 ">
            <label id="">Contact Number</label>
              <input class="input-cal input-base" id="ent_input" onChange={handleInputChange} name="contact" placeholder="" type="number"/>
              {errors.contact && (<div className="text-danger errortext">{errors.contact}</div>)}
            </div>
            <div class=" pt-2">
            <label id="">Address</label>
              <input class="input-cal input-base" id="ent_input" name="address" onChange={handleInputChange} placeholder="" type="text"/>
              {errors.address && (<div className="text-danger errortext">{errors.address}</div>)}
            </div>
            <label id="">Your Image</label>
            <div class="  pt-4 ent_reg_profile ">
              {profilename && <p className="ent_profile_name_p">{profilename}</p>}
              <label for="file" class="ent_reg_file_upload">
                <div class="icon">Upload</div>
                <input id="file" type="file"  name="image" onChange={(event)=>{handleFileChange(event.target.files[0])}} />
              </label>
              {error && (<div className="text-danger errortext">{error}</div>)}
              {errors.image && (<div className="text-danger errortext mt-2">{errors.image}</div>)}

            </div>
          </div>
          <div className='col-4'>
            <div class=" ">
            <label id="">Last Name</label>
              <input class="input-cal input-base" id="ent_input" name="lname" onChange={handleInputChange} placeholder="" type="text"/>
              {errors.lname && (<div className="text-danger errortext">{errors.lname}</div>)}
            </div>
            <div class=" pt-2">
            <label id="">Corporate Identification Number</label>
              <input class="input-cal input-base" id="ent_input" name="corporate_id_no" onChange={handleInputChange} placeholder="" type="text"/>
              {errors.corporate_id_no && (<div className="text-danger errortext">{errors.corporate_id_no}</div>)}
            </div>
            <div class=" pt-2">
            <label id="">Company Description</label>
              <input class="input-cal input-base" id="ent_input" name="company_description" onChange={handleInputChange} placeholder="" type="text"/>
              {errors.company_description && (<div className="text-danger errortext">{errors.company_description}</div>)}
            </div>
            <div class=" pt-2">
            <label id="">Location</label>
               <input class="input-cal input-base" id="ent_input" name="location" onChange={handleInputChange} placeholder="" type="text"/>
               {errors.location && (<div className="text-danger errortext">{errors.location}</div>)}
            </div>
           
            <div class=" pt-2">
            <label id="">Password</label>
              <input class="input-cal input-base" id="ent_input" name="password" onChange={handleInputChange} placeholder="" type="password"/>
              {errors.password && (<div className="text-danger errortext">{errors.password}</div>)}
            </div>
            <div class=" pt-2">
            <label id="">Confirm Password</label>
              <input class="input-cal input-base" id="ent_input" name="c_password" onChange={handleInputChange} placeholder="" type="password"/>
              {errors.c_password && (<div className="text-danger errortext">{errors.c_password}</div>)}
              <p className="mt-3 "> 
              already registered please login <Link  to="/entrepreneur/login">Login</Link>
            </p>
              </div>
            <div class=" pt-2 mx-5 mb-3">
              <button className='ent_reg_btn' type="submit" >Register</button> 
              </div>
            </div>
           
          </div>
          </form>
          
        
    </div>
    <Footer/>  
    </>
  );
}

export default Entsignup;