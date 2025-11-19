import type { HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Waves } from "lucide-react";

import LiveIntegrations from "@/components/LiveIntegrations";
import VoiceNavigator from "@/components/VoiceNavigator";

const featureSets = [
  {
    id: "hyperlocal-routing",
    title: "Hyperlocal Routing",
    description:
      "AI models digest congestion, demand density, and event feeds within 300 milliseconds so drivers never miss a surge window.",
  },
  {
    id: "predictive-fares",
    title: "Predictive Fares",
    description:
      "Transparent pricing adapts in real time with capped surge multipliers to guarantee fairness for riders while increasing lifetime driver yield.",
  },
  {
    id: "trust-stack",
    title: "Trust Stack",
    description:
      "Multi-factor identity, live audio tagging, and continuous background scoring keeps trips verified, safe, and regulation ready.",
  },
];

const voiceCommands = [
  "Go to Services",
  "Show Live Insights",
  "Open Coverage",
  "Take me to Booking",
  "Show Voice Navigation",
  "Contact FairGo",
];

const coverageTiles = [
  {
    city: "Sydney",
    metric: "97%",
    blurb: "Metro rides SLA with average pickup in 2m 18s across 13 launch zones.",
  },
  {
    city: "Singapore",
    metric: "94%",
    blurb: "Regulation-compliant fleets paired with FairGo dynamic pooling & EV-first incentive layers.",
  },
  {
    city: "Auckland",
    metric: "89%",
    blurb: "Regional suburbs served through federated driver pools with live compliance scanning.",
  },
];

