import ValuePropositionSection from "../../Components/ValueProposition";
import Hero from "./Hero";
import OnboardingSteps from "../../Components/Onboarding";
import Footer from "../../Components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <Hero />
      <ValuePropositionSection />
      <OnboardingSteps />
      <Footer />
    </div>
  );
}

export default HomePage;