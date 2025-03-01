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

    const Citizen = useCitizens((state)=> state.selectedCitizen);
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
        const fetchSchemes = async () => {
            try {
                const response = await axios.get(`/api/scheme/get_all`);
                console.log("Fetched Schemes:", response.data);
                setAllSchemes(response.data);
            } catch (error) {
                console.error("Error fetching Citizens:", error);
            }
        };

        fetchSchemes();
    }, []);



    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Citizen Login">
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
                                            <p> Contact:{Citizen.contact} </p>
                                            <p> Aadhar:{Citizen.aadhar} </p>
                                            <p> Gender:{Citizen.gender} </p>
                                            <p> DOB:{Citizen.dob} </p>
                                        </div>
                                    </div>
                                </div>
                           
                            <div className="sidebar-widget category-widget">
                                <div className="widget-title">
                                    <h3>Your personal information:</h3>
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
                                    <h2 >Public Info</h2>
                                </div>
                            </div>
                            {/* <div className="content-two">
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
                            </div> */}
                            <h1> Schemes provided by Government</h1>
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
                                                                <Link href={`scheme-data?scheme_id=${scheme.scheme_id}`} onClick={() => {
                                                                    setCitizen(scheme);
                                                                }}>
                                                                    
                                                                    {scheme.scheme_name}
                                                                </Link>
                                                            </h3>
                                                            <span className="designation">

                                                                Criteria: {scheme.criteria}
                                                                SchemeId: {scheme.scheme_id}
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
                            </div>
                        </div>
                    </div>
                </section>
                {/* service-section end */}
                      {/* subscibe */}
                      <section className="subscribe-section">
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
                            <div className="pagination-wrapper mt_20 centred">
                                <ul className="pagination clearfix">
                                    <li>
                                        <Link href="team" className="current">
                                            1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="team">2</Link>
                                    </li>
                                    <li>
                                        <Link href="team">3</Link>
                                    </li>
                                    <li>
                                        <Link href="team">
                                            <i className="icon-36"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
              
                </div>

            </Layout>
        </>
    )
}

