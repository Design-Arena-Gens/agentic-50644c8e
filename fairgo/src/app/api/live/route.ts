import { NextResponse } from "next/server";

const SOURCE_URL = "https://api.citybik.es/v2/networks/velib";

type RawStation = {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
  timestamp: string;
  extra?: {
    ebikes?: number;
    normal_bikes?: number;
    last_updated?: number;
  };
};

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      headers: { "User-Agent": "FairGo Mobility Dashboard" },
      next: { revalidate: 20 },
    });

    if (!response.ok) {
      throw new Error(`Source responded with ${response.status}`);
    }

    const payload = (await response.json()) as {
      network: {
        stations: RawStation[];
        location: { city: string; country: string };
      };
    };

    const stations = payload.network.stations.slice(0, 12).map((station) => ({
      id: station.id,
      name: station.name,
      freeBikes: station.free_bikes,
      emptySlots: station.empty_slots,
      ebikes: station.extra?.ebikes ?? 0,
      normalBikes: station.extra?.normal_bikes ?? 0,
      lastUpdated: station.extra?.last_updated
        ? new Date(station.extra.last_updated * 1000).toISOString()
        : station.timestamp,
    }));

    const totals = stations.reduce(
      (acc, station) => {
        acc.freeBikes += station.freeBikes;
        acc.emptySlots += station.emptySlots;
        acc.ebikes += station.ebikes;
        acc.normalBikes += station.normalBikes;
        return acc;
      },
      { freeBikes: 0, emptySlots: 0, ebikes: 0, normalBikes: 0 },
    );

    const updatedAt =
      stations
        .map((station) => station.lastUpdated)
        .filter(Boolean)
        .sort()
        .pop() ?? new Date().toISOString();

    return NextResponse.json({
      sourceCity: payload.network.location.city,
      sourceCountry: payload.network.location.country,
      updatedAt,
      totals,
      stations,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to sync live fleet data right now.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
