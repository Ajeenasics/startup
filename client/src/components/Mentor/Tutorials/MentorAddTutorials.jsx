import React,{useState} from 'react'
import { CommonNavbar } from '../../commonNavbar/commonNavbar'
import MentorNav from '../MentorNav/MentorNav'
import Footer_2 from '../../Footer/Footer_2'
import './MentorAddTutorials.css'
import { useNavigate,Link } from 'react-router-dom'
import axiosMultipartInstance from '../../../BaseAPIs/AxiosMultipartInstance'
import Footer_4 from '../../Footer/Footer_4'

function MentorAddTutorials() {

    const navigate = useNavigate();

    const navigateToBack =()=>{
        navigate("/mentor")
    }

    const [tutorialdata, setTutorialData]=useState({
        title:"",
        description:"",
        videolink:""
    })
    const [errors, setErrors]=useState({
        title:"",
        description:"",
        videolink:""
    })

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setTutorialData({...tutorialdata,[name]:value});
    };
    const handleFileChange =(e)=>{
        const {name,files} =e.target;
        setTutorialData({...tutorialdata,[name]:files[0]});
    };
    console.log(tutorialdata,"blogData");

    const handleSubmit =async (e)=>{
        e.preventDefault();

        let errors ={};
        let formValid=true;

        if(!tutorialdata.title.trim()){
            formValid=false;
            errors.blogName="Title Name is Required"
        }
        if(!tutorialdata.description.trim()){
            formValid=false;
            errors.description="Description is Required"
        }
        
        setErrors(errors);

        if(
            tutorialdata.title &&
            tutorialdata.description 
        ){
            formValid=true
        }

        if(Object.keys(errors).length === 0 && formValid){
            const formData =new FormData();
            formData.append("title",tutorialdata.title);
            formData.append("description",tutorialdata.description);
            formData.append("videolink",tutorialdata.videolink);
            console.log(formData,"FormData");
        
        try{
            var response;
            if(formData){
                response= await axiosMultipartInstance.post(
                    "/mentorAddTutorial/"+localStorage.getItem("Mentor"),formData
                );
            }
            console.log("Response",response);
            if(response.status==200){
                alert(response.data.msg)
                window.location.reload(false)
                
            }
        } catch(error){
            console.log("Error",error);
            let msg = error?.response?.data?.msg || "Error Occurred";
            alert(msg);
        } 
    }else {
        console.log("Form is not valid", formValid);
        console.log("Data entered", tutorialdata);
        }
    }
  return (
    <>
        <CommonNavbar/>
        <MentorNav/>
        <div>
        <div className="text-center headr">
            <h4 className="  mt-3  mentor_addtutorials_mainheading"> CREATE TUTORIALS</h4>
            <h3 className="mentor_addtutorials_sub_h3">Shape Your Future</h3>
            <div className="  mb-5   mentor_addtutorials_hr_line"></div>
        </div>
        <form onSubmit={(e) =>{handleSubmit(e);}}>
        <div className='mentor_addtutorials_maindiv'>
            <div className='row mentor_addtutorials_row'>
                <div className='col-3'>
                    <p>Title</p>
                </div>
                <div className='col-9'>
                    <input class="mentor-addtutorials-input" 
                    id="tut_input" 
                    name="title" 
                    placeholder="" 
                    onChange={handleInputChange}
                    type="text"
                    />
                                  {errors.title && (<div className="text-danger errortext">{errors.title}</div>)}

                </div>
            </div>
            <div className='row mentor_addtutorials_row'>
                <div className='col-3'>
                    <p>Description</p>
                </div>
                <div className='col-9'>
                    <input class="mentor-addtutorials-input" 
                    id="tut_input" 
                    name="description" 
                    placeholder="" 
                    type="text"
                    onChange={handleInputChange}/>
                                  {errors.description && (<div className="text-danger errortext">{errors.description}</div>)}

                </div>
            </div>
            <div className='row mentor_addtutorials_row'>
                <div className='col-3'>
                    <p>Video Link</p>
                </div>
                <div className='col-9'>
                    <div class=" relative pt-4 ent_reg_profile">
                    <label for="file" class="ent_reg_file_upload">
                        <div class="icon">Upload</div>
                        <input id="file" type="file" onChange={handleFileChange}  name="videolink"/>
                    </label>
                    </div>                
                </div>
            </div>
            <div className='row mentor_addtutorials_row'>
                <div className='col-3'>
                </div>
                <div className='col-9'>
                    <button className='menter_addtutorials_btn' type="submit" >Add Tutorial</button>
                </div>
            </div>
        </div>
        </form>
        </div>
        <Footer_4/>   
    </>
  )
}

export default MentorAddTutorials