import React, { useState } from 'react'
import './MentorAddBlogs.css'
import { CommonNavbar } from '../../commonNavbar/commonNavbar'
import MentorNav from '../MentorNav/MentorNav'
import Footer_2 from '../../Footer/Footer_2'
import axiosMultipartInstance from '../../../BaseAPIs/AxiosMultipartInstance'
import { useNavigate } from 'react-router-dom'
import Footer_4 from '../../Footer/Footer_4'

function MentorAddBlogs() {

    const navigate = useNavigate();

    const navigateToBack =()=>{
        navigate("/mentor/homepage")
    }

    const [blogdata, setBlogData]=useState({
        blogName:"",
        description:"",
        coverImage:""
    })
    const [errors, setErrors]=useState({
        blogName:"",
        description:"",
        coverImage:""
    })

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setBlogData({...blogdata,[name]:value});
    };
    const handleFileChange =(e)=>{
        const {name,files} =e.target;
        setBlogData({...blogdata,[name]:files[0]});
    };
    console.log(blogdata,"blogData");

    const handleSubmit =async (e)=>{
        e.preventDefault();

        let errors ={};
        let formValid=true;

        if(!blogdata.blogName.trim()){
            formValid=false;
            errors.blogName="Blog Name is Required"
        }
        if(!blogdata.description.trim()){
            formValid=false;
            errors.description="Description is Required"
        }
        
        setErrors(errors);

        if(
            blogdata.blogName &&
            blogdata.description 
        ){
            formValid=true
        }

        if(Object.keys(errors).length === 0 && formValid){
            const formData =new FormData();
            formData.append("blogName",blogdata.blogName);
            formData.append("description",blogdata.description);
            formData.append("coverImage",blogdata.coverImage);
            console.log(formData,"FormData");
        
        try{
            var response;
            if(formData){
                response= await axiosMultipartInstance.post(
                    "/mentorAddBlog/"+localStorage.getItem("Mentor"),formData
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
        console.log("Data entered", blogdata);
        }
    }
  return (
    <>
        <CommonNavbar/>
        <MentorNav/>
        <div>
        <div className="text-center headr">
            <h4 className="  mt-3  mentor_addblog_mainheading"> ADD BLOGS</h4>
            <h3 className="mentor_addblog_sub_h3">Shape Your Future</h3>
            <div className="  mb-5   mentor_addblog_hr_line"></div>
        </div>
        <form onSubmit={(e) =>{handleSubmit(e);}}>
        <div className='mentor_addblog_maindiv'>
            <div className='row mentor_addblogs_row'>
                <div className='col-3'>
                    <p>Blog Name</p>
                </div>
                <div className='col-9'>
                    <input class="mentor-addblogs-input" 
                    id="blog_input" 
                    name="blogName" 
                    onChange={handleInputChange}
                    placeholder="" 
                    type="text"/>
                </div>
            </div>
            <div className='row mentor_addblogs_row'>
                <div className='col-3'>
                    <p>Description</p>
                </div>
                <div className='col-9'>
                    <input class="mentor-addblogs-input" 
                    id="blog_input" 
                    name="description" 
                    placeholder="" 
                    onChange={handleInputChange}
                    type="text"/>
                </div>
            </div>
            <div className='row mentor_addblogs_row'>
                <div className='col-3'>
                    <p>Cover Image</p>
                </div>
                <div className='col-9'>
                    <div class=" relative pt-4 ent_reg_profile">
                    <label for="file" class="ent_reg_file_upload">
                        <div class="icon">Upload</div>
                        <input id="file" type="file" onChange={handleFileChange}  name="coverImage"/>
                    </label>
                    </div>                
                </div>
            </div>
            <div className='row mentor_addblogs_row'>
                <div className='col-3'>
                </div>
                <div className='col-9'>
                    <button className='menter_addblog_btn' type="submit" >Add Blog</button>
                </div>
            </div>
        </div>
        </form>
        </div>
        <Footer_4/>   
    </>
  )
}

export default MentorAddBlogs