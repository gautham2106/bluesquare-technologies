import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemPicker from "@/components/ProblemPicker";
import WhatWeDo from "@/components/WhatWeDo";
import Calculator from "@/components/Calculator";
import HowWeWork from "@/components/HowWeWork";
import WhyBluesquare from "@/components/WhyBluesquare";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemPicker />
        <WhatWeDo />
        <Calculator />
        <HowWeWork />
        <WhyBluesquare />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
