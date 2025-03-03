'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import useCitizens from "@/src/components/hooks/citizen.zustand";
import { useEffect } from "react";

import axios from "axios";
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
    const Citizen = useCitizens((state) => state.selectedCitizen);
    //use effect to fectch the citizen from zustand
    useEffect(() => {
        console.log("Citizen in its page : ", Citizen);
    }, [Citizen])

    const [allSchemes, setAllSchemes] = useState([
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
                setAllSchemes(response.data);
            } catch (error) {
                console.error("Error fetching schemes:", error);
            }
        };

        fetchSchemes();
    }, [Citizen]);



    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Citizen Login">
                <div>
                    {/* service-section */}
                    <section className="service-details pt_120 pb_110">
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
                                                    <p> Contact:{Citizen.contact} </p>
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
                                                <h2>Land Records:</h2>

                                            </div>
                                        </div>
                                        <div className="content-two">
                                            <div className="image-inner">
                                                <div className="row clearfix">
                                                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                                                        <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                                            <div className="inner-box">
                                                                <figure className="image-box"><Link href="blog-details"><img src="assets/images/news/news-1.jpg" alt="" /></Link></figure>
                                                                <div className="lower-content">
                                                                    <ul className="post-info mb_15 clearfix">
                                                                        <li><Link href="blog-details">Admin</Link></li>
                                                                        <li>12 Jan 2022</li>
                                                                        <li>03 Comt</li>
                                                                    </ul>
                                                                    <h3><Link href="blog-details">How do Inherited Retinal of Diseases Happen?</Link></h3>
                                                                    <p>Tincidunt Maur nemi sit Interdum praesento eget morbi lacinia volutpat pellentesque Tincidunt aurna suspit.</p>
                                                                    <div className="link">
                                                                        <Link href="blog-details"><span>Read More</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                                                        <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                                            <div className="inner-box">
                                                                <figure className="image-box"><Link href="blog-details"><img src="assets/images/news/news-1.jpg" alt="" /></Link></figure>
                                                                <div className="lower-content">
                                                                    <ul className="post-info mb_15 clearfix">
                                                                        <li><Link href="blog-details">Admin</Link></li>
                                                                        <li>12 Jan 2022</li>
                                                                        <li>03 Comt</li>
                                                                    </ul>
                                                                    <h3><Link href="blog-details">How do Inherited Retinal of Diseases Happen?</Link></h3>
                                                                    <p>Tincidunt Maur nemi sit Interdum praesento eget morbi lacinia volutpat pellentesque Tincidunt aurna suspit.</p>
                                                                    <div className="link">
                                                                        <Link href="blog-details"><span>Read More</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                                                        <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                                            <div className="inner-box">
                                                                <figure className="image-box"><Link href="blog-details"><img src="assets/images/news/news-1.jpg" alt="" /></Link></figure>
                                                                <div className="lower-content">
                                                                    <ul className="post-info mb_15 clearfix">
                                                                        <li><Link href="blog-details">Admin</Link></li>
                                                                        <li>12 Jan 2022</li>
                                                                        <li>03 Comt</li>
                                                                    </ul>
                                                                    <h3><Link href="blog-details">How do Inherited Retinal of Diseases Happen?</Link></h3>
                                                                    <p>Tincidunt Maur nemi sit Interdum praesento eget morbi lacinia volutpat pellentesque Tincidunt aurna suspit.</p>
                                                                    <div className="link">
                                                                        <Link href="blog-details"><span>Read More</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    
                                                </div>
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
                                {allSchemes.map((scheme, index) => (
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
                                                        Criteria: {scheme.criteria}
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

