'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import useEmployees from "@/src/components/hooks/employee.zustand"
import useCitizens from "@/src/components/hooks/citizen.zustand"

import axios from "axios"
export default function Service() {
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


    const Employee = useEmployees((state) => state.selectedEmployee)
    //use useEffect to call employee
    useEffect(() => {
        //call employee
        console.log("Employee in page :",Employee);
    }, []);


    const [allCitizen, setAllCitizen] = useState([
        {
            name: "Black Marvin",
            aadhar: "Medical Assistant",
            image: "assets/images/team/team-1.jpg",
        },
        {
            name: "Eleanor Pena",
            aadhar: "Doctor",
            image: "assets/images/team/team-2.jpg",
        },
        {
            name: "Arlene Maccy",
            aadhar: "Nursing Assistant",
            image: "assets/images/team/team-3.jpg",
        },
        {
            name: "Jenny Wilson",
            aadhar: "Senior Doctor",
            image: "assets/images/team/team-4.jpg",
        },
        {
            name: "Jerome Bell",
            aadhar: "Cardiologist",
            image: "assets/images/team/team-9.jpg",
        },
        {
            name: "Guy Hawkins",
            aadhar: "Pathologist",
            image: "assets/images/team/team-10.jpg",
        },
        {
            name: "Courtney Henry",
            aadhar: "Pathologist",
            image: "assets/images/team/team-11.jpg",
        },
        {
            name: "Ralph Edwards",
            aadhar: "Ophthalmologist",
            image: "assets/images/team/team-12.jpg",
        },
    ]);

    const addCitizen = useCitizens((state)=>state.setNewCitizen);
    

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`/api/citizen/getAll`);
                console.log("Fetched citizens:", response.data);
                setAllCitizen(response.data);
                
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);


    async function setCitizen(member){
        await addCitizen(member); //setting patient to Zustand state
        console.log("Patient Added:", member);
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Hospital Angels">
                <section className="team-details sec-pad-2">
                    <div className="auto-container">
                        <div className="team-details-content mb_50">
                            <div className="row clearfix">
                                <div className="col-lg-5 col-md-12 col-sm-12 image-column">
                                    <figure className="image-box mr_15">
                                        <img src={Employee.image} alt={Employee.name} />
                                    </figure>
                                </div>
                                <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                                    <div className="content-box">
                                        <h2>{Employee.name}</h2>
                                        <span className="designation">POST: {Employee.role} </span>
                                        <p>
                                            Eget lorem dolor sed viverra. Mattis nunc sed blandit libero volutpat sed
                                            cras ornare arcu. consectetur adipiscing elit. Libero turpis blandit
                                            blandit mauris aliquam condimentum quam suspendisse Pellentesque habitant
                                            morbi tristique senectus et netus
                                        </p>
                                        <ul className="info-list mb_30 clearfix">
                                            <li><strong>Date of Birth: </strong>{Employee.dob}</li>
                                            <li><strong>Email: </strong><Link href={`mailto:${Employee.email}`}>{Employee.email}</Link></li>
                                            <li><strong>Aadhar: </strong><Link href={`tel:${Employee}`}>{Employee.aadhar}</Link></li>
                                            <li><strong>Employee ID: </strong>{Employee.employee_id}</li>
                                            <li><strong>Aadhar: </strong>{Employee.aadhar}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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



                {/* Subscribe Section */}
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
            </Layout>
        </>
    )
}

