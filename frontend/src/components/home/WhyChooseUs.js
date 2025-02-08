
import React from 'react';
export default function chooseus() {
  return (
    <section className="chooseus-section">
    <div className="bg-layer" style={{ backgroundImage: 'url(assets/images/background/chooseus-bg.jpg)' }}></div>
    <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-12.png)' }}></div>
    <div className="auto-container">
      <div className="row clearfix">
        <div className="col-lg-8 col-md-12 col-sm-12 content-column">
          <div className="content-box">
            <div className="sec-title light mb_50">
              <span className="sub-title">Why Choose Us</span>
              <h2>Choose what's best for you</h2>
            </div>
            <div className="row clearfix">
              <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                <div className="chooseus-block-one">
                  <div className="inner-box">
                    <div className="icon-box"><i className="icon-18"></i></div>
                    <h3>Efficient Diagnosis</h3>
                    <p>Priority is given to reduce the time required for diagnosis, thus helping in identifying the problem at the earliest. Digital reports and online consultation with the specialists, with pre-scheduled followups for medications, all at a single place.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                <div className="chooseus-block-one">
                  <div className="inner-box">
                    <div className="icon-box"><i className="icon-21"></i></div>
                    <h3>Privacy and Security</h3>
                    <p>The Email Address, generates a unique wallet address that stores all your Medical Records on the Blockchain, where it can't be tampered nor can be lost. Access your wallet and have all your diagnosis, anytime anywhere</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                <div className="chooseus-block-one">
                  <div className="inner-box">
                    <div className="icon-box"><i className="icon-19"></i></div>
                    <h3>Digitised Process</h3>
                    <p>The Entire process is digitised, incorporating for offline consultation if need be. Just sign up and leave your worries behind, Medblock will take care of the rest</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 chooseus-block">
                <div className="chooseus-block-one">
                  <div className="inner-box">
                    <div className="icon-box"><i className="icon-20"></i></div>
                    <h3>24x7 Availability</h3>
                    <p>Being available on the interent, Medblock never shuts down, always open for all the help you will need during the diagnosis, recovery and beyond</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
