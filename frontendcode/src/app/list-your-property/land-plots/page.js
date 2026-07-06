import ContactSection from "../../../../components/application/contact";
import FAQ from "../../../../components/application/FAQ";
import Footer from "../../../../components/application/footer";
import ListLandPropertyFormHero from "../../../../components/list-your-property/land/form";

export default function Page(){
    return (
        <>
            <ListLandPropertyFormHero />
            <ContactSection />
            <FAQ />
            <Footer />
        </>
    )
}