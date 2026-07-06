import ContactSection from "../../../components/application/contact";
import Footer from "../../../components/application/footer";
import Hero from "../../../components/list-your-property/hero";
import FAQ from "../../../components/application/FAQ";

export default function Page(){
    return (
        <>
            <main>
                <Hero />
                <ContactSection />
                <FAQ />
            </main>
            <Footer />
        </>
    )
}