"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, MapPin, RefreshCcw, TrendingUp } from "lucide-react";

type FleetStation = {
  id: string;
  name: string;
  freeBikes: number;
  emptySlots: number;
  ebikes: number;
  normalBikes: number;
  lastUpdated: string;
};

type FleetSnapshot = {
  sourceCity: string;
  sourceCountry: string;
  updatedAt: string;
  totals: {
    freeBikes: number;
    emptySlots: number;
    ebikes: number;
    normalBikes: number;
  };
  stations: FleetStation[];
};

export default function LiveIntegrations() {
  const [snapshot, setSnapshot] = useState<FleetSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSnapshot = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/live", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Live feed unavailable");
      }
      const data = (await response.json()) as FleetSnapshot;
      setSnapshot(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to refresh data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSnapshot();
    const interval = setInterval(loadSnapshot, 45_000);
    return () => clearInterval(interval);
  }, [loadSnapshot]);

  const topStations = useMemo(() => {
    if (!snapshot?.stations) return [];
    return [...snapshot.stations]
      .sort((a, b) => b.freeBikes + b.ebikes - (a.freeBikes + a.ebikes))
      .slice(0, 6);
  }, [snapshot?.stations]);

  return (
    <section
      id="integrations"
      className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 p-8 shadow-xl shadow-cyan-500/20 backdrop-blur-xl md:p-12"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-400/10" />
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 text-cyan-300">
          <Activity className="h-6 w-6" />
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-cyan-200 md:text-xl">
            Live Fleet Intelligence
          </h2>
        </div>
        <button
          type="button"
          onClick={loadSnapshot}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-white/30 hover:bg-white/10"
        >
          <RefreshCcw className="h-4 w-4 transition group-hover:rotate-180" />
          Refresh
        </button>
      </div>

      <p className="mt-4 max-w-2xl text-balance text-base text-slate-300 md:text-lg">
        Real-time network occupancy tracking helps FairGo balance supply and demand instantly. We mirror
        this environment with a live mobility feed to show how vehicles, docks, and e-bikes update every
        few seconds.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[2fr,3fr] lg:gap-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-cyan-200">
            <span>Network Pulse</span>
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="mt-4 space-y-4">
            <Metric
              label="Vehicles Available"
              value={snapshot?.totals.freeBikes ?? 0}
              highlight
              loading={loading}
            />
            <Metric label="Electric Fleet" value={snapshot?.totals.ebikes ?? 0} loading={loading} />
            <Metric label="Pickup Slots Open" value={snapshot?.totals.emptySlots ?? 0} loading={loading} />
            <Metric
              label="Last Sync"
              value={
                snapshot
                  ? new Date(snapshot.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "--:--"
              }
              loading={loading}
            />
            {snapshot ? (
              <div className="flex items-center gap-2 rounded-xl bg-slate-950/60 px-3 py-2 text-xs uppercase tracking-[0.25em] text-teal-200">
                <MapPin className="h-4 w-4" />
                {snapshot.sourceCity}, {snapshot.sourceCountry}
              </div>
            ) : (
              <div className="h-8 rounded-xl bg-white/5" />
            )}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {loading && !snapshot ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-2xl bg-white/5" />
            ))
          ) : error ? (
            <div className="col-span-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-100">
              {error}
            </div>
          ) : (
            topStations.map((station) => (
              <article
                key={station.id}
                className="group flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
              >
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {station.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Updated {new Date(station.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-xs">
                  <Stat label="Ready" value={station.freeBikes + station.ebikes} />
                  <Stat label="E-Assist" value={station.ebikes} />
                  <Stat label="Combustion" value={station.normalBikes} />
                  <Stat label="Open Docks" value={station.emptySlots} />
                </dl>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  highlight,
  loading,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <div
        className={[
          "h-12 rounded-2xl bg-slate-950/60 px-4",
          highlight ? "border border-cyan-300/40" : "border border-white/5",
        ].join(" ")}
      >
        <div className="flex h-full items-center text-2xl font-semibold text-sky-100">
          {loading ? <span className="mx-auto h-3 w-3 animate-pulse rounded-full bg-cyan-300" /> : value}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-slate-300">
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-sky-100">{value}</p>
    </div>
  );
}
