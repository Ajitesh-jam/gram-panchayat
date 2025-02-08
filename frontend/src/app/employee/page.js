'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getLifeCoins } from "@/src/components/utils/lifeCoinsWeb3"
import useEmployees from "../../components/hooks/Employee.zustand"

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

    const [lifeCoins, setLifeCoins] = useState(0)
    const Employee = useEmployees((state) => state.selectedEmployee)

    useEffect(() => {
        const fetchLifeCoins = async () => {
            if (Employee.publicAddress) {
                try {
                    console.log("getting life coins of " + Employee.publicAddress);
                    const coins = await getLifeCoins(Employee.publicAddress)
                    setLifeCoins(coins)
                } catch (error) {
                    alert(`Error fetching LifeCoins: ${error.message}`)
                }
            }
        }

        fetchLifeCoins()
    }, [Employee.publicAddress])

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
                                        <span className="designation">Life Coins: {lifeCoins}</span>
                                        <p>
                                            Eget lorem dolor sed viverra. Mattis nunc sed blandit libero volutpat sed
                                            cras ornare arcu. consectetur adipiscing elit. Libero turpis blandit
                                            blandit mauris aliquam condimentum quam suspendisse Pellentesque habitant
                                            morbi tristique senectus et netus
                                        </p>
                                        <ul className="info-list mb_30 clearfix">
                                            <li><strong>Date of Birth: </strong>{Employee.DOB}</li>
                                            <li><strong>Email: </strong><Link href={`mailto:${Employee.email}`}>{Employee.email}</Link></li>
                                            <li><strong>Phone: </strong><Link href={`tel:${Employee.phone}`}>{Employee.phone}</Link></li>
                                            <li><strong>Employee ID: </strong>{Employee.EmployeeId}</li>
                                            <li><strong>Aadhar: </strong>{Employee.aadhar}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
