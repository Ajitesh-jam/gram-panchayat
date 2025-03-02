'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import useCitizens from "@/src/components/hooks/citizen.zustand";
import { useEffect } from "react";

import axios from "axios";
import AreaGraph from "@/src/components/area_graph/area_graph";



export default function service() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    const Citizen = useCitizens((state)=> state.selectedCitizen);
    //use effect to fectch the citizen from zustand
    useEffect(() => {
        console.log("Citizen in its page : ", Citizen);
    }, [Citizen])
    const [landRecords, setLandRecords] = useState([]);
    const [monthlyData, setMonthlyData] = useState([
         { x: "Jan", y: 30, label: "Jan" },
        { x: "Feb", y: 45, label: "Feb" },
        { x: "Mar", y: 25, label: "Mar" },
        { x: "Apr", y: 60, label: "Apr" },
        { x: "May", y: 40, label: "May" },
        { x: "Jun", y: 80, label: "Jun" },
        { x: "Jul", y: 70, label: "Jul" },
        { x: "Aug", y: 90, label: "Aug" },
        { x: "Sep", y: 65, label: "Sep" },
        { x: "Oct", y: 75, label: "Oct" },
        { x: "Nov", y: 85, label: "Nov" },
        { x: "Dec", y: 100, label: "Dec" }
    ]);

    const [allEnrolledSchemes, setallEnrolledSchemes] = useState([
        {
            name: "Black Marvin",
            aadhar: "Medical Assistant",
            image: "assets/images/team/team-1.jpg",
        },
        {
            name: "Eleanor Pena",
            aadhar: "Doctor",
            image: "assets/images/team/team-2.jpg",
        }
    ]);



    useEffect(() => {
        if (!Citizen || !Citizen.citizen_id) {
            console.warn("Citizen ID is missing.");
            return;
        }
        const fetchSchemes = async () => {
            try {
                
                const response = await axios.get(`/api/citizen/get_citizen_schemes?citizen_id=${Citizen.citizen_id}`);
                setallEnrolledSchemes(response.data);
                console.log( "enrolled shcme",response.data);

                

                const landResponse = await axios.get(`/api/land_records/get_citizen_land?citizen_id=${Citizen.citizen_id}`);
                setLandRecords(landResponse.data);
                console.log("Land Records ", landResponse.data);

                // Transforming land records into monthlyData
                const formattedData = landResponse.data.map(record => {
                    const date = new Date(record.year);
                    const month = date.toLocaleString("default", { month: "short" }); // Converts "1999-01-07" → "Jan"
                    return {
                        x: month?month : "Jan (rice)",
                        y: parseFloat(record.production)? parseFloat(record.production):100, // Convert production to number
                        label: `${month} (${record.crop})`
                    };
                });

                setMonthlyData(formattedData);
            } catch (error) {
                console.error("Error fetching schemes:", error);
            }
        };

        fetchSchemes();
    }, [Citizen]);



    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Citizen Login">
                
            <div className="p-6 bg-white rounded-lg shadow-md">
                <AreaGraph
                data={monthlyData}
                width={1800}
                height={400}
                title="Monthly Crop Production Performance"
                color="#3b82f6"
                gradientFrom="rgba(59, 196, 246, 0.6)"
                gradientTo="rgba(59, 130, 246, 0.05)"
                animationDuration={4}
                />
            </div>
            <div>
                {/* service-section */}
                <section className = "service-details pt_120 pb_110">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="default-sidebar service-sidebar mr_15">
                                <div className="service-block-one">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <figure className="image"><img src={Citizen.image} alt="" /></figure>
                                            <div className="icon-box"><i className="icon-30"></i></div>
                                        </div>
                                        <div className="lower-content">
                                            <h3> {Citizen.name} </h3>
                                            <p> Email:{Citizen.email} </p>
                                            <p> Contact:{Citizen.phone} </p>
                                            <p> Aadhar:{Citizen.aadhar} </p>
                                            <p> Gender:{Citizen.gender} </p>
                                            <p> DOB:{Citizen.dob} </p>
                                        </div>
                                    </div>
                                </div>
                            
                            <div className="sidebar-widget category-widget">
                                <div className="widget-title">
                                    <h3>Medical Records:</h3>
                                </div>
                                <div className="widget-content">
                                    <ul className="category-list clearfix">


                                    </ul>
                                </div>

                            </div>
                            
                            </div>
                        </div>

                    <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                        <div className="service-details-content">

                            <div className="content-one mb_60">
                                <div className="text-box">
                                    <h2>Medical Record Image</h2>
                                    
                                </div>
                            </div>
                            <div className="content-two">
                                <div className="image-inner">
                                    <div className="row clearfix">
                                    {landRecords.map((landRecord,index) => (
                                        <div key={index }className="col-lg-4 col-md-6 col-sm-12 news-block">
                                            <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                                <div className="inner-box">
                                                    <figure className="image-box">
                                                        <Link href="blog-details">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8LzmesVmNsCPwrABVIvdeXmvLIlkwBKhoA3PTsCQ7YbIlJDhBuplf3HQ9Msj3xzHCv7Y&usqp=CAU" alt="" />
                                                        </Link>
                                                    </figure>
                                                    <div className="lower-content">
                                                        <ul className="post-info mb_15 clearfix">
                                                            <li>Land Id : {landRecord.land_id} | 
                                                            {new Date(landRecord.year).toLocaleDateString()}
                                                            </li>
                                                        </ul>
                                                        <h3>
                                                            <Link href="#">Land Details</Link>
                                                        </h3>
                                                        <p>
                                                            In <strong>{new Date(landRecord.year).getFullYear()}</strong>, a land area of 
                                                            <strong> {landRecord.area} acres</strong> produced 
                                                            <strong> {landRecord.production} tons</strong> of <strong>{landRecord.crop}</strong>.
                                                        </p>

                                                        <p>
                                                            Tincidunt Maur nemi sit Interdum praesento eget morbi lacinia volutpat pellentesque Tincidunt aurna suspit.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                        <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                                            <figure className="image-box mb_30"><img src="assets/images/service/service-8.jpg" alt="" /></figure>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                                            <figure className="image-box mb_30"><img src="assets/images/service/service-9.jpg" alt="" /></figure>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-box">
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor mque lauda totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vite sunt explicabo. Nemo ipsam voluptatem quia voluptas sit aspernatur.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam nmco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehender it in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </section>


                <h1>Your Schemes</h1> 
                

                <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {allEnrolledSchemes.map((scheme, index) => (
                                    <div
                                        key={index}
                                        className="col-lg-3 col-md-6 col-sm-12 team-block"
                                    >
                                        <div
                                            className="team-block-one wow fadeInUp animated"
                                            data-wow-delay={`${index * 200}ms`}
                                            data-wow-duration="1500ms"
                                        >
                                            <div className="inner-box">
                                                <div className="image-box">
                                                    <figure className="image">
                                                        
                                                    </figure>
                                                    
                                                </div>
                                                <div className="lower-content">
                                                    <h3>
                                                        {scheme.scheme_name}
                                                    </h3>
                                                    <span className="designation">
                                                       <li> Criteria: {scheme.criteria}</li>
                                                        <li> Scheme Id: {scheme.scheme_id}</li>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                </section>


            </div>

            

            </Layout>
        </>
    )
}

