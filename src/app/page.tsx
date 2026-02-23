import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import UpcomingEvent from "@/components/sections/UpcomingEvent";
import Gallery from "@/components/sections/Gallery";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <UpcomingEvent />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
