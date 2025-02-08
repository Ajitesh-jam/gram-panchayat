"use client"
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { useEffect,useState } from "react";
import axios from "axios";

import useCitizens from "../../components/hooks/Citizen.zustand"
export default function Home() {
    // JSON array of team members

    const [allCitizens, setAllCitizens] = useState([
        {
            name: "Black Marvin",
            aadhar: "Medical Assistant",
            image: "assets/images/team/team-1.jpg",
        },
        {
            name: "Eleanor Pena",
            aadhar: "Administrator",
            image: "assets/images/team/team-2.jpg",
        },
        {
            name: "Arlene Maccy",
            aadhar: "Nursing Assistant",
            image: "assets/images/team/team-3.jpg",
        },
        {
            name: "Jenny Wilson",
            aadhar: "Senior Administrator",
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

    const addCitizen = useCitizens((state)=>state.addCitizen);
    

    useEffect(() => {
        const fetchCitizens = async () => {
            try {
                const response = await axios.get("http://localhost:8000/getAllCitizens");
                console.log("Fetched Citizens:", response.data);
                setAllCitizens(response.data);
                
            } catch (error) {
                console.error("Error fetching Citizens:", error);
            }
        };

        fetchCitizens();
    }, []);


    async function setCitizen(member){
        await addCitizen(member); //setting Citizen to Zustand state
        console.log("Citizen Added:", member);
    }

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Administrator">
                <div>
                    <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {allCitizens.map((member, index) => (
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
                                                        <Link href="Citizen-data" onClick={()=>{
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
                    {/* subscribe */}
                    <section className="subscribe-section">
                        <div className="auto-container">
                            <div className="inner-container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                                        <div className="text-box">
                                            <h2>
                                                <span>Subscribe</span> for the
                                                exclusive updates!
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                                        <div className="form-inner">
                                            <form
                                                method="post"
                                                action="contact"
                                            >
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Your Email Address"
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="theme-btn btn-one"
                                                    >
                                                        <span>
                                                            Subscribe Now
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="form-group">
                                                    <div className="check-box">
                                                        <input
                                                            className="check"
                                                            type="checkbox"
                                                            id="checkbox1"
                                                        />
                                                        <label htmlFor="checkbox1">
                                                            I agree to the{" "}
                                                            <Link href="/">
                                                                Privacy Policy.
                                                            </Link>
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* subscribe end */}
                </div>
            </Layout>
        </>
    );
}
