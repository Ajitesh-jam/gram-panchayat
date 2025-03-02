"use client"
import Layout from "../../components/layout/Layout"
import Link from "next/link"

import axios from "axios";
import { useState,useEffect } from "react";

//import router
import { useRouter } from "next/navigation";

import useEmployees from "../../components/hooks/employee.zustand";

export default function Home() {

    //const Citizens = useEmployees((state) => state.setNewCitizen);
    const Employees = useEmployees((state) => state.setNewEmployee);
    const fetchedEmployee = useEmployees((state) => state.selectedEmployee);

    //const navigate = useNavigate(); // Use navigate instead of router
    const [id,setId] = useState(); 
    const [password,setPassword] = useState(); 

    //router to navigate
    const router = useRouter();

    async function login() {
        console.log("Login called");
        try {
            
            //const response = await axios.get(`http://localhost:8000/getRecord/${id}/${password}`);
            //if (response.status === 200) {
                //Citizens(response.data); // Update Citizen data in Zustand
                console.log("Successfully logged in as Administrator: ");

                //naviagte to /Administrator
                router.push("/panchayat-employee");

            //}
        } catch (error) {
            //Handle specific error cases
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Your password is incorrect");
                } else if (error.response.status === 404) {
                    alert("Citizen record not found");
                } else {
                    alert("An error occurred while logging in");
                }
            } else {
                alert("Network error. Please try again later.");
                console.log("error: ",error);
            }
        }
    }



    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                console.log("Fetching employee : ",fetchedEmployee );
                // if(fetchedEmployee.employee_id!==-1){
                //     router.push("/panchayat-employee");
                // }

            } catch (error) {
               
            }
        };

        fetchEmployee();

    }, []);

    async function loginEmployee() {
        console.log("Login called");
        try {

            const response = await axios.get(`/api/employee/get?employee_id=${id}&password=${password}`);
            
            console.log("Successfully logged in as : ",response.data);
            if (response.status === 200) {
                Employees(response.data); // Update Citizen data in Zustand

                router.push("/panchayat-employee");
                //naviagte to /Employee
            }
        } catch (error) {
            //Handle specific error cases
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Your password is incorrect");
                } else if (error.response.status === 404) {
                    alert("Citizen record not found");
                } else {
                    alert("An error occurred while logging in");
                }
            } else {
                alert("Network error. Please try again later.");
                console.log("error: ",error);
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
                                            <h2>Login as a Administrator</h2>
                                        </div>



                                        <h1>yaha sign up bana dena Pallav</h1>





                                            <>
                                                <div className="row clearfix">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="fname" placeholder="Adhar" onChange={(e) => setId(e.target.value)} required />
                                                    </div>
                                                    
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="summary" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required />
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
