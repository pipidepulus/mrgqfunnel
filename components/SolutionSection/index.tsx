"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import Script from "next/script";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.6, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const steps = [
  {
    num: "01",
    title: "Direct Injection",
    desc: "RDV® is injected directly into the well, penetrating organic deposits without requiring special infrastructure.",
  },
  {
    num: "02",
    title: "Protonation",
    desc: "The proton-donor agent releases protons that attack long carbon chains (C17+) in wax and asphaltene deposits.",
  },
  {
    num: "03",
    title: "Molecular Fragmentation",
    desc: "C17+ chains irreversibly break into lighter hydrocarbons (C13-C16) that flow naturally with the crude oil.",
  },
  {
    num: "04",
    title: "More Flow to Tank",
    desc: "Eliminated deposits = more space for crude to flow. Increased production without CAPEX or steam.",
  },
];

const comparisonRows = [
  { feature: "Mechanism", conventional: "Surface washing", rdv: "Molecular-level fragmentation" },
  { feature: "Duration", conventional: "Weeks (temporary effect)", rdv: "Permanent (irreversible)" },
  { feature: "Annual cost", conventional: "$40K–$120K in repeated cycles", rdv: "Single application" },
  { feature: "Infrastructure", conventional: "Requires special equipment", rdv: "Direct injection only" },
  { feature: "Steam required", conventional: "Yes (thermal treatments)", rdv: "No" },
  { feature: "CAPEX", conventional: "Million-dollar", rdv: "Zero" },
];

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="solution" className="relative w-full overflow-hidden">
      {/* Background image — molecular-shatter.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/molecular-shatter.png"
          alt="RDV protonation process — molecular fragmentation of heavy hydrocarbons C17+ to C13-C16"
          fill
          className="object-cover"
          loading="eager"
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/92 via-primary/85 to-primary/92"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-20 mx-auto max-w-7xl px-6 py-24 md:px-12 lg:py-32">
        {/* Section kicker */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent"
        >
          The Solution — Dynamic Vasoactive Reactor
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-4 text-center font-montserrat text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
        >
          Proton-Based{" "}
          <span className="text-accent">Organic Deposit Fragmentation</span>
        </motion.h2>

        {/* ── Row 1: How it works — 4 steps ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-16"
        >
          <h3 className="mb-8 text-center font-montserrat text-2xl font-bold text-white md:text-3xl">
            How Does RDV<sup>®</sup> Work?
          </h3>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="flex gap-4 rounded-xl border border-white/10 bg-primary/60 p-6 backdrop-blur-sm"
              >
                <div className="shrink-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h4 className="mb-1 font-montserrat text-lg font-bold text-white">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-300 md:text-[15px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Row 2: Field Results ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="mt-20"
        >
          <h3 className="mb-6 text-center font-montserrat text-xl font-bold text-white md:text-2xl">
            Field Results — RDV<sup>®</sup> Proven Data
          </h3>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-accent/30 shadow-2xl shadow-black/20">
            <div className="border-b border-accent/20 bg-gradient-to-r from-[#1a2f48]/60 to-[#0a192f]/40 px-6 py-5 backdrop-blur-sm md:px-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent md:text-sm">
                RDV® Field Performance
              </h4>
            </div>

            <div className="bg-[#0d1a2c]/90 backdrop-blur-md">
              {/* Luling row */}
              <div className="border-b border-white/10 px-5 py-6 transition-colors hover:bg-white/[0.03] md:px-8 lg:px-10">
                {/* Location */}
                <div className="mb-5">
                  <span className="text-sm font-bold text-accent md:text-base">Luling, Texas — Permian Basin</span>
                </div>

                {/* Before → After */}
                <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 md:px-6 md:py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs uppercase tracking-wider text-slate-400">Before</span>
                    <span className="font-bold text-white md:text-base">2.4 BPD</span>
                  </div>
                  <svg className="h-5 w-5 shrink-0 text-accent md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs uppercase tracking-wider text-slate-400">After</span>
                    <span className="font-bold text-accent md:text-base">14.2 BPD</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-3 inline-flex w-full flex-col items-center justify-center rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-4 text-left">
                  <span className="text-xl font-bold text-green-400 md:text-2xl">+590%</span>
                  <span className="mt-1 text-sm font-medium text-green-400">Organic Deposition — Paraffin</span>
                  <span className="mt-1 text-sm font-medium text-green-400">Problem Fixed</span>
                </div>
              </div>

              {/* Poso Creek row */}
              <div className="border-b border-white/10 px-5 py-6 transition-colors hover:bg-white/[0.03] md:px-8 lg:px-10">
                {/* Location */}
                <div className="mb-5">
                  <span className="text-sm font-bold text-accent md:text-base">Poso Creek, CA — Heavy Oil</span>
                </div>

                {/* Before → After */}
                <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 md:px-6 md:py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs uppercase tracking-wider text-slate-400">Before</span>
                    <span className="font-bold text-white md:text-base">9.9 BPD</span>
                  </div>
                  <svg className="h-5 w-5 shrink-0 text-accent md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs uppercase tracking-wider text-slate-400">After</span>
                    <span className="font-bold text-accent md:text-base">14.2 BPD</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-3 inline-flex w-full flex-col items-center justify-center rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-4 text-center">
                  <span className="text-xl font-bold text-green-400 md:text-2xl">+56%</span>
                  <span className="mt-1 text-sm font-medium text-green-400">Organic Deposition — Asphaltene</span>
                  <span className="mt-1 text-sm font-medium text-green-400">Problem Fixed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Row 3: RDV vs Solvents comparison ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="mt-20"
        >
          <h3 className="mb-6 text-center font-montserrat text-xl font-bold text-white md:text-2xl">
            RDV<sup>®</sup> vs Conventional Solvents
          </h3>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-accent/20 shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-accent/20 bg-gradient-to-r from-[#1a2f48]/60 to-[#0a192f]/40 md:grid-cols-3">
              <div className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 md:px-8 md:text-sm">Feature</div>
              <div className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-red-400 md:px-8 md:text-sm">Conventional Solvents</div>
              <div className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-accent md:px-8 md:text-sm">RDV<sup>®</sup></div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-white/5 transition-colors hover:bg-white/[0.02] md:grid-cols-3"
              >
                <div className="flex items-center px-6 py-4 font-semibold text-white md:px-8 md:text-sm">
                  {row.feature}
                </div>
                <div className="flex items-center px-6 py-4 text-sm text-slate-400 md:px-8 md:text-[15px]">
                  {row.conventional}
                </div>
                <div className="flex items-center px-6 py-4 text-sm font-bold text-accent md:px-8 md:text-[15px]">
                  {row.rdv}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Row 4: CTA ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="mt-20 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl bg-[#F39C12] px-10 py-4 text-base font-bold uppercase tracking-wider text-primary shadow-lg hover:shadow-[#F39C12]/30 md:text-lg"
          >
            Get RDV For Your Field
          </motion.button>
        </motion.div>
      </div>

      {/* ElevenLabs widget — only mounts when SolutionSection is in view */}
      {isInView && (
        <>
          <Script
            src="https://unpkg.com/@elevenlabs/convai-widget-embed"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
          {/* @ts-ignore - Custom web component */}
          <elevenlabs-convai agent-id={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID} />
        </>
      )}
    </section>
  );
}
