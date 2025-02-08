import React from 'react';
import Link from 'next/link';

export default function Process() {
  return (
    <section className="process-section sec-pad">
      <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}></div>
      <div className="shape">
        <div className="shape-1 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-20.png)' }}></div>
        <div className="shape-2 float-bob-y" style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}></div>
        <div className="shape-3"></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Process</span>
          <h2>How We Keep You Healthy</h2>
        </div>
        <div className="inner-container">
          <div className="arrow-shape" style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}></div>
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">01</span>
              <figure className="image-box"><img src="assets/images/resource/process-1.jpg" alt="" /></figure>
              <div className="lower-content">
                <h3>Get Onboarded</h3>
                <p>Sign Up to get a Linked Wallet<br/> &nbsp; </p>
                <Link href="/Citizen-signup" className="theme-btn btn-two"><span>Register</span></Link>
              </div>
            </div>
          </div>
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">02</span>
              <figure className="image-box"><img src="assets/images/resource/process-2.jpg" alt="" /></figure>
              <div className="lower-content">
                <h3>Uploads and History</h3>
                <p>Begin by uploading your existing medical records. Medblock will digistise them and store them securley in your wallet.</p>
              </div>
            </div>
          </div>
          <div className="processing-block-one wow fadeInLeft animated" data-wow-delay="600ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <span className="count-text">03</span>
              <figure className="image-box"><img src="assets/images/resource/process-3.jpg" alt="" /></figure>
              <div className="lower-content">
                <h3>Begin Diagnosis</h3>
                <p>Get started on exploring the services, choose what suits you the best. Medblock is there to serve you for your healthy future.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

