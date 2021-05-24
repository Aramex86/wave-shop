import React from "react";
import {
  AiOutlineCompass,
  AiOutlinePhone,
  AiOutlineClockCircle,
  AiOutlineMail,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Waves</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <AiOutlineCompass className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>Kramer 2345</div>
                </div>
              </div>
              <div className="tag">
                <AiOutlinePhone className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>2345-22222</div>
                </div>
              </div>
              <div className="tag">
                <AiOutlineClockCircle className="icon" />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>Mon-Sun/ 9am-8pm</div>
                </div>
              </div>
              <div className="tag">
                <AiOutlineMail className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>nfo@waves.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the latest information on events, sales and offers.You
                can miss out.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
