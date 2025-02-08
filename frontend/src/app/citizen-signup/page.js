'use client';
import Layout from "../../components/layout/Layout";
import { useState } from 'react';
import { getAccounts } from "../../components/utils/web3.js";
import useCitizens from "../../components/hooks/Citizen.zustand.js";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";

import tryimg from "../../../public/assets/images/NewLogo.png";

export default function Home() {

    const [isActive, setIsActive] = useState({ status: false, key: 1 });
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        DOB: "",
        aadhar: "",
        gender: "",
        password: "",
        confirmPassword: "",
        image: "",
    });
    const [account, setAccount] = useState(null);


    const Citizens = useCitizens((state) => state.setNewCitizen);
    const router = useRouter();

    const handleToggle = (key) => {
        setIsActive((prev) => ({
            status: prev.key !== key,
            key,
        }));
    };

    const connectWallet = async () => {
        try {
            const accounts = await getAccounts();
            setAccount(accounts[0]);

            console.log("Connected account:", accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleFileChange = (e) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         image: e.target.files[0],
    //     }));
    // };

    const submit = async (e) => {
        e.preventDefault();

        if (!account) {
            alert("Please connect your wallet first.");
            return;
        }
        //encrypt the password
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        formData.password = hashedPassword;
        const CitizenData = {
            ...formData,
            publicAddress: account
        };
        console.log("Submitting form with data:", CitizenData);

        // API call or Zustand action
        axios.post(`http://localhost:8000/createRecord/${account}`, CitizenData);


        Citizens(CitizenData);
        router.push("/Citizen");
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Citizen Signup">
                {/* Appointments-section */}
                <section className="appointment-section sec-pad-2">
                    <div className="outer-container p_relative">
                        <div
                            className="bg-layer"
                            style={{
                                backgroundImage: "url(assets/images/NewLogo.png)",//"url(https://ennoblecare.com/wp-content/uploads/2023/09/iStock-1152844782.jpg)",
                                // width: "1608px",
                                // height: "937px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            
                        >

                        </div>
                       
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-7 col-md-12 col-sm-12 form-column">
                                    <div className="form-inner">
                                        <form className="default-form" onSubmit={submit}>
                                            <div className="row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Contact"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="date"
                                                        name="DOB"
                                                        placeholder="DOB (DD-MM-YYYY)"
                                                        value={formData.DOB}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="aadhar"
                                                        placeholder="Aadhar"
                                                        value={formData.aadhar}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-9 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="image"
                                                        placeholder="Provide valid image url for upload"
                                                        onChange={handleInputChange}

                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-3 col-sm-12 form-group">
                                                    
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        
                                                        value="male"
                                                        checked={formData.gender === "male"}
                                                        onChange={handleInputChange}
                                                    /> Male
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        
                                                        value="female"
                                                        checked={formData.gender === "female"}
                                                        onChange={handleInputChange}
                                                    /> Female

                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="password"
                                                        placeholder="Password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="confirmPassword"
                                                        placeholder="Confirm Password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <p>Please Download MetaMask and connect your wallet</p>
                                                    <button
                                                        type="button"
                                                        className="theme-btn btn-one"
                                                        onClick={connectWallet}
                                                    >
                                                        <span>Connect Wallet</span>
                                                    </button>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                    <button type="submit" className="theme-btn btn-one">
                                                        <span>Sign UP</span>
                                                    </button>
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
    );
}

