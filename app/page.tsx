import type { Metadata } from "next";
import ActionSection from "../components/ActionSection";
import HeroSection from "../components/HeroSection";
import SolutionSection from "../components/SolutionSection";
import ProblemSection from "../components/ProblemSection";

export const metadata: Metadata = {
  title: "RDV® Dynamic Vasoactive Reactor — Multiply Production Up to 5×",
  description:
    "Next Generation EOR Technology. Multiply your production up to 5× without CAPEX or steam using the RDV® Dynamic Vasoactive Reactor.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-primary">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ActionSection />
    </main>
  );
}
