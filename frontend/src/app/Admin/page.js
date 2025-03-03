'use client';
import Layout from "../../components/layout/Layout";
import { useState } from 'react';
import useCitizens from "../../components/hooks/citizen.zustand.js";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";
import tryimg from "../../../public/assets/images/NewLogo.png";

export default function Home() {

    const [isActive, setIsActive] = useState({ status: false, key: 1 });
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        DOB: "",
        aadhar: "",
        gender: "",
        password_hash: "",
        confirmPassword_hash: "",
        image: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const Citizens = useCitizens((state) => state.setNewCitizen);
    const router = useRouter();

    const handleToggle = (key) => {
        setIsActive((prev) => ({
            status: prev.key !== key,
            key,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        // Reset messages
        setErrorMessage("");
        setSuccessMessage("");

        // Validate password_hashs
        if (formData.password_hash !== formData.confirmPassword_hash) {
            setErrorMessage("Password_hashs do not match");
            return;
        }

        try {
            const hashedPassword_hash = await bcrypt.hash(formData.password_hash, 10);
            formData.password_hash = hashedPassword_hash;
            console.log("Submitting form with data:", formData);
            Citizens(formData);

            // API call
            const response = await axios.post("/api/citizen/create", formData);
            if (response.status === 201) {
                setSuccessMessage("Citizen created successfully");
                setFormData((prev)=>({
                    ...prev,
                    password_hash: "",
                    confirmPassword_hash: ""
                })
                );
                router.push("/citizen");
            } else {
                setErrorMessage("Failed to create citizen");
            }
        } catch (error) {
            console.error("Error creating citizen:", error);
            // Show different messages based on the error type
            if (error.response) {
                setErrorMessage(error.response.data.message || "Server error. Try again later.");
            } else if (error.request) {
                setErrorMessage("No response from server. Please check your connection.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Citizen Signup">
                {/* Appointments-section */}
                <section className="appointment-section">
                    <div className="outer-container p_relative">
                        <div
                            className="bg-layer"
                            style={{
                                backgroundImage: "url(assets/images/NewLogo.png)",//"url(https://ennoblecare.com/wp-content/uploads/2023/09/iStock-1152844782.jpg)",
                                // width: "1608px",
                                // height: "937px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            
                        >

                        </div>
                       
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-7 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner-inner">
                                        <form className="default-form" onSubmit={submit}>
                                            <div className="row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Contact"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="date"
                                                        name="DOB"
                                                        placeholder="DOB (DD-MM-YYYY)"
                                                        value={formData.DOB}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="aadhar"
                                                        placeholder="Aadhar"
                                                        value={formData.aadhar}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-9 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="image"
                                                        placeholder="Provide valid image url for upload"
                                                        onChange={handleInputChange}

                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-3 col-sm-12 form-group">
                                                    
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        
                                                        value="male"
                                                        checked={formData.gender === "male"}
                                                        onChange={handleInputChange}
                                                    /> Male
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        
                                                        value="female"
                                                        checked={formData.gender === "female"}
                                                        onChange={handleInputChange}
                                                    /> Female

                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="password"
                                                        name="password_hash"
                                                        placeholder="Password"
                                                        value={formData.password_hash}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="password"
                                                        name="confirmPassword_hash"
                                                        placeholder="Confirm Password"
                                                        value={formData.confirmPassword_hash}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
                                                {successMessage && <p style={{color:"green"}}>{successMessage}</p>}
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                    <button type="submit" className="theme-btn btn-one">
                                                        <span>Sign UP</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
