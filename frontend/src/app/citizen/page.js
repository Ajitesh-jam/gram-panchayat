'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import useCitizens from "@/src/components/hooks/citizen.zustand";
import { useEffect } from "react";
import axios from "axios";
import AreaGraph from "@/src/components/area_graph/area_graph";



export default function service() {
    
    const Citizen = useCitizens((state)=> state.selectedCitizen);
    const setCitizen = useCitizens((state) => state.setNewCitizen);
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
            //scheme samples
            scheme_id: 1,
            scheme_name: "Dummy Scheme 1",
            criteria: "Criteria 1",

        },
        {
            scheme_id: 2,
            scheme_name: "Dummy Scheme 2",
            criteria: "Criteria 2",

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

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        aadhar: '',
        gender: '',
        dob: '',
        household_id: '',
        village_id: ''
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setFormData({
                name: Citizen?.name || '',
                email: Citizen?.email || '',
                phone: Citizen?.phone || '',
                aadhar: Citizen?.aadhar || '',
                gender: Citizen?.gender || '',
                dob: Citizen?.dob || '',
                household_id: Citizen?.household_id || '',
                village_id: Citizen?.village_id || ''
            });
            
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {aadhar} = formData;
            if (!aadhar) {
                console.error("Aadhar is missing.");
                return;
            }
            const response = await axios.put(`/api/citizen/update?aadhar=${aadhar}`, formData);

            console.log("Updated citizen details:", response.data);
            // Update the citizen in zustand
            setCitizen(response.data);            
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating citizen details:", error);
        }
    };

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
                                                            {isEditing ? (
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className = "singleline">
                                                                    Name:
                                                                    <input className = "typinginput" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                                                                    </div>
                                                                    <div className = "singleline">
                                                                    Email:
                                                                    <input className = "typinginput" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                                                                    </div>
                                                                    <div className = "singleline">
                                                                    phone:
                                                                    <input className = "typinginput" name="phone" value={formData.phone} onChange={handleChange} placeholder="phone" />
                                                                    </div>
                                                                    <div className = "singleline">
                                                                    Gender:
                                                                    <input className = "typinginput" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
                                                                    </div>
                                                                    <div className = "singleline">
                                                                    DOB:
                                                                    <input className = "typinginput" name="dob" value={formData.dob} onChange={handleChange} placeholder="DOB" />
                                                                    </div>
                                                                    <div className = "singleline">
                                                                    Household ID:
                                                                    <input className = "typinginput" name="household_id" value={formData.household_id} onChange={handleChange} placeholder="Household ID" />
                                                                    </div>
                                                                    <div className = "singleline">
                                                                    Village ID:
                                                                    <input className = "typinginput" name="village_id" value={formData.village_id} onChange={handleChange} placeholder="Village ID" />
                                                                    </div>
                                                                        <button className="Edit" type="submit">Save</button>
                                                                        <button className="Edit" type="button" onClick={handleEditToggle}>Cancel</button>
                                                                </form>
                                                            ) : (
                                                                <>
                                                                    <h3>{Citizen.name}</h3>
                                                                    <p>Email: {Citizen.email}</p>
                                                                    <p>phone: {Citizen.phone}</p>
                                                                    <p>Aadhar: {Citizen.aadhar}</p>
                                                                    <p>Gender: {Citizen.gender}</p>
                                                                    <p>DOB: {Citizen.dob}</p>
                                                                    <p>Household_id: {Citizen.household_id}</p>
                                                                    <p> Village_id: {Citizen.village_id}</p>
                                                                    <button className = "Edit" onClick={handleEditToggle}>Edit</button>
                                                                </>
                                                            )}
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

