import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <About />
      <Projects />
      <Experience />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
