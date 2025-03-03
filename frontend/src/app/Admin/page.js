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

    const [govtMonitorFormData, setGovtMonitorFormData] = useState({
        monitor_id: "",
        password: "",
        confirmPassword: "",
        name: "",
        department: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGovtMonitorInputChange = (e) => {
        const { name, value } = e.target;
        setGovtMonitorFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [govtMonitorErrorMessage, setGovtMonitorErrorMessage] = useState("");
    const [govtMonitorSuccessMessage, setGovtMonitorSuccessMessage] = useState("");

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

    const submitGovtMonitor = async (e) => {
        e.preventDefault();
        if (govtMonitorFormData.password !== govtMonitorFormData.confirmPassword) {
            setGovtMonitorErrorMessage("Passwords do not match");
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(govtMonitorFormData.password, 10);
            govtMonitorFormData.password = hashedPassword;

            const response = await axios.post("/api/employee/create", govtMonitorFormData);
            console.log("Response:", response);
            if (response.status === 201) {
                setGovtMonitorErrorMessage("");
                setGovtMonitorSuccessMessage("Government Monitor created successfully");
                console.log("Government Monitor created successfully");
            } else {
                setGovtMonitorSuccessMessage("");
                setGovtMonitorErrorMessage("Failed to create Government Monitor");
            }
        } catch (error) {
            setGovtMonitorSuccessMessage("");
            console.error("Error creating Government Monitor:", error);
            if (error.response) {
                setGovtMonitorErrorMessage(error.response.data.message || "Server error. Try again later.");
            } else if (error.request) {
                setGovtMonitorErrorMessage("No response from server. Please check your connection.");
            } else {
                setGovtMonitorErrorMessage("An unexpected error occurred. Please try again.");
            }
        }

        setGovtMonitorFormData({
            monitor_id: "",
            password: "",
            confirmPassword: "",
            name: "",
            department: ""
        });
    };

    // JSON array of team members
    return (
            <>
                <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Administrator">
                    {/* Appointments-section */}
                    <section className="appointment-section sec-pad-2">
                        <div className="outer-container p_relative sec-pad-1">
                        <h1>Signup Panchayat Employee</h1>
                        </div>
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
                                                    {successMessage && <p style={{color:"green"}}>{successMessage}</p>}
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

                    {/* Government Monitor Signup-section */}
                    <section className="appointment-section sec-pad-2">
                    <div className="outer-container p_relative sec-pad-1">
                    <h1>Signup government monitor</h1>
                    </div>
                        <div className="outer-container p_relative">
                            <div
                                className="bg-layer"
                                style={{
                                    backgroundImage: "url(https://images.forbesindia.com/blog/wp-content/uploads/2021/08/Raigad-Village.jpg)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                               
                            </div>                        
                            <div className="auto-container">
                                <div className="row clearfix">
                                    <div className="col-lg-7 col-md-12 col-sm-12 form-column">
                                        <div className="form-inner">
                                            <form className="default-form" onSubmit={submitGovtMonitor}>
                                                <div className="row clearfix">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="text"
                                                            name="govt_id"
                                                            placeholder="Monitor ID"
                                                            value={govtMonitorFormData.monitor_id}
                                                            onChange={handleGovtMonitorInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={govtMonitorFormData.password}
                                                            onChange={handleGovtMonitorInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            value={govtMonitorFormData.confirmPassword}
                                                            onChange={handleGovtMonitorInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={govtMonitorFormData.name}
                                                            onChange={handleGovtMonitorInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    
                                                    {govtMonitorErrorMessage && <p style={{color:"red"}}>{govtMonitorErrorMessage}</p>}
                                                    {govtMonitorSuccessMessage && <p style={{color:"green"}}>{govtMonitorSuccessMessage}</p>}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                        <button type="submit" className="theme-btn btn-one">
                                                            <span>Sign UP Government Monitor</span>
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
