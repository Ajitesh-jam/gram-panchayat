"use client"
import React from 'react';
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import useCitizens from "../../components/hooks/citizen.zustand"

import { useState, useEffect} from 'react';
const ProgressBar = ({ label, percent }) => (
    <div className="progress-box">
      <p>{label}</p>
      <div className="bar">
        <div className="bar-inner count-bar" style={{ width: `${percent}%` }}></div>
        <div className="count-text">{`${percent}%`}</div>
      </div>
    </div>
);
// Sample medicine data
const medicines = [
  {
    name: "Paracetamol",
    img: "https://5.imimg.com/data5/SELLER/Default/2022/9/QR/AF/MV/69966959/paracip-paracetamol-650-tablet.jpg",
    category: "Painkiller",
  },
  {
    name: "Aspirin",
    img: "https://medias.watsons.com.ph/publishing/WTCPH-10000066-front-zoom.jpg?version=1721934089",
    category: "Heart",
  },
  {
    name: "Montelukast",
    img: "https://www.gnova.co.in/wp-content/uploads/2022/01/DESROTAC-M.jpg",
    category: "Lungs",
  },
  {
    name: "Gabapentin",
    img: "https://www.xalmeds.com/cdn/shop/files/241EC757-4996-4D2A-82FE-71A38CB58FAF_1445x.png?v=1711200853",
    category: "Neuro",
  },
  {
    name: "Ibuprofen",
    img: "https://5.imimg.com/data5/SELLER/Default/2023/9/344827499/TG/YT/FY/192270567/ibuprofen-tablet-400mg.png",
    category: "Painkiller",
  },
  {
    name: "Atorvastatin",
    img: "https://cdn01.pharmeasy.in/dam/products/J21424/atorvastatin-10-mg-tablet-10-medlife-pure-generics-combo-3-1626532296.jpg",
    category: "Heart",
  },
  {
    name: "Amoxicillin",
    img: "https://5.imimg.com/data5/SELLER/Default/2023/8/332350358/SI/JT/VF/98283251/amoxicillin-drugs3.jpg",
    category: "Antibiotic",
  },
  {
    name: "Cetirizine",
    img: "https://smarthealer.pk/wp-content/uploads/2024/09/cetirizine-tablet.webp",
    category: "Allergy",
  },
 
];


  
 
export default function Home() {

  const Citizen = useCitizens((state) => state.selectedCitizen);



    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Team Details">
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

                                            <ProgressBar label="Income" percent={67}></ProgressBar>
                                        </ul>
                                    </div>
                                </div>
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
