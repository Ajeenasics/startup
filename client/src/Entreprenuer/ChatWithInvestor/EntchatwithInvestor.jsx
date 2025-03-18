import "./EntChatwithInvestor.css";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";
import Footer_2 from "../../components/Footer/Footer_2";
import inv_chat_search from "../../assets/inv_chat_search.png";
import inv_chat_bell from "../../assets/inv_chat_bell.png";
import inv_chat_love from "../../assets/inv_chat_love.png";
import inv_chat_attachment from "../../assets/inv_chat_attachment.png";
import inv_chat_emoji from "../../assets/inv_chat_emoji.png";
import inv_chat_mic from "../../assets/inv_chat_mic.png";
import inv_chat_send from "../../assets/inv_chat_send.png";
import inv_chat_camera from "../../assets/inv_chat_camera.png";
import profile from "../../assets/Ellipse 5.png";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { imageUrl } from "../../ImageAPIs/Image_Urls";

function EntchatwithInvestor({ role }) {
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [chat, setChat] = useState([]);
  const [investor, setInvestor] = useState("");
  const [ent, setEnt] = useState("");
 const Navigate=useNavigate()
  useEffect(() => {
    setInterval(() => {
      axiosInstance
        .post("/viewChatMsgsWithInvestor", {
          entId: role == "ent" ? localStorage.getItem("Enterprenuer") : id,
          investorId: role == "ent" ? id : localStorage.getItem("Investor"),
        })
        .then((res) => {
          setChat(res.data.data);
        });
    }, 1000);
    if (role == "ent") {
      axiosInstance.post(`/viewInvestorById/${id}`).then((res) => {
        setInvestor(res.data.data);
        console.log(res.data.data,'men');
      });
    } else {
      //inside view mentot axios call
      axiosInstance.post(`/viewEntrepreneurById/${id}`).then((res) => {
        setEnt(res.data.data);
        console.log(res.data.data,'ent');
      });
    }
  }, []);

  function importData() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
    };
    input.click();
  }

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const send = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/chattingWithInvestor", {
        msg: msg,
        from: role,
        to: role == "ent" ? "invest" : "ent",
        entId: role == "ent" ? localStorage.getItem("Enterprenuer") : id,
        investorId: role == "ent" ? id : localStorage.getItem("Investor"),
      })
      .then((res) => {
        setMsg("");
      });
  };
  const handleChat=()=>{
    role == "ent" ? Navigate("/entrepreneur/requestinvestor") : Navigate("/investor/accepted_entrepreneur")
  }
  return (
    <>
    
      <div className="container ent_chat_main mb-5">
        <section className="ent_chat_box mt-2 ">
          <div className="col ent_chat_nav">
            <img  src={`${imageUrl}/${role == 'ent' ? investor?.profile?.filename : ent?.image?.filename}`} style={{width:"80px",height:"80px"}} className="rounded-pill "  />
          </div><div className=" border-light text-primary" onClick={handleChat}>Back<TiArrowBack/></div>
          <div className="ent_chat_container mt-3">
            <div className="ent_chat_messages">
              {chat.map((message, index) => (
                <div
                  key={index}
                  className={`ent_chat_message ${
                    role === message.from
                      ? "ent_chat_message_right"
                      : "ent_chat_message_left"
                  }`}
                >
                  <p className="chat-msg">{message.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="ent_chat_foot">
            {/* <button className="ent_chat_foot_btn mx-2" onClick={importData}>
              <img className="ent_chat_nav_icon" src={inv_chat_attachment} />
            </button>
            <button className="ent_chat_foot_btn">
              <img className="ent_chat_nav_icon" src={inv_chat_emoji} />
            </button>*/}
            <div className="ent_chat_foot_input_div ms-5 ">
             
              <input
                className="text-center"
                type="text"
                placeholder="Write Something"
                value={msg}
                onChange={handleChange}
              />
            </div>

            <button className="ent_chat_foot_btn" onClick={send}>
              <img className="ent_chat_nav_icon" src={inv_chat_send} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default EntchatwithInvestor;
