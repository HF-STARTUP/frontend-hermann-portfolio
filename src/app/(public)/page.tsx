import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechnologiesSection } from "@/components/sections/TechnologiesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function RootPage() {
   return (
     <div className="">
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <FeaturedProjectsSection />
        <ContactSection />
     </div>
   )
}
