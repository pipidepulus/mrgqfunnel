"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.6, ease: "easeOut" },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero-well-tech.png"
          alt="Oil well with RDV® Dynamic Vasoactive Reactor technology overlay — next generation EOR solution"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/75 via-primary/50 to-primary/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-20 flex min-h-[100dvh] items-center justify-center pb-56 pt-24 md:pb-64 md:pt-32 md:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Kicker */}
          <motion.p
            className="mb-6 inline-block rounded-full border border-accent/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            variants={statVariants}
          >
            Next Generation EOR Technology
          </motion.p>

          {/* Main Headline */}
          <h1 className="mb-6 font-montserrat text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {"886,435 "}
            <span className="block">Marginal Wells in the U.S.</span>
            {" are stuck at "}
            <span className="text-accent">less than 2.4 BPD</span>
          </h1>

          {/* Value proposition */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Multiply your production{" "}
            <strong className="text-white">up to 5×</strong>{" "}
            without CAPEX and without
            solvents — using the RDV<sup>®</sup> Dynamic Vasoactive Reactor.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            className="mb-20 inline-block rounded-lg bg-[#F39C12] px-8 py-4 text-base font-bold uppercase tracking-wider text-primary shadow-lg transition-shadow hover:shadow-[#F39C12]/30 md:text-lg md:mb-24"
          >
            Is This Your Well?
          </motion.button>          
        </motion.div>
      </div>

      {/* Bottom callout — compact attention grabber */}
      <motion.div
        className="absolute bottom-[120px] left-1/2 z-20 -translate-x-1/2 w-[95vw] max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      >
        <div className="rounded-xl border border-accent/20 bg-primary/50 px-5 py-4 shadow-xl backdrop-blur-sm md:px-6 md:py-5">
          <p className="text-center text-[13px] leading-snug text-slate-300 md:text-sm">
            <span className="font-montserrat text-sm font-bold text-white md:text-base">
              RDV — Vasoactive Dynamic Reactor
            </span>
            {" "}is not just another solvent. It's a{" "}
            <span className="inline-block rounded bg-accent/15 px-2 py-1 font-bold text-accent md:px-3">
              molecular fragmenter
            </span>{" "}
            that transforms the chemical structure of crude oil so that more oil flows into your tank.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] font-semibold uppercase tracking-wider text-slate-400 md:text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              No million-dollar CAPEX
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              No diluents
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              No steam
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              No infrastructure
            </span>
          </div>
          <p className="mt-3 text-center text-[13px] font-bold text-accent md:text-sm">
            All you need: Knowledge and RDV gallons.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
