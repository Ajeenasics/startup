import React, { useState } from 'react';
import './MentorPayment.css';
import { CommonNavbar } from '../../commonNavbar/commonNavbar';
import Footer_2 from '../../Footer/Footer_2';
import MentorNav from '../MentorNav/MentorNav';
import Navbar_2 from '../../commonNavbar/Navbar_2';
import HomepageNavbar from '../../commonNavbar/HomepageNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../BaseAPIs/AxiosInstance';

function MentorPayment() {
  const [paymentType, setPaymentType] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [CVV, setCVV] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    const enteredDateObj = new Date(expirationDate);
    const currentDate = new Date();

    if (!paymentType) newErrors.paymentType = "Please select a payment type.";
    if (creditCardNumber.length !== 16) newErrors.creditCardNumber = "Card number must be 16 digits.";
    if (enteredDateObj <= currentDate) newErrors.expirationDate = "Please select a future date.";
    if (CVV.length !== 3) newErrors.CVV = "CVV must be 3 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (validateFields()) {
      try {
        const result = await axiosInstance.post("/addSubscription", {
          entId: localStorage.getItem("Enterprenuer"),
          mentorId: id,
          amount:600,
          paymentstatus: true
        });
       alert("successfully subscribed ")
       navigate("/entrepreneur/mentorsubscribedlist")
      } catch (err) {
        console.log("Error:", err);
        if(err.response.status==409){
          alert("already subscribed")
          navigate("/entrepreneur/mentorsubscribedlist")

        }
      }
    }
  };

  return (
    <>
      <CommonNavbar />
      <HomepageNavbar />
      <div className="text-center headr">
        <h4 className="mt-3 mentor_pay_mainheading">PAY HERE</h4>
        <h3 className="mentor_pay_sub_h3">Payment Details</h3>
        <div className="mb-3 mentor_pay_hr_line"></div>
      </div>
      <div className='container mb-5'>
        <form className="form" autoComplete="off">
          <div className="credit-card-info--form">
            <div className="input_container">
              <label className="input_label">Payment Type</label>
              <select
                className="input_field"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="SBI Card">SBI Card</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="Amazon Pay ICICI Credit card">Amazon Pay ICICI Credit card</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Air India SBI Signature credit Card">Air India SBI Signature credit Card</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Canara Bank">Canara Bank</option>
              </select>
              {errors.paymentType && <div className="error text-danger">{errors.paymentType}</div>}
            </div>
            <div className="input_container">
              <label className="input_label">Card Number</label>
              <input
                type="number"
                className='input_field'
                placeholder='Valid Card Number'
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
              />
              {errors.creditCardNumber && <div className="error text-danger">{errors.creditCardNumber}</div>}
            </div>
            <div className="input_container">
              <div className="split_label">
                <label className="input_label">Expiry Date </label>
                
              </div>
              <div className="split">
                <input
                  className="input_field_date"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
                <input
                  className="input_field_cvv"
                  type="text"
                  placeholder="CVV"
                  value={CVV}
                  onChange={(e) => setCVV(e.target.value)}
                />
              </div>
              {errors.expirationDate && <div className="error text-danger">{errors.expirationDate}</div>}
              {errors.CVV && <div className="error text-danger">{errors.CVV}</div>}
            </div>
            
          </div>
          <button type="button" className="purchase--btn" onClick={handlePayment}>Pay</button>
        </form>
      </div>
      <Footer_2 />
    </>
  );
}

export default MentorPayment;
