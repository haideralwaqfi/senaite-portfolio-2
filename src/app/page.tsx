import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { ShopifySection } from "@/components/ShopifySection";
import { WorkGallery } from "@/components/WorkGallery";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WorkGallery />
        <ShopifySection />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
