import ContactSection from "../../../../components/application/contact";
import FAQ from "../../../../components/application/FAQ";
import Footer from "../../../../components/application/footer";
import ListCommercialPropertyFormHero from "../../../../components/list-your-property/commercial/form";

export default function Page(){
    return (
        <>
            <ListCommercialPropertyFormHero />
            <ContactSection />
            <FAQ />
            <Footer />
        </>
    )
}