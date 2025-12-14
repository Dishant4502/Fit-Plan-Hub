import HeroSection from "../../components/HeroSection"
import AboutUs from "../../components/AboutUs"
import HowItWorks from "../../components/HowItWorks"
import Plans from "../../components/Plans"
import Trainee from "../../components/Trainee"
import Reviews from "../../components/Reviews"


export default function Visitor() {
  return (
    <>
      {/* Hero Section - Landing Page Banner */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* About Us Section */}
      <section id="about">
        <AboutUs />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* Plans Section */}
      <section id="plans">
        <Plans />
      </section>

      {/* Trainers Section */}
      <section id="trainers">
        <Trainee />
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <Reviews />
      </section>

      
    </>
  )
}
