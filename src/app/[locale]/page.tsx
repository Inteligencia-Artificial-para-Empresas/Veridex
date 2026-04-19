import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FAQ } from "@/components/sections/FAQ";
import { Advantages } from "@/components/sections/Advantages";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Advantages />
      <HowItWorks />
      <Trust />
      <CtaFinal />
      <FAQ />
    </>
  );
}
