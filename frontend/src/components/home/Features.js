import React from 'react';
import Link from 'next/link';


export default function Feature() {
  return (
    <section className="feature-section pt_120 pb_90" id="feature">
      {/* <div
        className="shape"
        style={{ backgroundImage: 'url(assets/images/shape/shape-6.jpg)' }}
      ></div> */}
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-9"></i>
                </div>
                <h3>Welfare schemes <br />&nbsp;</h3>
                <p>Access government welfare schemes and services online with ease, speed, and transparency through your Gram Panchayat portal.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-10"></i>
                </div>
                <h3>Asset Management</h3>
                <p>Track and manage village public assets online with transparency, live updates, and efficient monitoring through your Gram Panchayat portal.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-11"></i>
                </div>
                <h3>Citizen Data</h3>
                <p>Access and manage citizen data securely with transparency, accuracy, and 24x7 availability through your Gram Panchayat portal.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon-box">
                  <i className="icon-12"></i>
                </div>
                <h3>Village Update<br/> &nbsp; </h3>
                <p>Stay informed with real-time village updates on projects, events, and announcements through your Gram Panchayat portal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
