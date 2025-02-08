import React from 'react';
import Link from 'next/link';


export default function Feature() {
  return (
    <section className="feature-section pt_120 pb_90" id="feature">
      <div
        className="shape"
        style={{ backgroundImage: 'url(assets/images/shape/shape-6.png)' }}
      ></div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-9"></i>
                </div>
                <h3>Qualified Administrators <br />&nbsp;</h3>
                <p>Onboarding the best Administrators, optimised to match your needs!</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-10"></i>
                </div>
                <h3>Hassle-free Access</h3>
                <p>Your Email ID acts as a storage for all your Medical Data</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-11"></i>
                </div>
                <h3>Incentivised Consultations</h3>
                <p>Get cheaper Consultation fees and Pharmacy Coupons on visits</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-12"></i>
                </div>
                <h3>Digitised Reports <br/> &nbsp; </h3>
                <p>All your Medical Reports stored on the Blockchain, accessible in your wallet </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
