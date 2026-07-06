import Hero from "../../components/home/hero";
import VerifiedProjects from "../../components/home/verifiedProjects"
import About from "../../components/home/about";
import StudentsPortal from "../../components/home/studentsportal";
import ListYourProperty from "../../components/home/listyourproperty";
import Footer from "../../components/application/footer";
import FAQ from "../../components/application/FAQ";
import MeetTheTeam from "../../components/home/team";
import BookVisitCTA from "../../components/application/bookavisitCTA";
import ContactSection from "../../components/application/contact";

export default function Home() {
  return (
	<>
	<main>
		<Hero />
		<VerifiedProjects />
		<StudentsPortal />
		<ListYourProperty />
		<About />
		<ContactSection />
		<FAQ />
	</main>
	<Footer />
	</>
  )
}
