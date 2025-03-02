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

    const submit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            formData.password = hashedPassword;

            console.log("Submitting form with data:", formData);

            employee(formData);
            const response = await axios.post("/api/employee/create", formData);

            if (response.status === 200) {
                router.push("/citizen");
            } else {
                setErrorMessage("Failed to create employee");
            }
        } catch (error) {
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
                <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Administrator">
                    {/* Appointments-section */}
                    <section className="appointment-section sec-pad-2">
                        <div className="outer-container p_relative">
                            <div
                                className="bg-layer"
                                style={{
                                    backgroundImage: "url(https://images.forbesindia.com/blog/wp-content/uploads/2021/08/Raigad-Village.jpg)",

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
                                        <div className="form-inner">
                                            <form className="default-form" onSubmit={submit}>
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
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            value = {formData.confirmPassword}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className = "col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="text"
                                                            name="citizen_id"
                                                            placeholder="Citizen ID"
                                                            value={formData.citizen_id}
                                                            onChange={handleInputChange}
                                                            required    
                                                        />
                                                    </div>

                                                    <div className = "col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="text"
                                                            name="village_id"
                                                            placeholder="Village ID"
                                                            value={formData.village_id}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className = "col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            placeholder="Role"
                                                            value={formData.role}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                        <button type="submit" className="theme-btn btn-one">
                                                            <span>Sign UP Employee</span>
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
