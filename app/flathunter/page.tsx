import Nav from "@/components/flathunter/Nav";
import Hero from "@/components/flathunter/Hero";
import HowItWorks from "@/components/flathunter/HowItWorks";
import BookingFlow from "@/components/flathunter/booking/BookingFlow";
import Promise from "@/components/flathunter/Promise";
import WhyFlatHunter from "@/components/flathunter/WhyFlatHunter";
import FAQ from "@/components/flathunter/FAQ";
import FinalCTA from "@/components/flathunter/FinalCTA";
import Footer from "@/components/flathunter/Footer";
import MobileStickyBar from "@/components/flathunter/MobileStickyBar";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function FlatHunterPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />

        <section className="fh-section-pad bg-surface">
          <div className="fh-container-page">
            <RevealOnScroll>
              <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Tell us what you&rsquo;re looking for
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center text-ink/60">
                Takes about two minutes. No account needed.
              </p>
            </RevealOnScroll>
            <div className="mt-10">
              <BookingFlow />
            </div>
          </div>
        </section>

        <Promise />
        <WhyFlatHunter />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
