import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <About />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
