import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="h-full">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
