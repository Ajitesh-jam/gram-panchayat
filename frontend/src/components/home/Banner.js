import React from 'react';
import Link from 'next/link';
export default function Banner() {
  return (
    <section className="banner-section p_relative">
      <div className="pattern-layer wow slideInDown animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ backgroundImage: 'url(assets/images/shape/shape-1.png)' }}></div>
      <div className="shape">
        {/* <div className="shape-1" style={{ backgroundImage: 'url(assets/images/shape/shape-2.png)' }}></div>
        <div className="shape-2 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}></div>
        <div className="shape-3" style={{ backgroundImage: 'url(assets/images/shape/shape-4.png)' }}></div>
        <div className="shape-4" style={{ backgroundImage: 'url(assets/images/shape/shape-5.png)' }}></div> */}
      </div>
      <div className="auto-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <span className="upper-text">Your Health deserves the Best</span>
              <h2>Take <span>Care of Your</span> Health Now.</h2>
              <span className="upper-text">All your Medical needs at your Fingertips. <br/> Your Privacy, Our Priority</span>              <div className="btn-box">
                <Link href="/Citizen-signup" className="theme-btn btn-two"><span>Register</span></Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box"style={{
                                
                                width: "655px",
                                height: "699px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>
              <figure className="image float-bob-y"><img src="https://images.forbesindia.com/blog/wp-content/uploads/2021/08/Raigad-Village.jpg" alt="" /></figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

