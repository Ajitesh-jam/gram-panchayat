import Layout from "../components/layout/Layout"
import Banner from "../components/home/Banner"
import Funfacts from "../components/home/Funfacts"
import News from "../components/home/News"
import WhyChooseUs from "../components/home/WhyChooseUs"

import Feature from "../components/home/Features"
import Team from "../components/home/Team"
import Video from "../components/home/Video"
import Process from "../components/home/Process"
import Pricing from "../components/home/Pricing"
import Subscribe from "../components/home/Subscribe"


export default function Home() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <Banner />
                <Feature />
                <WhyChooseUs/>
                <Funfacts />
                <Process />
                <Video />
                <News />
                <Subscribe />
            </Layout>
        </>
    )
}