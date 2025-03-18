import React, { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../BaseAPIs/AxiosInstance";
import './Mentorchat.css'

function PropertiesList({ url }) {
// const params = useParams();
//   const propertyId = params.id.split('_')[0];
//   const sid = params.id.split('_')[1];
//   const bid = params.id.split('_')[2];
//   const [msg, setMsg] = useState([]);
//   const [imgLeft, setimgLeft] = useState("");
//   const [imgRight, setimgRight] = useState("");
//   const [reciverName, setreciverName] = useState("");
//   const [sendMsg, setSendMsg] = useState({
//         buyerId:bid,
//         sellerId:localStorage.getItem('sellerId'),
//         propertyId: propertyId,
//         message:"",
//         messagefrom: "seller"
    
//   });

//   const Change = (a) => {
//     setSendMsg({ ...sendMsg, [a.target.name]: a.target.value });
//   };

//   const send = async (e) => {
//     e.preventDefault();
//     if (sendMsg.message){
//         var res = await axiosInstance.post('/message',sendMsg)
//         document.getElementsByClassName("msger-input")[0].value = "";

//     }
//   };

//   useEffect( ()  => {
//     async function fetch() {
//         var buyer = await axiosInstance.get('/user/profileView/' + bid,  {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//           });
//           setimgLeft(url + buyer.data.profile)
//           setreciverName(buyer.data.firstname+ " " + buyer.data.lastname)
    
//         var seller = await axiosInstance.get('/Seller/profileView/'+localStorage.getItem('sellerId'),  {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//           });
    
//           setimgRight(url + seller.data.profile)
//     }
//     fetch();
//     setInterval( async () => {
//         var res = await axiosInstance.get('/message/messageListing');
//         var temp = [];
//         for(var i in res.data) {
//             if (res.data[i].buyerId == bid && res.data[i].sellerId ==  localStorage.getItem('sellerId') && res.data[i].propertyId == propertyId) {
//                 temp.push(res.data[i]);
//                 console.log(res.data[i])
//             }
//             setMsg(temp);
//         }
//     }, 1000);
//   }, []);

//   const navigate=useNavigate()
  
  return (
    <section className="container msger" style={{height:"90vh"}}>
  <header className="msger-header">
    <div className="msger-header-title">
      <i className="fas fa-comment-alt" /> 
    </div>
    <div className="msger-header-options">
      <span>
        <i className="fas fa-cog" />
      </span>
    </div>
  </header>
  <main className="container msger-chat">
  {msg.map((msgContainer, index) => (
    msgContainer.messagefrom && msgContainer.messagefrom == 'seller' ?  <div className="msg right-msg">
    <img
      className="msg-img"
      src={imgRight}
    />
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">You</div>
        <div className="msg-info-time">{msgContainer.date}</div>
      </div>
      <div className="msg-text">{msgContainer.message}</div>
    </div>
  </div>
  :
  <div className="msg left-msg mt-5 pt-5">
      <img
        className="msg-img"
        src={imgLeft}
      />
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">{reciverName}</div>
          <div className="msg-info-time">{msgContainer.date}</div>
        </div>
        <div className="msg-text">
            {msgContainer.message}
        </div>
      </div>
    </div>
  ))}
    
    
  </main>
  <form className="msger-inputarea">
    <input
      type="text"
      className="msger-input"
      placeholder="Enter your message..."
      name="message"
      onChange={Change}
    />
    <button className="msger-send-btn" onClick={send}>
      Send
    </button>
  </form>
</section>

  );
}

export default PropertiesList;
