'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import {  getMedicalRecord } from "../../components/utils/web3.js"; // Added updateRecordByAdministrator
import useCitizens from "../../components/hooks/Citizen.zustand"
import { useEffect } from "react";
import { retrieveFileWithSignedURL } from '../../components/utils/pinata.js';

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

    //Medical Record
    const [medicalRecords, setMedicalRecords] = useState([
        {
            "NO RECORDS FOUND": "No Records Found"
        }
    ]); // State for storing medical records
    
    const [fileUrls, setFileUrls] = useState([]); // Array to store URLs for each record
    const [loading, setLoading] = useState([]);    // Array to track loading states for each record
    const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // State to track the current URL being displayed

    // Function to get a medical record using the Web3 contract
    const handleGetMedicalRecord = async (publicAddress) => {
        console.log("Handle get Medical Record with public Address : ",publicAddress);
        try {
           
            const medicalRecord = await getMedicalRecord(Citizen.publicAddress,Citizen.publicAddress);

            console.log("Records Fetched by handleGetMedical Record : ",medicalRecord);
            setMedicalRecords(medicalRecord);

            return medicalRecord; // Return the fetched medical record
        } catch (e) {
            console.error("Error fetching medical record:", e);
            console.log("Administrator NOT CONNECTED");
            return [];
        }
    };
    //Function to Update Links whenever change in medical records
    useEffect(() => {
        if(medicalRecords.length > 0){
            medicalRecords.forEach((record, index) => {
    
            if (!fileUrls[index] && !loading[index] ) {
                if(record!="No records found")
                handleRetrieve(record, index);
                else{
                setFileUrls([...fileUrls, "No records found"]);
                setLoading([...loading, false]);
                } 
            }
            });
        }
    }, [medicalRecords]);


    // const fetchData = async (cid) => {////////////////////////////////To change this
    //     console.log("FETCHING DATA FOR CID:", cid);
    //     const url = await retrieveFileWithSignedURL(cid);
    //     const apiResponse = await fetch(`http://localhost:8000/pinataContent?url=${url}`);
    //     const { data, contentType } = await apiResponse.json();
    //     console.log("Fetched data:", data, "Content-Type:", contentType);
    // };
    

    // //function to get file links from Pinata 
    const handleRetrieve = async (cid, index) => {
        if (!cid) return;

        try {
            setLoading((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = true;  // Set loading state for the current record
            return updatedLoading;
            });
            const url = await retrieveFileWithSignedURL(cid);
            //fetchData(cid);////////////////////////////////To change this


            //create a get request of the url and console log out
            //const response = await fetch(url);//, headers: {   "Accept": "application/json" }
            // const data = await response.json();
            // console.log("Data from the URL : ",data);
            
            setFileUrls((prev) => {
            const updatedUrls = [...prev];
            updatedUrls[index] = url;  // Store retrieved URL in the corresponding index
            return updatedUrls;
            });

        } catch (error) {
            console.error("Error retrieving file:", error);
        } finally {
            setLoading((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = false;  // Set loading state to false after fetching
            return updatedLoading;
            });

        }
    };

    
    useEffect(() => {
        if(medicalRecords.length > 0){
            handleGetMedicalRecord(Citizen.publicAddress);
        }
    },[]);



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
                                            <p> DOB:{Citizen.DOB} </p>
                                        </div>
                                    </div>
                                </div>
                           
                            <div className="sidebar-widget category-widget">
                                <div className="widget-title">
                                    <h3>Medical Records:</h3>
                                </div>
                                <div className="widget-content">
                                    <ul className="category-list clearfix">

                                    {medicalRecords.length > 0 ? (
                                        medicalRecords.map((record, index) => (
                                            <div key={index}>

                                                {fileUrls[index] ? (
                                                    <li><a 
                                                        
                                                        className={currentUrlIndex === index ? "current" : ""}
                                                        onClick={() => setCurrentUrlIndex(index)}
                                                    >
                                                        Record {index + 1}
                                                    </a></li>                                           
                                                ) : (
                                                <span className="loading-animation">Fetching record...</span>
                                                )}
                                            </div>
                                            ))
                                        ) : (
                                        <p>No medical records Found!!</p>
                                        )
                                    }
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
                                    {fileUrls[currentUrlIndex] ? (
                                        <>
                                        {/* <figure className="image-box mb_40"><img src={fileUrls[currentUrlIndex]} alt="Record" /></figure> */}
                                        
                                       
                                        <a href={fileUrls[currentUrlIndex]} target="_blank" rel="noreferrer">Access Record</a>

                                        </>
                                    ) : (
                                        <p>Loading image...</p>
                                    )}
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
                {/* service-section end */}
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