export default function Home() {
  return (
    <div className="relative mx-auto min-h-screen max-w-[1440px] px-6 pb-24 pt-12 text-slate-50 md:px-10 lg:px-16">
      <VoiceNavigator />
      <header className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-slate-900/50 p-10 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl md:flex-row md:items-end md:justify-between md:gap-12 md:p-12">
        <div className="max-w-3xl space-y-6" id="hero">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
            FairGo Mobility OS
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Ride hailing that is radically fair, frictionless, and always on the pulse.
          </h1>
          <p className="text-pretty text-lg text-slate-300 md:text-xl">
            Dispatch riders faster with autonomous fleet balancing, human-centred tooling, and voice-first
            accessibility. FairGo orchestrates vehicles, partner fleets, and compliance so every ride
            arrives safe and on time.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#booking"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-cyan-300"
            >
              Book a Ride Now
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-cyan-300/70 hover:bg-cyan-400/10"
            >
              Explore the platform
            </Link>
          </div>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-200 shadow-lg shadow-cyan-500/20 md:w-72 lg:w-80">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200">
            <Waves className="h-4 w-4" />
            Live Dispatch Pulse
          </div>
          <dl className="grid grid-cols-2 gap-3 text-slate-100">
            <PulseMetric label="Trips Online" value="18,420" />
            <PulseMetric label="Median ETA" value="2m 12s" />
            <PulseMetric label="Driver Uptime" value="98.7%" />
            <PulseMetric label="EV Mix" value="62%" />
          </dl>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
            Voice navigation is live. Tap the cyan mic to jump to any section hands-free.
          </div>
        </div>
      </header>

      <main className="mt-20 space-y-24 md:space-y-32">
        <section id="services" className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">Platform Core</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">One mobility engine, infinite fair rides.</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300 md:text-base">
              FairGo fuses dispatch AI, unified pricing, and compliance proofing into one command centre.
              Operators launch in days with policy guardrails, no-code automation, and embeddable partner
              APIs.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureSets.map((feature) => (
              <article
                key={feature.id}
                className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-cyan-500/10 transition hover:border-cyan-200/70 hover:bg-cyan-400/10"
              >
                <div className="h-12 w-12 rounded-full border border-white/10 bg-white/10" />
                <h3 className="text-lg font-semibold text-cyan-100">{feature.title}</h3>
                <p className="text-sm text-slate-300">{feature.description}</p>
                <Link
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:gap-3"
                >
                  Schedule a walkthrough
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <LiveIntegrations />

        <section
          id="coverage"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-950/70 to-slate-900/40 p-8 md:p-12"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">Live Coverage</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Launch-ready in the most demanding cities.</h2>
            </div>
            <p className="max-w-lg text-sm text-slate-300 md:text-base">
              FairGo stitches municipal feeds, compliance data, and partner fleets into one dashboard. Expand
              across APAC while staying auto-compliant with local transport rules and EV incentives.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {coverageTiles.map((tile) => (
              <div
                key={tile.city}
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-lg shadow-cyan-500/10"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-cyan-100">{tile.city}</h3>
                  <span className="text-3xl font-semibold text-cyan-300">{tile.metric}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{tile.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="voice"
          className="rounded-3xl border border-white/10 bg-slate-950/70 px-8 py-12 shadow-xl shadow-cyan-500/10 md:px-12"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
                Voice Navigation
              </p>
              <h2 className="text-3xl font-semibold text-slate-50 md:text-4xl">
                Accessibility that moves at the speed of conversation.
              </h2>
              <p className="text-base text-slate-300 md:text-lg">
                FairGo’s voice-first experience unlocks the platform for drivers on the move, riders with
                accessibility needs, and ops teams multitasking across screens. Trigger dispatch commands,
                navigate sections, or call a ride entirely hands-free.
              </p>
              <ul className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-200 md:grid-cols-2">
                {voiceCommands.map((command) => (
                  <li key={command} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    {command}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mt-8 w-full max-w-md rounded-3xl border border-cyan-300/40 bg-slate-900/80 p-6 shadow-lg shadow-cyan-500/30">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border border-cyan-300/40 bg-cyan-400 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-900">
                Live
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Conversation Stream</p>
              <div className="mt-4 space-y-4 text-sm text-slate-200">
                <p className="rounded-2xl bg-white/5 px-4 py-3">
                  “Hey FairGo, show live insights.” <span className="text-cyan-200">→ scrolling to telemetry</span>
                </p>
                <p className="rounded-2xl bg-white/5 px-4 py-3">
                  “Call booking centre.” <span className="text-cyan-200">→ connecting to ride concierge</span>
                </p>
                <p className="rounded-2xl bg-white/5 px-4 py-3">
                  “Navigate to coverage.” <span className="text-cyan-200">→ highlighting rollout cities</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="booking"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/30 via-slate-900/70 to-emerald-400/20 px-8 py-12 shadow-2xl shadow-cyan-500/30 md:px-12"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-900">
                Book a Ride
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
                Concierge ride hailing with one tap or one voice command.
              </h2>
              <p className="mt-4 text-base text-slate-800 md:text-lg">
                Need a FairGo today? Our booking studio matches you with certified drivers, adaptive vehicles,
                and transparent pricing instantly. Call now and our live agent team has your ride confirmed in
                seconds.
              </p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-slate-900/20 bg-white/80 p-6 text-slate-900 shadow-xl">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                <Phone className="h-4 w-4" />
                FairGo Concierge
              </div>
              <a
                href="tel:+611800111247"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-6 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
              >
                Call +61 1800 111 247
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <p className="text-xs text-slate-700">
                Operating 24/7 across APAC. Corporate mobility plans and on-demand adaptive vehicles available.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="rounded-3xl border border-white/10 bg-slate-900/70 px-8 py-12 shadow-xl shadow-cyan-500/10 md:px-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.5fr,1fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200">
                Partner with FairGo
              </p>
              <h2 className="text-3xl font-semibold text-slate-50 md:text-4xl">
                Launch FairGo in your city and deliver equitable, ultra-fast mobility.
              </h2>
              <p className="text-base text-slate-300">
                From enterprise ride programs to public mobility overlays, FairGo delivers transparent revenue
                splits, enforceable fairness guarantees, and ready-to-ship passenger apps. Let&apos;s map the
                rollout together.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• Dedicated ops pod & compliance counsel in every market.</li>
                <li>• SDKs for rider, driver, and partner integrations ready on day one.</li>
                <li>• Near real-time telemetry via webhook, GraphQL, or embedded dashlets.</li>
              </ul>
            </div>
            <form className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-lg shadow-cyan-500/10">
              <div className="grid gap-3 md:grid-cols-2">
                <Field name="name" label="Full name" type="text" />
                <Field name="email" label="Work email" type="email" />
              </div>
              <Field name="company" label="Organisation" type="text" />
              <Field name="focus" label="City or program focus" type="text" />
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200" htmlFor="message">
                  Collaboration Notes
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-slate-50 outline-none ring-0 transition focus:border-cyan-300 focus:bg-slate-900"
                  placeholder="Tell us about your mobility goals…"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                Request Launch Playbook
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-center text-xs text-slate-500">
                We respond within 12 business hours. Voice booking + partner line:{" "}
                <a href="tel:+611800111247" className="text-cyan-200">
                  +61 1800 111 247
                </a>
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

function PulseMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Field({ name, label, type }: { name: string; label: string; type: HTMLInputTypeAttribute }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-cyan-300 focus:bg-slate-900"
        placeholder=""
      />
    </div>
  );
}
