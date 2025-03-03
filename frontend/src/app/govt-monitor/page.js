"use client"
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { useEffect,useState } from "react";
import axios from "axios";

import useCitizens from "../../components/hooks/citizen.zustand"
import useGovernment from "@/src/components/hooks/government.zustand";

import MultiLineGraph from "@/src/components/multi_line_graphs/multi_line_graph"
import AnimatedPieChart from "@/src/components/pie_chart/pie_chart"
export default function Home() {
    // JSON array of team members

    const monitor = useGovernment((state) => state.selectedGovernment);
    
    const [allCitizens, setAllCitizens] = useState([
        
    ]);
    const addCitizen = useCitizens((state)=>state.addCitizen);
    let villages;
    useEffect(() => {
        const fetchCitizens = async () => {
            try {
                
                console.log("MOnitor : ",monitor);
                //[2, 4, 7]
                villages = monitor.my_villages;
                for (let i=1; i<villages.length; i=i+3){
                    console.log("Village : ",villages[i]);
                    const response = await axios.get(`api/citizen/get_village_citizens?village_id=${villages[i]}`);
                    //add it to allcitizens 
                    setAllCitizens((prev) => [prev, ...response.data]);

                }
                
                
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
    const [allEmployees, setAllEmployees] = useState([
       
    ]);
    useEffect(() => {
        const fetchEmployees = async () => {
            try {

                for (let i=1; i<villages.length; i=i+3){

                    const response = await axios.get(`api/employee/get_village_employees?village_id=${villages[i]}`);
                    console.log("Fetched Employees:", response.data);
                    setAllEmployees((prev) => [...prev, ...response.data]);

                }
                
            } catch (error) {
                console.error("Error fetching Employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const [pieData,setPieData] = useState([
    ]);


    

    // Sample data for multi-line graph
    const lineData = [
        { name: "Jan", sales: 4000, revenue: 2400, profit: 1200 },
        { name: "Feb", sales: 3000, revenue: 1398, profit: 900 },
        { name: "Mar", sales: 2000, revenue: 9800, profit: 2300 },
        { name: "Apr", sales: 2780, revenue: 3908, profit: 2000 },
        { name: "May", sales: 1890, revenue: 4800, profit: 2181 },
        { name: "Jun", sales: 2390, revenue: 3800, profit: 2500 },
        { name: "Jul", sales: 3490, revenue: 4300, profit: 2100 },
        { name: "Jul", sales: 7000, revenue: 4300, profit: 2100 },
    ]

    // Line configurations for multi-line graph
    const lines = [
        { dataKey: "sales", name: "Sales", color: "#8884d8" },
        { dataKey: "revenue", name: "Revenue", color: "#82ca9d" },
        { dataKey: "profit", name: "Profit", color: "#ffc658" },
        ]

    const [allAssets, setAllAssets] = useState([]);
    const [villagePieData, setVillagePieData] = useState({}); // Store pie data per village

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                let fetchedAssets = {};

                for (let i = 1; i < villages.length; i += 3) {
                    const villageId = villages[i];

                    const response = await axios.get(`api/asset/get_village_assets?village_id=${villageId}`);
                    console.log(`Fetched Assets for Village ${villageId}:`, response.data);

                     setAllAssetsDisplay((prev) => [...prev, ...response.data]);

                    fetchedAssets[villageId] = response.data;
                }

                setAllAssets(fetchedAssets);
            } catch (error) {
                console.error("Error fetching Assets:", error);
            }
        };

        fetchAssets();
    }, []);

    useEffect(() => {
        if (Object.keys(allAssets).length > 0) {
            let pieDataByVillage = {};

            Object.keys(allAssets).forEach(villageId => {
                pieDataByVillage[villageId] = allAssets[villageId].map(asset => ({
                    name: asset.asset_name,
                    value: asset.quantity,
                }));
            });

            setVillagePieData(pieDataByVillage);
        }
    }, [allAssets]);

    console.log("Village Pie Data:", villagePieData);

    const [lineDataByVillage, setLineDataByVillage] = useState({});
    const [linesByVillage, setLinesByVillage] = useState({});

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                let fetchedAssets = {};

                for (let i = 1; i < villages.length; i += 3) {
                    const villageId = villages[i];

                    const response = await axios.get(
                        `api/asset/get_village_assets?village_id=${villageId}`
                    );
                    console.log(`Fetched Assets for Village ${villageId}:`, response.data);

                    fetchedAssets[villageId] = response.data;
                }
            } catch (error) {
                console.error("Error fetching Assets:", error);
            }
        };

        fetchAssets();
    }, []);

    useEffect(() => {
        if (Object.keys(allAssets).length > 0) {
            let newLineDataByVillage = {};
            let newLinesByVillage = {};

            Object.keys(allAssets).forEach((villageId) => {
                newLineDataByVillage[villageId] = allAssets[villageId].map((asset) => ({
                    name: asset.asset_name,
                    [`${villageId}_quantity`]: asset.quantity,
                }));

                console.log("Assets ", allAssets);

                newLinesByVillage[villageId] = allAssets[villageId].map((asset, index) => ({
                    dataKey: `${villageId}_quantity`,
                    name: `Asset ${asset.asset_name}`,
                    color: `hsl(${index * 40}, 70%, 50%)`, // Dynamic color generation
                }));
            });

            setLineDataByVillage(newLineDataByVillage);
            setLinesByVillage(newLinesByVillage);
        }
    }, [allAssets]);

    console.log("Line Data by Village:", lineDataByVillage);
    console.log("Lines by Village:", linesByVillage);




    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Administrator">

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
                    <div style={{ marginBottom: "3rem" }}>
                    <AnimatedPieChart data={pieData} />
                    </div>
                    <div>
                    <MultiLineGraph data={lineData} lines={lines} xAxisKey="name" title="Sales, Revenue & Profit" />
                    </div>
                </div>

               
                
                <section className="team-details sec-pad-2">
                    <div className="auto-container">
                        <div className="team-details-content mb_50">
                            <div className="row clearfix">
                                <div className="col-lg-5 col-md-12 col-sm-12 image-column">
                                    <figure className="image-box mr_15">
                                        <img src={monitor.image} alt={monitor.name} />
                                    </figure>
                                </div>
                                <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                                    <div className="content-box">
                                        <h2>{monitor.name}</h2>
                                        <span className="designation">POST: {monitor.role} </span>
                                        <p>
                                            Eget lorem dolor sed viverra. Mattis nunc sed blandit libero volutpat sed
                                            cras ornare arcu. consectetur adipiscing elit. Libero turpis blandit
                                            blandit mauris aliquam condimentum quam suspendisse Pellentesque habitant
                                            morbi tristique senectus et netus
                                        </p>
                                        <ul className="info-list mb_30 clearfix">
                                            <li><strong>Email: </strong><Link href={`mailto:${monitor.email}`}>{monitor.email}</Link></li>
                                            <li><strong>Gender: </strong><Link href={`tel:${monitor}`}>{monitor.gender}</Link></li>
                                            <li><strong>monitor ID: </strong>{monitor.govt_id}</li>
                                            <li><strong>Villages ID: </strong>{monitor.my_villages}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <h1> Your Employees </h1>

                <div>
                    <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {allEmployees.map((member, index) => (
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
                                                        {member.name}
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

                    <h1>Your Citizens</h1>

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
                                                       <li>Adhar: {member.aadhar}</li> 
                                                       <li>Citizen Id : {member.citizen_id}</li> 
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
    );
}
