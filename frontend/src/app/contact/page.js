
import Layout from "@/src/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Contuct Us">
                <div >
                    {/* Contact Form Section */}
                    <section className="contact-info-section pt_120">
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Quick Contact</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-2"></i></div>
                                            <p>Main Office: <br /><Link href="tel:23345678901">(+233)456-789-01</Link>, <Link href="tel:+1045678901">+10456-789-01</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Email Address</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-26"></i></div>
                                            <p>Mail: <br /><Link href="mailto:ajitesh.jam@example.com">ajitesh.jam@gmail.com</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 info-column">
                                    <div className="info-block-one">
                                        <h3>Mailing Address</h3>
                                        <div className="inner-box">
                                            <div className="icon-box"><img src="assets/images/icons/icon-2.png" alt="" /></div>
                                            <p>Digital ER Records, <br />IIT KGP 720009</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Contact Form Section End */}
                    {/* Contact Form Section2 */}
                    <section className="contact-style-three pt_90 pb_120">
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner mr_40">
                                        <div className="sec-title mb_50">
                                            <h2>Send a Message</h2>
                                        </div>
                                        <form method="post" action="sendemail.php" id="contact-form" className="default-form">
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="text" name="username" placeholder="First Name" required />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="text" name="lname" placeholder="Last Name" required />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="email" name="email" placeholder="Your email" required />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input type="text" name="phone" required placeholder="Phone" />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input type="text" name="subject" required placeholder="Subject" />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <textarea name="message" placeholder="Message"></textarea>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                    <button className="theme-btn btn-one" type="submit" name="submit-form"><span>Send Message</span></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 image-column">
                                    <figure className="image-box"><img src="https://photos.peopleimages.com/picture/202205/2452867-unknown-female-mixed-race-doctor-sitting-in-her-office-and-showing-a-heart-shape-gesture-with-her-hand-in-a-hospital.-hispanic-woman-make-a-hand-gesture-at-work-fit_400_400.jpg" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Contact Form Section2 End */}

                    {/* Google Map Section */}
                    <section className="google-map-section">
                        {/*Map Outer*/}
                        <div className="map-inner">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59053.58175806614!2d87.2799054!3d22.3215551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440255555547%3A0x6f2f20dd0c0d6793!2sIndian%20Institute%20of%20Technology%2C%20Kharagpur!5e0!3m2!1sen!2sin!4v1740650080328!5m2!1sen!2sin" height={570} style={{ border: 0, width: "100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                    </section>
                    {/* Google Map Section End */}
                     {/* subscibe */}
                <section className="subscribe-section">
                <div className="auto-container">
                    <div className="inner-container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                        <div className="text-box">
                            <h2><span>Subscribe</span> for the exclusive updates!</h2>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                        <div className="form-inner">
                            <form method="post" action="contact">
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Enter Your Email Address" required />
                                <button type="submit" className="theme-btn btn-one"><span>Subscribe Now</span></button>
                            </div>
                            <div className="form-group">
                                <div className="check-box">
                                <input className="check" type="checkbox" id="checkbox1" />
                                <label htmlFor="checkbox1">I agree to the <Link href="/">Privacy Policy.</Link></label>
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                  {/* subscibe end */}
                </div>

            </Layout>
        </>
    )
}