'use client';
import Layout from "../../components/layout/Layout";
import { useState } from 'react';
import useEmployees from "@/src/components/hooks/employee.zustand";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";

import tryimg from "../../../public/assets/images/NewLogo.png";

export default function Home() {
    const [formData, setFormData] = useState({
        employee_id: "",
        password: "",
        confirmPassword: "",
        citizen_id: "",
        village_id: "",
        role: ""
    });

    const employee = useEmployees((state) => state.setNewEmployee);
    const router = useRouter();

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            formData.password = hashedPassword;

            //console.log("Submitting form with data:", formData);
            const response = await axios.post("/api/employee/create", formData);
            console.log("Response:", response);
            if (response.status === 201) {
                setErrorMessage("");
                setSuccessMessage("Employee created successfully");
                console.log("Employee created successfully");
            } else {
                setSuccessMessage("");
                setErrorMessage("Failed to create employee");
            }
        } catch (error) {
            setSuccessMessage("");
            console.error("Error creating employee:", error);
            // Show different messages based on the error type
            if (error.response) {
                setErrorMessage(error.response.data.message || "Server error. Try again later.");
            } else if (error.request) {
                setErrorMessage("No response from server. Please check your connection.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }

        // Reset form data
        setFormData({
            employee_id: "",
            password: "",
            confirmPassword: "",
            citizen_id: "",
            village_id: "",
            role: ""
        });
    };


    // JSON array of team members
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
                                            <h2>Login as a Administrator</h2>
                                        </div>
                                            <>
                                                <div className="row clearfix">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="text"
                                                            name="employee_id"
                                                            placeholder="Employee ID"
                                                            value={formData.employee_id}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <button type="submit" className="theme-btn btn-one" onClick={login}><span>Login </span></button>

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
