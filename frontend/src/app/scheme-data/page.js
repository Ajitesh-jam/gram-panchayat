"use client"
import React from 'react';
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import useCitizens from "../../components/hooks/citizen.zustand"
import useEmployees from "../../components/hooks/employee.zustand"
import { useState, useEffect} from 'react';
import { useSearchParams } from "next/navigation";
import axios from 'axios';
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

  const Citizen = useCitizens((state) => state.selectedCitizen);

   const employee = useEmployees((state) => state.selectedEmployee);

   //get scheme id from the url
    const searchParams = useSearchParams();
  const schemeId = searchParams.get("scheme_id");
   const [allCitizen,setAllCitizen] = useState([])
 
     useEffect(() => {
       console.log("Employee: " , employee);
       console.log("Scheme: " , schemeId);
       const fetchSchemes = async () => {
           try {
               const response = await axios.get(`/api/scheme/getVillage_scheme?village_id=${employee.village_id}&scheme_id=${schemeId}`);
               console.log("Fetched Schemes:", response.data);
               setAllCitizen(response.data);
           } catch (error) {
               console.error("Error fetching Citizens:", error);
           }
       };
 
       fetchSchemes();
   }, []);




    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Team Details">
                <section className="team-details sec-pad-2">
                <div className="auto-container">
                    <div className="team-details-content mb_50">
                        <div className="row clearfix">
                            <div className="col-lg-5 col-md-12 col-sm-12 image-column">
                                <figure className="image-box mr_15"><img src={Citizen.image} alt="" /></figure>
                            </div>
                                            <h1>Your Gram Citizens</h1> 

                <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {allCitizen.map((member, index) => (
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
                                                    {/* <ul className="social-links clearfix">
                                                        <li>
                                                            <Link href="/">
                                                                <i className="icon-4"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/">
                                                                <i className="icon-5"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/">
                                                                <i className="icon-6"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/">
                                                                <i className="icon-7"></i>
                                                            </Link>
                                                        </li>
                                                    </ul> */}
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
