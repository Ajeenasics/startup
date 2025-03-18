import React, { useState ,useEffect } from 'react'
import './MentorEditTutorials.css'
import { CommonNavbar } from '../../commonNavbar/commonNavbar'
import MentorNav from '../MentorNav/MentorNav'
import Footer_2 from '../../Footer/Footer_2'
import editcover from '../../../assets/editblogcover.png'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../BaseAPIs/AxiosInstance'
import axiosMultipartInstance from '../../../BaseAPIs/AxiosMultipartInstance'
import { imageUrl } from '../../../ImageAPIs/Image_Urls'
import { useNavigate } from 'react-router-dom'
import camera_img from '../../../assets/Mentor_blog_edit_camera.png'


function MentorEditTutorials() {
    const navigate = useNavigate();

    const navigateToBack =()=>{
        navigate("/mentor/viewtutorials")
    }

    const [tutorialdata, setTutorialData]=useState({
        title:"",
        description:"",
        videolink:""
    })
    const [videoFile, setVideoFile] = useState("")


    const [errors, setErrors]=useState({
        title:"",
        description:"",
        videolink:""
    })

    const {id}=useParams();
    console.log(id,"id");

    useEffect(() => {
        if (tutorialdata.videolink?.filename) {

            setVideoFile(`${imageUrl}/${tutorialdata.videolink.filename}`)
        }
    }, [tutorialdata.videolink])

    function getData () {
        axiosInstance.post(`/mentorViewTutorialById/${id}`)
        .then ((res)=>{
            console.log(res);
            if (res.status === 200){
                setTutorialData(res.data.data);
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("Failed to fetch user details")
        });
      }
    useEffect(()=>{
        getData()
      },[]);

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setTutorialData({...tutorialdata,[name]:value});
    };
    const handleFileChange =(e)=>{
        const {name,files} =e.target;
        setTutorialData({...tutorialdata,[name]:files[0]});
    };
    console.log(tutorialdata,"tutorialData");

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
                    `/mentorUpdateTutorial/${id}`,formData
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
    <div>
        <CommonNavbar />
        <MentorNav />
        <div className="text-center headr">
            <h4 className="mt-3 mentor_viewblog_mainheading">EDIT TUTORIALS</h4>
            <h3 className="mentor_viewblog_sub_h3">Shape Your Future</h3>
            <div className="mb-5 mentor_viewblog_hr_line"></div>
        </div>

        <div className='container '>
        <form onSubmit={(e)=>{handleSubmit(e);}}>          

            <div className='row mentor_editblog_main'>
                <div className='col-md-6 col-sm-12 mt-5 '>
                { videoFile && 
                    <video width="550" height="400" controls autoPlay src={videoFile} type="video/mp4"></video>
                }     
                   
                    </div>
                <div className='col-md-6 col-sm-12'>
                    <div className='row mentor_editblog_mainrow  mentor_editblog_firstp'>
                        <div className='col-4'>
                            <p className='mentor_editblog_p'>Blog Name</p>
                        </div>
                        <div className='col-8'>
                        <input class="mentor-addblogs-input" 
                        id="blog_input" 
                        name="title" 
                        value={tutorialdata.title}
                        placeholder={tutorialdata.title}
                        onChange={handleInputChange}
                        type="text"
                        />
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
                        rows={5}
                        value={tutorialdata.description}
                        placeholder={tutorialdata.description}
                        onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className='row mentor_editblog_mainrow'>
                        <div className='col-4'>
                            <p className='mentor_editblog_p'>Update Video</p>
                        </div>
                        <div className='col-8'>
                        
              <label for="profile" class="men_edittutorial_file_upload">
                  <div class="icon">Upload</div>
                  <input id="profile" type="file"  name="videolink" onChange={handleFileChange}  />
                </label>
                
              
                        </div>
                    </div>
                    <div className='row mentor_editblog_mainrow'>
                    <div className='col-3'>
                    </div>
                    <div className='col-9 mentor_edittutorial_btn_div'>
                        <button className='menter_editblog_btn' >Update Blog</button>
                        <button className='menter_editblog_btn mentor_edittutorial_secbtn' onClick={navigateToBack} >Cancel</button> 
    
                    </div>
                </div>
                </div>
            </div>
            </form>
        </div>

        <Footer_2 />

    </div>
  )
}

export default MentorEditTutorials