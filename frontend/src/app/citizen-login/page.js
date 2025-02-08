"use client"
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import useCitizens from "../../components/hooks/citizen.zustand"
import axios from "axios";
import { useState } from "react";

//import router
import { useRouter } from "next/navigation";

export default function Home() {

    const Citizens = useCitizens((state) => state.setNewCitizen);
    //const navigate = useNavigate(); // Use navigate instead of router
    const [aadhar,setAdhar] = useState(); 


    //router to navigate
    const router = useRouter();

    const setCitizen = useCitizens((state) => state.setNewCitizen); // Zustand function to update citizen

    async function login() {
        console.log("Login called with Aadhar:", aadhar);

        try {
            const response = await axios.get(`/api/citizen/get?aadhar=${aadhar}`);

            if (response.status === 200) {
                setCitizen(response.data); // Update Citizen data in Zustand
                console.log("Successfully logged in as:", response.data);
                
                //console.log("Successfully logged in as:", response.data);
                // Navigate to /Citizen
                router.push("/citizen");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert("Citizen record not found");
                } else {
                    alert("An error occurred while logging in");
                }
            } else {
                alert("Network error. Please try again later.");
                console.error("Error:", error);
            }
        }
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} >
                <div>
                    {/* Contact Form Section End */}
                    {/* Contact Form Section2 */}
                    <section className="contact-style-three pt_90 pb_120">
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner mr_40">
                                        <div className="sec-title mb_50">
                                            <h2>Login as a Citizen</h2>
                                        </div>

                                        <>
                                                <div className="row clearfix">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="fname" placeholder="Adhar" onChange={(e) => setAdhar(e.target.value)} required />
                                                    </div>
                                                    
                                                </div>
                                                <button type="submit" className="theme-btn btn-one" onClick={login}><span>Login </span></button>
                                                Don't have an account? <Link href="/Citizen-signup">Register</Link>
                                        </>


                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 image-column">
                                    <figure className="image-box"><img src="assets/images/resource/contact-1.jpg" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                    </section>

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
