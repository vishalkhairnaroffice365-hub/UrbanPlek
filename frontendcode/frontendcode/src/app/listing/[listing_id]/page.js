import Footer from "../../../../components/application/footer";
import Listing from "../../../../components/listing-page/listing";

export default async function Page({ params }) {
    const { listing_id } = await params;
    return (
        <>
            <main>
                <Listing listing_id={listing_id} />
            </main>
            <Footer />
        </>
    )
}