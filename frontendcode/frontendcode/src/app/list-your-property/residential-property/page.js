import ContactSection from "../../../../components/application/contact";
import FAQ from "../../../../components/application/FAQ";
import Footer from "../../../../components/application/footer";
import ListPropertyFormHero from "../../../../components/list-your-property/residential/form";

export default function Page(){
    return (
        <>
            <ListPropertyFormHero />
            <ContactSection />
            <FAQ />
            <Footer />
        </>
    )
}