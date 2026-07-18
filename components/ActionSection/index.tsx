"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

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

function MrGQBadge({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.04 }}
      className="mx-auto flex w-fit items-center gap-3 rounded-full border border-accent/30 bg-gradient-to-r from-[#1a2f48]/70 to-primary/80 px-6 py-3 shadow-lg shadow-black/20 backdrop-blur-sm md:px-8"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-accent/50 shadow-md md:h-20 md:w-20">
        <Image
          src="/img/MrGQ.png"
          alt="Mr. GQ — AI specialist for RDV® ROI and dosing consultation"
          fill
          sizes="(min-width: 768px) 80px, 64px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-white">Mr. GQ</p>
        <p className="text-[11px] leading-tight text-slate-400">
          AI Oil Specialist — RDV<sup>&reg;</sup> ROI &amp; Dosing
        </p>
      </div>
      <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/60">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
      </span>
    </motion.div>
  );
}

const useCases = [
  {
    title: "Luling Well — Permian Basin",
    location: "Texas, USA",
    result: "+590% Production Increase",
    description: "Shut-in well producing 2.4 BPD revived to 14.2 BPD after single RDV® treatment.",
    pdf: "/pdfs/Luling Strepper Report.pdf",
  },
  {
    title: "Poso Creek — Heavy Oil Field",
    location: "Bakersfield, California",
    result: "+56% Production Increase",
    description: "Heavy oil field application achieved significant production increase through organic deposit fragmentation.",
    pdf: "/pdfs/POSO CREEK Report.pdf",
  },
];

function UseCaseCard({ useCase }: { useCase: typeof useCases[0] }) {
  return (
    <motion.a
      href={useCase.pdf}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a2f48]/50 to-primary/70 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Result badge — top, prominent */}
      <div className="mb-4">
        <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
          {useCase.result}
        </span>
      </div>

      {/* Title and location */}
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{useCase.location}</p>
      <h4 className="mt-1 font-montserrat text-lg font-bold text-white group-hover:text-accent transition-colors">
        {useCase.title}
      </h4>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{useCase.description}</p>

      {/* Download CTA — clear and prominent */}
      <div className="mt-auto flex items-center gap-2 text-accent">
        <svg className="h-5 w-5 shrink-0 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm font-semibold">Download Full Case Study</span>
      </div>
    </motion.a>
  );
}

export default function ActionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="action" className="relative w-full overflow-hidden bg-primary py-24 md:py-32" ref={ref}>
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-4xl px-6 md:px-12 lg:px-16">
        {/* Kicker + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Get RDV<sup>&reg;</sup> For Your Field
          </p>
          <h2 className="font-montserrat text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Talk to{" "}
            <span className="text-accent">Mr. GQ</span>, your RDV<sup>&reg;</sup> AI Specialist
          </h2>
        </motion.div>

        {/* Mr. GQ badge */}
        <div className="mb-10 flex justify-center">{<MrGQBadge isInView={!!isInView} />}</div>

        {/* Single CTA: Start Chat with Mr. GQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <button
            onClick={() => {
              const widget = document.querySelector('elevenlabs-convai');
              if (widget) {
                (widget as any).open?.();
              }
            }}
            className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#F39C12] to-[#e8890c] px-10 py-5 text-lg font-bold uppercase tracking-wider text-primary shadow-xl hover:shadow-[#F39C12]/25 transition-shadow"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Start Chat with Mr. GQ</span>
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-20 text-center text-sm text-slate-500"
        >
          No commitment · Custom ROI analysis included · Response within 24 hours
        </motion.p>

        {/* ── Use Cases — Field Reports ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Proven Results — Field Reports
          </p>
          <h3 className="mt-2 font-montserrat text-2xl font-bold text-white md:text-3xl">
            See What RDV<sup>&reg;</sup> Achieved in Real Wells
          </h3>
        </motion.div>

        <div className="mx-auto grid gap-6 max-w-3xl md:grid-cols-2">
          {useCases.map((uc) => (
            <UseCaseCard key={uc.title} useCase={uc} />
          ))}
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          <span className="text-xs text-slate-600">Trusted by teams from</span>
          {["Permian Basin", "Bakersfield · Heavy Oil"].map((loc, i) => (
            <span key={loc} className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {loc}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
