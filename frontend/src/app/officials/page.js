"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useEmployees from "../../components/hooks/employee.zustand";
import useGovernment from "@/src/components/hooks/government.zustand";
import useAdmin from "@/src/components/hooks/admin.zustand";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import "./style.css";

export default function Login() {
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const setEmployee = useEmployees((state) => state.setNewEmployee);
    const setGovt = useGovernment((state) => state.setNewGovernment);
    const setAdmin = useAdmin((state) => state.setNewAdmin);

    const login = async () => {
        if (!id || !password || !role) {
            alert("Please enter all details");
            return;
        }

        try {
            let apiUrl = "";
            if (role === "Employee") {
                apiUrl = `/api/employee/get?employee_id=${id}&password=${password}`;
            }

            if (role === "Government Monitor") {
                apiUrl = `/api/govt/get?govt_id=${id}&password=${password}`;
            }
            if (role === "Admin") apiUrl = `/api/admin/get?admin_id=${id}&password=${password}`;

            const response = await axios.get(apiUrl);


            if (role === "Employee") {
                setEmployee(response.data);
            }
            if (role === "Government Monitor") {

                setGovt(response.data);

            }
            if (role === "Admin") {
                setAdmin(response.data);
            }

            if (response.status === 200) {
                const navigateTo =
                    role === "Employee" ? "/panchayat-employee" :
                        role === "Government Monitor" ? "/govt-monitor" : "/admin";
                router.push(navigateTo);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Your password is incorrect");
                } else if (error.response.status === 404) {
                    alert("Record not found");
                } else {
                    alert("An error occurred while logging in");
                }
            } else {
                alert("Network error. Please try again later.");
                console.error("Login error:", error);
            }
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1}>
            <section className="contact-style-three pt_90 pb_120">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                            <div className="form-inner mr_40">
                                <div className="sec-title mb_50">
                                    <h2>Login</h2>
                                </div>
                                <div className="row_clearfix">
                                    <div className="form-group">
                                        <input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                        <select onChange={(e) => setRole(e.target.value)} required>
                                            <option value="">Select Role</option>
                                            <option value="Employee">Panchayat Employee</option>
                                            <option value="Government Monitor">Government Monitor</option>
                                            <option value="Admin">Administrator</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="theme-btn btn-one" onClick={login}>Login</button>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 image-column">
                            <figure className="image-box"><img src="assets/images/resource/citizen4.jpg" alt="" /></figure>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
