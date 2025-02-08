import Link from "next/link"
// import { useRouter } from "next/router"

export default function Menu() {
    // const router = useRouter()

    return (
        <>

            {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}

            <ul className="navigation clearfix">
                <li className="dropdown"><Link href="/">Home</Link>
                   
                </li>

                
                <li className="dropdown"><Link href="/citizen-login">Citizen</Link>
                    
                </li>
                {/* Pages */}
                <li className="dropdown"><Link href="/panchayat">Panchayat</Link>
                    
                </li>
                {/* Contact */}
                <li><Link href="/contact">Contact</Link></li>
            </ul>

        </>
    )
}