import Experience from "@/components/canvas/Experience";
import Nav from "@/components/layout/Nav";
import BackToTop from "@/components/layout/BackToTop";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Advertising from "@/components/sections/Advertising";
import CityBand from "@/components/sections/CityBand";
import OurScreen from "@/components/sections/OurScreen";
import Location from "@/components/sections/Location";
import Packages from "@/components/sections/Packages";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ScrollFX from "@/components/layout/ScrollFX";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <Experience />
      <main className="relative pt-16">
        <Hero />
        <Marquee />
        <Advertising />
        <CityBand />
        <OurScreen />
        <Location />
        <Packages />
        <HowItWorks />
        <FAQ />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
      <ScrollFX />
    </>
  );
}
