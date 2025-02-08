"use client"
import React from 'react';
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { getAccounts, getMedicalRecord, updateRecordByAdministrator } from "../../components/utils/web3.js"; // Added updateRecordByAdministrator
import useCitizens from "../../components/hooks/Citizen.zustand"
import { useState, useEffect} from 'react';


import { retrieveFileWithSignedURL,uploadFile ,uploadMedicines } from '../../components/utils/pinata.js';
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

    //Administrator MetaMask and Web3 Methods

    //const [account, setAccount] = useState(null);
    const [accountConnected,setAccountConnected] = useState(false);
    let account = null;
    // Function to connect the wallet
    const connectWallet = async () => {
        try {
            
            const accounts = await getAccounts();
            //setAccount(accounts[0]);
            account = accounts[0];
            console.log("Connected account:", account);
            setAccountConnected(true);

            handleGetMedicalRecord(Citizen.publicAddress); 
            } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };


    //Citizen Details
    const Citizen = useCitizens((state)=>state.selectedCitizen);


    //Medical Record
    const [medicalRecords, setMedicalRecords] = useState([
        {
            "NO RECORDS FOUND": "No Records Found"
        }
    ]); // State for storing medical records
    
    const [fileUrls, setFileUrls] = useState([]); // Array to store URLs for each record
    const [loading, setLoading] = useState([]);    // Array to track loading states for each record
    // Function to get a medical record using the Web3 contract
    const handleGetMedicalRecord = async (publicAddress) => {
        console.log("Handle get Medical Record with public Address : ",publicAddress);
        try {
            if (!publicAddress) {
                console.log("No public address provided");
                return;
            }
            const medicalRecord = await getMedicalRecord(publicAddress,account);

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

    //function to get file links from Pinata 
    const handleRetrieve = async (cid, index) => {
        if (!cid) return;

        try {
          setLoading((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = true;  // Set loading state for the current record
            return updatedLoading;
          });

          const url = await retrieveFileWithSignedURL(cid);

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




    //file to update
    const [file, setFile] = useState(null);
    //Pinata
    const [cid, setCid] = useState('');
    let newRecord = cid;
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (!file) {
          alert("Please select a file to upload");
          return;
        }
    
        try {
          const fileCid = await uploadFile(file);
          setCid(fileCid);
          console.log("File uploaded with CID:", fileCid);
          newRecord = fileCid;
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
   // Function to update a Citizen's medical record
    const handleUpdateMedicalRecord = async () => {
        
        console.log("Citizen:", Citizen);
        console.log("New Record:", newRecord);
        try {
        
        if (!Citizen || !newRecord) {
            console.error("No Citizen selected or record entered.");
            alert("Please select a Citizen and upload a record to update");
            return;
        }

        const updatedRecord = await updateRecordByAdministrator(Citizen.publicAddress, newRecord);
        console.log("Updated record:", updatedRecord);
        // Optionally, update the state to reflect the new record in the UI
        setMedicalRecords([...medicalRecords, newRecord]);

        } catch (error) {
        console.error("Error updating medical record:", error);
        }
    };


    //Medicine Details
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [summary, setSummary] = useState("NO Summary");
    
    //make a date react state and intitialize it with current date
    const [date, setDate] = useState(new Date());
    const [Symptoms, setSymptoms] = useState("NO Symptoms");
    const [highlights, setHighlights] = useState("NO Highlights");
    const [subject, setSubject] = useState("NO Subject");





    const [popupData, setPopupData] = useState({
      whenToTake: [],
      tillWhen: "",
      highlights: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const options = [
      "After Dinner",
      "Before Dinner",
      "After Lunch",
      "Before Breakfast",
      "Before Sleep",
      "Once in a Day Anytime",
    ];
  
    const openPopup = (medicine) => {
      setSelectedMedicine(medicine);
      setPopupData({ whenToTake: [], tillWhen: "", highlights: "" });
    };
  
    const handlePopupChange = (key, value) => {
      if (key === "whenToTake") {
        setPopupData((prev) => ({
          ...prev,
          [key]: value.includes("None")
            ? ["None"]
            : value.filter((option) => option !== "None"),
        }));
      } else {
        setPopupData((prev) => ({ ...prev, [key]: value }));
      }
    };
  
    const handleSubmit = () => {
      const newEntry = {
        ...selectedMedicine,
        ...popupData,
      };
      setSelectedMedicines((prev) => [...prev, newEntry]);
      setSelectedMedicine(null); // Close the popup
    };
  
    // Filter medicines based on search query
    const filteredMedicines = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    async function updateMedicines() {
      //console.log("Selected Medicines: ", selectedMedicines);
      //make a new component with the selected medicines and add summary date Symtopms and subject and highlights to it 
      const medical_Report = {
        summary: summary,
        date: date,
        symptoms: Symptoms,
        subject: subject,
        highlights: highlights,
        medicines: selectedMedicines,
      }
      console.log("MedicalReport  ", medical_Report);

      //pinata upload 
      const response = await uploadMedicines(medical_Report);
      console.log("Response from uploadMedicines : ",response.data.cid);
      console.log("Medicine Report CID: ", response.data.cid);

      //blockchain update
      try {
        if (!Citizen || !response.data.cid) {
          console.error("No Citizen selected or medicines selected.");
          alert("Please select a Citizen and medicines to update");
          return;
        }
        const updatedMedicines = await updateRecordByAdministrator(Citizen.publicAddress, response.data.cid);
        console.log("Updated medicines:", updatedMedicines);
      }
      catch (error) {
        console.error("Error updating medicines:", error);
      }
        
    }






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
                            <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                                <div className="content-box">
                                    <h2> {Citizen.name} </h2>
                                    <span className="designation">Adhar: {Citizen.aadhar} </span>
                                    <p>Eget lorem dolor sed viverra. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. consectetur adipiscing elit. Libero turpis blandit blandit mauris aliquam condimentum quam suspendisse Pellentesque habitant morbi tristique senectus et netus</p>
                                    <ul className="info-list mb_30 clearfix">
                                        <li><strong>Date of Birth: </strong>{Citizen.DOB} </li>
                                        <li><strong>Email: </strong><Link href="mailto:tanya.hill@example.com">{Citizen.email} </Link></li>
                                        <li><strong>Phone: </strong><Link href="tel:3035550105">{Citizen.contact} </Link></li>
                                    </ul>
                                    {/* <ul className="social-links clearfix">
                                        <li><Link href="/"><i className="icon-4"></i></Link></li>
                                        <li><Link href="/"><i className="icon-5"></i></Link></li>
                                        <li><Link href="/"><i className="icon-6"></i></Link></li>
                                        <li><Link href="/"><i className="icon-7"></i></Link></li>
                                    </ul> */}

                                    <button type="submit" className="theme-btn btn-one" onClick={connectWallet}><span>Connect Wallet</span></button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                    accountConnected
                    ?   (  
                        <>    
                        <p>Account Connected With Address : {account} </p>                  
                            <div className="experience-details mb_50">
                                <h2>Previous Medical Records</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>

                            
                            <h4>Medical Records:</h4>
                            {medicalRecords.length > 0 ? (
                                medicalRecords.map((record, index) => (
                                <div key={index}>
                                    <strong>Record {index + 1}  : </strong>
                                    {fileUrls[index] ? (
                                    <a href={fileUrls[index]} target="_blank" rel="noopener noreferrer">
                                            :      Access File
                                    </a>
                                    ) : (
                                    <span className="loading-animation">Fetching record...</span>
                                    )}
                                </div>
                                ))
                            ) : (
                                <p>No medical records Found!!<br></br> Or please connect a verified Administrator's wallet.</p>
                            )}




                            <div className="two-column">
                                <div className="row clearfix">
                                    <div className="col-lg-6 col-md-6 col-sm-12 skills-column">
                                        <div className="skills-box">
                                            <div className="text-box mb_30">
                                                <h2>Update Record</h2>
                                                <p>Consectetur adipiscing elit. Semper sagittis dolor aliquet quam feugiat ultrices feugiat Viverra facilisi turpis.</p>
                                                <p>Show Medicines </p>
                                            </div>
                                            {/* <div className="progress-inner">
                                                <ProgressBar label="Waste management" percent={85} />
                                                <ProgressBar label="Recycling" percent={90} />
                                                <ProgressBar label="Customer support" percent={80} />
                                            </div> */}
                                            <input type="file" onChange={handleFileChange} />
                                            <button type="submit" className="theme-btn btn-one" onClick={handleUpload}><span>Upload File !</span></button>
                                            {cid && <p> File uploaded successfully! CID: {cid}</p>}
                                            <button type="submit" className="theme-btn btn-one" onClick={handleUpdateMedicalRecord}><span>Update File Medical Record</span></button>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 appointment-column">
                                        <div className="appointment-inner">
                                            <h2>Add Summay Medical Record</h2>
                                            <form method="post" action="team-details" className="default-form">
                                                <div className="row clearfix">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="fname" placeholder="Symptoms" onChange={(e) => setSymptoms(e.target.value)} required />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="date" name="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} required  />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="summary" placeholder="Summary"  onChange={(e) => setSummary(e.target.value)} required />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="subject" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} required />
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <textarea name="message" placeholder="Highlights" onChange={(e) => setHighlights(e.target.value)} ></textarea>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                        <button type="submit" className="theme-btn btn-one"><span>Send Message</span></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                              <h2>Medicine List</h2>
                        
                              {/* Search Input */}
                              <input
                                type="text"
                                placeholder="Search by medicine name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                
                              />
                        
                              <section className="team-section sec-pad-2 centred">
                                <div className="auto-container">
                                  <div className="row clearfix">
                                    {filteredMedicines.map((medicine, index) => (
                                      <div
                                        key={index}
                                        className="col-lg-3 col-md-6 col-sm-12 team-block"
                                        onClick={() => openPopup(medicine)}
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
                                                    overflow: "hidden",
                                                  }}
                                                  src={medicine.img}
                                                  alt={medicine.name}
                                                />
                                              </figure>
                                            </div>
                                            <div className="lower-content">
                                              <h3>
                                                <a >{medicine.name}</a>
                                              </h3>
                                              <span className="designation">{medicine.category}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  {filteredMedicines.length === 0 && (
                                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                                      No medicines found for "{searchQuery}"
                                    </p>
                                  )}
                                </div>
                              </section>
                        
                              {/* Selected Medicines */}
                              {selectedMedicines.length > 0 && (
                                <div>
                                  <h2>Selected Medicines</h2>
                                  <ul>
                                    {selectedMedicines.map((med, idx) => (
                                      <li key={idx}>
                                        <strong>{med.name}</strong> - {med.category}
                                        <br />
                                        When to Take: {med.whenToTake.join(", ")}
                                        <br />
                                        Till When: {med.tillWhen} days
                                        <br />
                                        Highlights: {med.highlights || "None"}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                        
                              {/* Popup for Medicine Details */}
                              {selectedMedicine && (
                                <div
                                  style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "white",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                                    zIndex: 1000,
                                    width: "300px",
                                  }}
                                >
                                  <h3>{selectedMedicine.name}</h3>
                                  <p>Category: {selectedMedicine.category}</p>
                                  <label>When to Take:</label>
                                  <div>
                                    {options.map((option, idx) => (
                                      <div key={idx}>
                                        <input
                                          type="checkbox"
                                          id={`when-${idx}`}
                                          value={option}
                                          checked={popupData.whenToTake.includes(option)}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            const updatedSelection = e.target.checked
                                              ? [...popupData.whenToTake, value]
                                              : popupData.whenToTake.filter((opt) => opt !== value);
                                            handlePopupChange("whenToTake", updatedSelection);
                                          }}
                                        />
                                        <label htmlFor={`when-${idx}`}>{option}</label>
                                      </div>
                                    ))}
                                  </div>
                        
                                  <label>Till When (Days):</label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={popupData.tillWhen}
                                    onChange={(e) => handlePopupChange("tillWhen", e.target.value)}
                                    style={{ width: "100%", marginBottom: "10px" }}
                                  />
                        
                                  <label>Highlights (Optional):</label>
                                  <textarea
                                    rows="3"
                                    value={popupData.highlights}
                                    onChange={(e) => handlePopupChange("highlights", e.target.value)}
                                    style={{ width: "100%" }}
                                  ></textarea>
                        
                                  <div style={{ marginTop: "10px", textAlign: "right" }}>
                                    <button onClick={() => setSelectedMedicine(null)}>Cancel</button>
                                    <button
                                      onClick={handleSubmit}
                                      style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              )}

                              <button type="submit" className="theme-btn btn-one" onClick={updateMedicines}><span>Update Medicines Record</span></button>
                            </div>


                        </>
                    )
                    :(
                        <div className="two-column">Account NOT Connected</div>
                    )

                    }


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
