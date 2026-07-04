import ContactSection from "../../../../components/application/contact";
import FAQ from "../../../../components/application/FAQ";
import Footer from "../../../../components/application/footer";
import ListStudentAccommodationFormHero from "../../../../components/list-your-property/students/form";

export default function Page(){
    return (
        <>
            <ListStudentAccommodationFormHero />
            <ContactSection />
            <FAQ />
            <Footer />
        </>
    )
}