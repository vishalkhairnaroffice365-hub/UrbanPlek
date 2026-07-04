import ContactSection from "../../../components/application/contact";
import FAQ from "../../../components/application/FAQ";
import Footer from "../../../components/application/footer";
import About from "../../../components/students-portal/about";
import Hero from "../../../components/students-portal/hero";
import HostelListings from "../../../components/students-portal/hostelListings";
import Navbar from "../../../components/students-portal/navbar";
import PGsListings from "../../../components/students-portal/PGsListings";
import StudentRoomsListings from "../../../components/students-portal/roomsListings";
import SubscribeCTA from "../../../components/students-portal/subscribeCTA";

export default function Page(){
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                {/* <About /> */}
                <HostelListings />
                <PGsListings />
                <StudentRoomsListings />
                {/* <SubscribeCTA /> */}
                <ContactSection />
                <FAQ />
            </main>
            <Footer />
        </>
    )
}