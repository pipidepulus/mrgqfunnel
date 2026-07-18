"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const panelLeftVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const panelRightVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

function ProblemPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={panelLeftVariants}
      className="w-full rounded-xl border border-white/10 bg-primary/80 p-8 shadow-xl backdrop-blur-sm md:p-10 lg:p-12"
    >
      {children}
    </motion.div>
  );
}

function Claim({ icon, title }: { icon: string; title: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-primary font-bold text-accent"
        aria-hidden="true"
      >
        {icon}
      </span>
      <p className="text-base leading-relaxed text-slate-300 md:text-lg">{title}</p>
    </div>
  );
}

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative w-full py-24 md:py-32" ref={ref}>
      {/* Amber oil flow background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/oil-flow-amber.png"
          alt="Golden flowing crude oil — what your field could produce without organic deposits"
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
        />
      </div>

      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-primary/92 via-primary/85 to-primary/90"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 md:px-12">
        {/* Section kicker */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4 }}
          className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent"
        >
          The Diagnosis That Is Killing Your Profitability
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-center font-montserrat text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
        >
          Two Lies That Have <span className="text-accent">Cost You Millions</span>
        </motion.h2>

        {/* Two-panel layout */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {/* Panel 1 — Wrong Diagnosis */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={panelLeftVariants}
            className="w-full rounded-xl border border-white/10 bg-primary/80 p-8 shadow-xl backdrop-blur-sm md:p-10 lg:p-12"
          >
            <span className="mb-4 inline-block rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
              Lie #1 — Wrong Diagnosis
            </span>

            <h3 className="mb-6 font-montserrat text-xl font-bold text-white md:text-2xl">
              They Say It Is Sand. It Never Was.
            </h3>

            <div className="space-y-5">
              <Claim
                icon="1"
                title={
                  <>
                    Conventional solvents <strong className="text-white">only wash</strong> the surface of your tubing walls. They never{" "}
                    <strong className="text-accent">fragment</strong> the organic deposits at the molecular level.
                  </>
                }
              />
              <Claim
                icon="2"
                title={
                  <>
                    Every "flush" costs thousands — yet production declines again within weeks because the root cause is{" "}
                    <strong className="text-white">untouched</strong>.
                  </>
                }
              />
            </div>
          </motion.div>

          {/* Panel 2 — False Economy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={panelRightVariants}
            className="w-full rounded-xl border border-white/10 bg-primary/80 p-8 shadow-xl backdrop-blur-sm md:p-10 lg:p-12"
          >
            <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              Lie #2 — False Economy
            </span>

            <h3 className="mb-6 font-montserrat text-xl font-bold text-white md:text-2xl">
              Cheap Solvents Are the Most Expensive Mistake You Make
            </h3>

            <div className="space-y-5">
              <Claim
                icon="$"
                title={
                  <>
                    Average well spends <strong className="text-accent">$40K–$120K/year</strong> on repeated solvent cycles — a{" "}
                    <strong className="text-white">vicious spending loop</strong>.
                  </>
                }
              />
              <Claim
                icon="▼"
                title={
                  <>
                    Meanwhile production <strong className="text-red-400">declines 3–7% monthly</strong> because deposits keep regenerating.
                  </>
                }
              />
            </div>
          </motion.div>
        </div>

        {/* Closing question */}
        <motion.div
          variants={statVariants}
          initial="hidden"
          animate={isInView ? "visible" : undefined}
          className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-accent/30 bg-white/[0.04] px-8 py-10 text-center backdrop-blur-sm md:px-12 md:py-14"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Bottom Line
          </p>
          <h3 className="mb-5 font-montserrat text-xl font-bold leading-tight text-white md:text-2xl lg:text-3xl">
            How many barrels have you lost this month by using the same old recipe over and over again?
          </h3>
          <p className="text-sm leading-relaxed text-slate-400 md:text-base">
            While you read this, more organic matter is depositing on your tubing walls. And your next "flush"
            will be a temporary fix — another line item in the false economy column.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
