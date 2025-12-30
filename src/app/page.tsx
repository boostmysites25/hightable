import Hero from "@/components/Hero";
import About from "@/components/About";
import Purpose from "@/components/Purpose";
import World from "@/components/World";
import Features from "@/components/Features";
import Membership from "@/components/Membership";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <World />
      <About />
      <Purpose />
      <Features />
      <Membership />
    </main>
  );
}
