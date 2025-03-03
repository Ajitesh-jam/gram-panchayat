"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import axios from "axios";
import useCitizens from "../../components/hooks/citizen.zustand";

const ProgressBar = ({ label, percent }) => (
    <div className="progress-box">
        <p>{label}</p>
        <div className="bar" style={{ position: "relative", width: "100%", backgroundColor: "#ddd", borderRadius: "10px", height: "25px" }}>
            <div 
                className="bar-inner count-bar" 
                style={{ 
                    width: `${percent}%`, 
                    backgroundColor: "#4CAF50", 
                    height: "100%", 
                    borderRadius: "10px", 
                    position: "absolute" 
                }}
            ></div>
            <div 
                className="count-text" 
                style={{ 
                    position: "absolute", 
                    width: "100%", 
                    textAlign: "center", 
                    fontWeight: "bold", 
                    lineHeight: "25px", 
                    color: percent > 50 ? "white" : "black"
                }}
            >
                {`${percent}%`}
            </div>
        </div>
    </div>
);


export default function Home() {
    const [household, setHousehold] = useState({});
    const [family, setFamily] = useState([]);

    const Citizen = useCitizens((state) => state.selectedCitizen);

    useEffect(() => {
        if (!Citizen || !Citizen.household_id) {
            console.warn("Citizen data is missing.");
            return;
        }

        const fetchHousehold = async () => {
            try {
                const response = await axios.get(`/api/household/get_household?household_id=${Citizen.household_id}`);
                setHousehold(response.data);

                const familyResponse = await axios.get(`/api/citizen/get_citizen_household?household_id=${Citizen.household_id}`);
                setFamily(familyResponse.data);
            } catch (error) {
                console.error("Error fetching household or family data:", error);
            }
        };

        fetchHousehold();
    }, [Citizen]);

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
    const [allCanenrolSchemes, setallCanenrolSchemes] = useState([]);

    useEffect(() => {
        if (!Citizen || !Citizen.citizen_id) {
            console.warn("Citizen ID is missing.");
            return;
        }

        const fetchSchemes = async () => {
            try {
                const response = await axios.get(`/api/citizen/get_citizen_schemes?citizen_id=${Citizen.citizen_id}`);
                setallEnrolledSchemes(response.data);

                const allschemes = await axios.get(`/api/scheme/get_all`);
                allschemes.data.forEach((scheme) => {
                    const isEnrolled = response.data.find((scheme1) => scheme1.scheme_id === scheme.scheme_id);
                    if (!isEnrolled) {
                        setallCanenrolSchemes((prev) => [...prev, scheme]);
                    }
                });
            } catch (error) {
                console.error("Error fetching schemes:", error);
            }
        };

        fetchSchemes();
    }, [Citizen]);

    const addCitizen = useCitizens((state) => state.setNewCitizen);
    async function setCitizen(member) {
        await addCitizen(member);
        console.log("Citizen Updated:", member);
    }

    function enrolInScheme(scheme_id){
        axios.post(`/api/citizen/enrol_in_scheme`, {
            citizen_id: Citizen.citizen_id,
            scheme_id: scheme_id
            })
            .then((response) => {
                //referesh the page
                window.location.reload();
                //console.log("console.log response ", response);
            })

    }

    return (
        <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Employee/Citizen">
            <section className="team-details sec-pad-2">
                <div className="auto-container">
                    <div className="team-details-content mb_50">
                        <div className="row clearfix">
                            <div className="col-lg-5 col-md-12 col-sm-12 image-column">
                                <figure className="image-box mr_15">
                                    <img src={Citizen.image} alt={Citizen.name} />
                                </figure>
                            </div>
                            <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                                <div className="content-box">
                                    <h2>{Citizen.name}</h2>
                                    <ul className="info-list mb_30 clearfix">
                                        <li><strong>Date of Birth: </strong>{Citizen.dob}</li>
                                        <li><strong>Email: </strong><Link href={`mailto:${Citizen.email}`}>{Citizen.email}</Link></li>
                                        <li><strong>Aadhar: </strong>{Citizen.aadhar}</li>
                                        <li><strong>Aadhar: </strong>{Citizen.citizen_id}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schemes Section */}
            <section className="team-section sec-pad-2 centred">
                <div className="auto-container">
                    <h2>All Enrolled Schemes for {Citizen.name}</h2>
                    <div className="row clearfix">
                        {allEnrolledSchemes.length > 0 ? (
                            allEnrolledSchemes.map((scheme, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-sm-12 team-block">
                                    <div className="team-block-one wow fadeInUp animated"
                                        data-wow-delay={`${index * 200}ms`}
                                        data-wow-duration="1500ms">
                                        <div className="inner-box">
                                            <div className="lower-content">
                                                <h3>
                                                    <Link href={`scheme-data?scheme_id=${scheme.scheme_id}`}
                                                        onClick={() => setCitizen(scheme)}>
                                                        {scheme.scheme_name}
                                                    </Link>
                                                </h3>
                                                <span className="designation">Criteria: {scheme.criteria}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No schemes available for this citizen.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Household Data */}
            <section className="team-details sec-pad-2">
                <div className="auto-container">
                    <div className="team-details-content mb_50">
                        <div className="row clearfix">
                            <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                                <div className="content-box">
                                    <h2>House Data</h2>
                                    <ul className="info-list mb_30 clearfix">
                                        <li><strong>Address: </strong>{household.address}</li>
                                        <li><strong>Income: </strong> ₹{household.household_income}</li>
                                        <ProgressBar label="Income (out of ₹10,000)" percent={(household.household_income / 10000) } />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Family Members */}
            <section className="team-section sec-pad-2 centred">
                <div className="auto-container">
                    <h2>Family Members</h2>
                    <div className="row clearfix">
                        {family.length > 0 ? (
                            family.map((member, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-sm-12 team-block">
                                    <div className="team-block-one wow fadeInUp animated"
                                        data-wow-delay={`${index * 200}ms`}
                                        data-wow-duration="1500ms">
                                        <div className="inner-box">
                                            <div className="image-box">
                                                <figure className="image">
                                                    <img src={member.image} alt={member.name} />
                                                </figure>
                                            </div>
                                            <div className="lower-content">
                                                <h3>
                                                    <Link href="citizen-data" onClick={() => setCitizen(member)}>
                                                        {member.name}
                                                    </Link>
                                                </h3>
                                                <span className="designation">Aadhar: {member.aadhar}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No family members found.</p>
                        )}
                    </div>
                </div>
            </section>

             {/* Can enrol scheme*/}   
                <h1>You can enroll Citizen in Below Schemes</h1>                      
                <section className="team-section sec-pad-2 centred">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {allCanenrolSchemes.map((scheme, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-sm-12 team-block">
                                    <div className="team-block-one wow fadeInUp animated" data-wow-delay={`${index * 200}ms`} data-wow-duration="1500ms">
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
                                                <button onClick={()=>{enrolInScheme(scheme.scheme_id)}} className="theme-btn btn-two"><span>Enroll</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
            </section>        

        </Layout>
    );
}
