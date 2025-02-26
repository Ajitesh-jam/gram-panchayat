

'use client';
import Layout from "../../components/layout/Layout";
import { useState } from 'react';
import { getAccounts } from "../../components/utils/web3.js";
import useEmployees from "../../components/hooks/employee.zustand.js";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";

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
        EmployeeId: "",
        post: "",



        publicAddress:"",




    });
    const [account, setAccount] = useState(null);


    const Employees = useEmployees((state) => state.setNewEmployee);
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

        // if (!account) {
        //     alert("Please connect your wallet first.");
        //     return;
        // }
        //encrypt the password
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        formData.password = hashedPassword;
        const EmployeeData = {
            ...formData,
            publicAddress:account
            
        };
        console.log("Submitting form with data:", EmployeeData);

        // API call or Zustand action
        axios.post(`http://localhost:8000/Employee/createRecord/${formData.publicAddress}`, EmployeeData);


        Employees(EmployeeData);
        router.push("/Employee");
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Employee Signup">
                {/* Appointments-section */}
                <section className="appointment-section sec-pad-2">
                    <div className="outer-container p_relative">
                        <div
                            className="bg-layer"
                            style={{
                                backgroundImage: "url(https://ennoblecare.com/wp-content/uploads/2023/09/iStock-1152844782.jpg)",
                                // width: "1608px",
                                // height: "937px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
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
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="EmployeeId"
                                                        placeholder="Employee ID Number"
                                                        value={formData.EmployeeId}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <input
                                                        type="text"
                                                        name="post"
                                                        placeholder="Post"
                                                        value={formData.post}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
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

// 'use client';
// import Layout from "../../components/layout/Layout";
// import { useState } from 'react';
// import { getAccounts } from "../../components/utils/web3.js";

// import { useRouter } from "next/navigation";
// import axios from "axios";
// import bcrypt from "bcryptjs";



// export default function Home() {
//     const [isActive, setIsActive] = useState({ status: false, key: 1 });
//     const [formData, setFormData] = useState({
//         name: "",
//         phone: "",
//         email: "",
//         DOB: "",
//         aadhar: "",
//         gender: "",
//         password: "",
//         confirmPassword: "",
//         image: "",
//         EmployeeId: "",
//         post: "",
//     });
//     const [account, setAccount] = useState(null);

//     const addEmployee = useEmployees((state) => state.set);
//     const router = useRouter();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const connectWallet = async () => {
//         try {
//             const accounts = await getAccounts();
//             setAccount(accounts[0]);
//             console.log("Connected account:", accounts[0]);
//         } catch (error) {
//             console.error("Error connecting wallet:", error);
//         }
//     };

//     const submit = async (e) => {
//         e.preventDefault();

//         if (!account) {
//             alert("Please connect your wallet first.");
//             return;
//         }
//         if (formData.password !== formData.confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         try {
//             const hashedPassword = await bcrypt.hash(formData.password, 10);
//             const EmployeeData = {
//                 ...formData,
//                 password: hashedPassword,
//                 publicAddress: account,
//             };

//             // Call API to create record
//             const response = await axios.post(`http://localhost:8000/Employee/createRecord/${account}`, EmployeeData);

//             if (response.status === 200) {
//                 alert(response.data.message);
//                 addEmployee(EmployeeData); // Update Zustand state
//                 router.push("/Employee");
//             } else {
//                 alert("Failed to create Employee record.");
//             }
//         } catch (error) {
//             console.error("Error creating Employee record:", error);
//             alert("Error: Unable to create Employee record.");
//         }
//     };

//     return (
//         <>
//             <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Employee Signup">
//                 <section className="appointment-section sec-pad-2">
//                     <div className="outer-container p_relative">
//                         <div
//                             className="bg-layer"
//                             style={{
//                                 backgroundImage: "url(https://ennoblecare.com/wp-content/uploads/2023/09/iStock-1152844782.jpg)",
//                                 backgroundSize: "cover",
//                                 backgroundPosition: "center",
//                             }}
//                         ></div>
//                         <div className="auto-container">
//                             <div className="row clearfix">
//                                 <div className="col-lg-7 col-md-12 col-sm-12 form-column">
//                                     <div className="form-inner">
//                                         <form className="default-form" onSubmit={submit}>
//                                             <div className="row clearfix">
//                                                 {/* Form fields */}
//                                                 <div className="col-lg-12 form-group">
//                                                     <input
//                                                         type="text"
//                                                         name="name"
//                                                         placeholder="Name"
//                                                         value={formData.name}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div className="col-lg-6 form-group">
//                                                     <input
//                                                         type="text"
//                                                         name="phone"
//                                                         placeholder="Phone"
//                                                         value={formData.phone}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div className="col-lg-6 form-group">
//                                                     <input
//                                                         type="email"
//                                                         name="email"
//                                                         placeholder="Email"
//                                                         value={formData.email}
//                                                         onChange={handleInputChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                                 {/* Additional fields */}
//                                                 <div className="col-lg-6 form-group">
//                                                     <input
//                                                         type="text"
//                                                         name="EmployeeId"
//                                                         placeholder="Employee ID"
//                                                         value={formData.EmployeeId}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                 </div>
//                                                 <div className="col-lg-6 form-group">
//                                                     <input
//                                                         type="text"
//                                                         name="post"
//                                                         placeholder="Post"
//                                                         value={formData.post}
//                                                         onChange={handleInputChange}
//                                                     />
//                                                 </div>
//                                                 <div className="col-lg-12 form-group">
//                                                     <button
//                                                         type="button"
//                                                         className="theme-btn btn-one"
//                                                         onClick={connectWallet}
//                                                     >
//                                                         Connect Wallet
//                                                     </button>
//                                                 </div>
//                                                 <div className="col-lg-12 form-group message-btn">
//                                                     <button type="submit" className="theme-btn btn-one">
//                                                         Sign Up
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </Layout>
//         </>
//     );
// }
