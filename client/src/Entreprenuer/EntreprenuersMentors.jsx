import React from "react";

function EntreprenuersMentors() {
  useEffect(() => {
    axiosInstance
      .post("/viewSubscriptionsByEntrepId/" + localStorage.getItem("Enterprenuer"))
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setBlogData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, []);
  return (
    <div>
      <div className="text-center headr">
        <h4 className="mt-3 mentor_viewblog_mainheading">OUR BLOGS</h4>
        <h3 className="mentor_viewblog_sub_h3">Share Your Ideas</h3>
        <div className="mb-5 mentor_viewblog_hr_line"></div>
      </div>

      <div className="container" style={{minHeight:"100vh"}}>
        {blogdata.length > 0 ? (
          blogdata.map((data) => {
            return (
              <div className="row mentor_viewblog_mainrow">
                <div className="col-md-5 col-sm-12 mentor_viewblogs_fir_col">
                  <img
                    src={`${imageUrl}/${data.coverImage.filename}`}
                    className="img-fluid mentorviewblog_coverimage"
                    alt="Blog"
                  />
                </div>
                <div className="col-md-7 col-sm-12 mentor_viewblogs_sec_col">
                  <div className="row montor_row_viwblog">
                    <div className="col-7">
                      <p>{data.blogName}</p>
                    </div>
                    <div className="col-5">
                      <FaRegCalendarAlt className="mentor-icon" /> 01/01/2024
                    </div>
                  </div>
                  <label>{data.description}</label>
                  <div className="mentor_viewblog_button_div">
                    <button
                      className="menter_viewblog_btn"
                      onClick={() => {
                        navigateToeditBlog(data._id);
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="menter_viewblog_btn mentor_addblog_secbtn"
                      onClick={() => removeMentorBlog(data._id)}
                    >
                      <RiDeleteBin5Fill /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No Records Required</h3>
        )}
      </div>
      <Footer_2 />
    </div>
  );
}

export default EntreprenuersMentors;
