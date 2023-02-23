import Contact from "../components/Contact";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../components/Map'), { ssr: false })

const AboutPage = () => {
    return(
        <Contact />
    )
}

export default AboutPage;