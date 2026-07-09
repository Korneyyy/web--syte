import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { WhyMe } from "@/components/sections/why-me";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Technologies } from "@/components/sections/technologies";
import { Reviews } from "@/components/sections/reviews";
import { FaqSection } from "@/components/sections/faq-section";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyMe />
        <div className="bg-white/[0.015]"><Services /></div>
        <Process />
        <div className="bg-white/[0.015]"><Portfolio /></div>
        <Technologies />
        <div className="bg-white/[0.015]"><Reviews /></div>
        <FaqSection />
        <div className="bg-white/[0.015]"><Contact /></div>
      </main>
      <Footer />
    </>
  );
}