import Footer from "../../../components/application/footer";
import Hero from "../../../components/listings/hero"
import ResidentialListings from "../../../components/listings/residentialListings"
import CommercialListings from "../../../components/listings/commercialListings"
import LandsListings from "../../../components/listings/landsListings"

export default function Page(){
    return (
        <>
            <main>
                <Hero />
                <ResidentialListings />
                <LandsListings />
                <CommercialListings />
            </main>
            <Footer />
        </>
    )
}