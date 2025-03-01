"use client"
import React from 'react';
import Layout from "../../components/layout/Layout"
import Link from "next/link"

import axios from 'axios';
import { useState, useEffect} from 'react';
import useCitizens from '../../components/hooks/citizen.zustand';
const ProgressBar = ({ label, percent }) => (
    <div className="progress-box">
      <p>{label}</p>
      <div className="bar">
        <div className="bar-inner count-bar" style={{ width: `${percent}%` }}></div>
        <div className="count-text">{`${percent}%`}</div>
      </div>
    </div>
);

  
 
export default function Home() {

    const [household,setHousehold]=useState([]);
    const [family,setFamily]=useState([]);

  const Citizen = useCitizens((state) => state.selectedCitizen);

    useEffect(() => {
        const fetchHousehold = async () => {
            try {
                const response = await axios.get(`/api/household/get_household?household_id=${Citizen.household_id}`);
                console.log("Fetched Household:", response.data);
                setHousehold(response.data);

                const family_response = await axios.get(`/api/citizen/get_citizen_household?household_id=${Citizen.household_id}`);
                console.log("Fetched Family:", family_response.data);
                setFamily(family_response.data);


            } catch (error) {
                console.error("Error fetching Citizens:", error);
            }
        };

        

        fetchHousehold();

    }, []);

    const addCitizen = useCitizens((state)=>state.setNewCitizen);
    async function setCitizen(member){
        await addCitizen(member); //setting patient to Zustand state
        console.log("Patient Added:", member);
    }

   



    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Employee/citizen">
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
                                
                                        <p>
                                            Eget lorem dolor sed viverra. Mattis nunc sed blandit libero volutpat sed
                                            cras ornare arcu. consectetur adipiscing elit. Libero turpis blandit
                                            blandit mauris aliquam condimentum quam suspendisse Pellentesque habitant
                                            morbi tristique senectus et netus
                                        </p>
                                        <ul className="info-list mb_30 clearfix">
                                            <li><strong>Date of Birth: </strong>{Citizen.dob}</li>
                                            <li><strong>Email: </strong><Link href={`mailto:${Citizen.email}`}>{Citizen.email}</Link></li>
                                            <li><strong>Aadhar: </strong><Link href={`tel:${Citizen}`}>{Citizen.aadhar}</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                 <section className="team-details sec-pad-2">
                    <div className="auto-container">
                        <div className="team-details-content mb_50">
                            <div className="row clearfix">
                                
                                <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                                    <div className="content-box">
                                        <h2>House Data</h2>
                                        <p>
                                            Eget lorem dolor sed viverra. Mattis nunc sed blandit libero volutpat sed
                                            cras ornare arcu. consectetur adipiscing elit. Libero turpis blandit
                                            blandit mauris aliquam condimentum quam suspendisse Pellentesque habitant
                                            morbi tristique senectus et netus
                                        </p>
                                        <ul className="info-list mb_30 clearfix">
                                            <li><strong>Address: </strong>{household.address}</li>
                                            <li><strong>Income: </strong> ₹{household.household_income}</li>
                                            <ProgressBar label="Income/10000 percent" percent={household.household_income/10000}></ProgressBar>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <h2>Family members</h2>

                <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {family.map((member, index) => (
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
                                                        <img
                                                            style={{
                                                                width: "287px",
                                                                height: "220px",
                                                                overflow: "hidden", // Ensures no content spills outside
                                                            }} 
                                                            src={member.image}
                                                            alt={member.name}
                                                        />
                                                    </figure>
                                                   
                                                </div>
                                                <div className="lower-content">
                                                    <h3>
                                                        <Link href="citizen-data" onClick={()=>{
                                                            setCitizen(member);
                                                        }}>
                                                            {member.name}
                                                        </Link>
                                                    </h3>
                                                    <span className="designation">
                                                        Adhar: {member.aadhar}
                                                        
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

                


            </Layout>
        </>
               
    );
}
