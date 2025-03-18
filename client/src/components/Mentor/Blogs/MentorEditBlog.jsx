import React, { useState ,useEffect } from 'react'
import './MentorEditBlog.css'
import { CommonNavbar } from '../../commonNavbar/commonNavbar'
import MentorNav from '../MentorNav/MentorNav'
import Footer_2 from '../../Footer/Footer_2'
import editcover from '../../../assets/editblogcover.png'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../BaseAPIs/AxiosInstance'
import axiosMultipartInstance from '../../../BaseAPIs/AxiosMultipartInstance'
import { imageUrl } from '../../../ImageAPIs/Image_Urls'
import camera_img from '../../../assets/Mentor_blog_edit_camera.png'
import Footer_4 from '../../Footer/Footer_4'

function MentorEditBlog() {

    const [blogdata, setBlogData]=useState({
        blogName:"",
        description:"",
        coverImage:""
    })
    const [imgFile, setImgFile] = useState("")

    const [errors, setErrors]=useState({
        blogName:"",
        description:"",
        coverImage:""
    })

    const navigate=useNavigate()

    const {id}=useParams();
    console.log(id,"id");

    useEffect(() => {
        if (blogdata.coverImage?.filename) {

            setImgFile(`${imageUrl}/${blogdata.coverImage.filename}`)
        }
    }, [blogdata.coverImage])

      function getData () {
        axiosInstance.post(`/mentorViewBlogById/${id}`)
        .then ((res)=>{
            console.log(res);
            if (res.status === 200){
                setBlogData(res.data.data);
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
            try {
                var response;
                if (formData) {
                  response = await axiosMultipartInstance.post(
                    `/mentorUpdateBlog/${id}`,
                    formData
                  );
                }
                console.log("Response:", response); 
                if(response.status==200){
                  alert(response.data.msg)
                  navigate("/mentor/viewblogs")
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
    const handleCancel=()=>{
        navigate("/mentor/viewblogs")
    }
  return (
    <>
    <CommonNavbar />
    <MentorNav />
    <div className="text-center headr">
        <h4 className="mt-3 mentor_viewblog_mainheading">EDIT BLOGS</h4>
        <h3 className="mentor_viewblog_sub_h3">Shape Your Future</h3>
        <div className="mb-5 mentor_viewblog_hr_line"></div>
    </div>

    <div className='container mentor_editblog_main'>
    
                            
        <form onSubmit={(e)=>{handleSubmit(e);}}>          
        <div className='row'>
        
            <div className='col-md-6 col-sm-12 mentor_editblog_col'>
            { imgFile &&<img src={imgFile} className='ing-fluid mentor_editblog_img' alt='coverImage'/> }
            <div className='mentor_blogedit_file_upload' >
                            <label for="profile" class="men_profile_upload">
                                <div class="icon">
                                    <img src={camera_img}/>
                                </div>
                                <input id="profile" 
                                type="file"  
                                name="coverImage"
                                onChange={handleFileChange}
                                 />
                                
                            </label>
                        </div>
            </div>
        
            
            <div className='col-md-6 col-sm-12'>
                <div className='row mentor_editblog_mainrow  mentor_editblog_firstp'>
                    <div className='col-4'>
                        <p className='mentor_editblog_p'>Blog Name</p>
                    </div>
                    <div className='col-8'>
                    <input class="mentor-addblogs-input" 
                    id="blog_input" 
                    name="blogName" 
                    value={blogdata.blogName}
                    placeholder={blogdata.blogName}
                    onChange={handleInputChange}
                    type="text"/>
                    </div>
                </div>
                <div className='row mentor_editblog_mainrow'>
                    <div className='col-4'>
                        <p className='mentor_editblog_p'>Description</p>
                    </div>
                    <div className='col-8'>
                    <textarea class="mentor-addblogs-input" 
                    id="blog_input" 
                    name="description" 
                    value={blogdata.description}
                    placeholder={blogdata.description}
                    onChange={handleInputChange}
                    rows={5}/>
                    </div>
                </div>
                
                <div className='row mentor_editblog_mainrow'>
                <div className='col-3'>
                </div>
                <div className='col-9'>
                    <button className='menter_editblog_btn' >Update Blog</button>
                    <button className='menter_editblog_btn mentor_addblog_secbtn' onClick={handleCancel} >Cancel</button> 
 
                </div>
            </div>
            </div>
        </div>
        </form>
    </div>
    <Footer_4/>
    </>
  )
}

export default MentorEditBlog