import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const features = [
    {
      title: "Your Stats",
      desc: "Your riding numbers, all in one place.",
    },
    {
      title: "Milestones",
      desc: "Track your 100s, 200s, 300s and beyond.",
    },
    {
      title: "Progress Snapshot",
      desc: "Quick look at distance, elevation and longest ride.",
    },
  ];

  const connectUrl = "https://bcc-strava-connect.onrender.com/connect";
  const logoUrl = "/bcc_logo.jpeg";
  const statsApiUrl =
    "https://script.google.com/macros/s/AKfycbzQXdpJkah4FSiFJaOFe1pXWJM4Twk6EbkkyfnVc1ZeCmr92PE61c9SuF5HGXOmgHrI/exec";

  const [isConnected, setIsConnected] = useState(false);
  const [riderName, setRiderName] = useState("");
  const [athleteId, setAthleteId] = useState("");
  const [statsAvailable, setStatsAvailable] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");
    const name = params.get("name");
    const athleteIdParam = params.get("athlete_id");

    if (connected === "1") {
      localStorage.setItem("bcc_strava_connected", "true");
      if (name) localStorage.setItem("bcc_rider_name", name);
      if (athleteIdParam) localStorage.setItem("bcc_athlete_id", athleteIdParam);

      setIsConnected(true);
      setRiderName(name || "");
      setAthleteId(athleteIdParam || "");

      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    const savedConnected = localStorage.getItem("bcc_strava_connected");
    const savedName = localStorage.getItem("bcc_rider_name");
    const savedAthleteId = localStorage.getItem("bcc_athlete_id");

    if (savedConnected === "true") {
      setIsConnected(true);
      setRiderName(savedName || "");
      setAthleteId(savedAthleteId || "");
    }
  }, []);

  const heroButtonText = useMemo(() => {
    return isConnected ? "View your stats" : "Connect Strava";
  }, [isConnected]);

  const heroButtonHref = useMemo(() => {
    return isConnected ? "#your-stats" : connectUrl;
  }, [isConnected]);

  const connectCardTitle = useMemo(() => {
    return isConnected ? "You’re in." : "Connect your Strava account";
  }, [isConnected]);

  const connectCardText = useMemo(() => {
    if (isConnected) {
      return riderName
        ? `${riderName}, your Strava account is connected.`
        : "Your Strava account is connected.";
    }

    return "Connect once. Your rides get tracked. Your name shows up where it should.";
  }, [isConnected, riderName]);

  function formatNumber(value, decimals = 0) {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  function formatKm(value) {
    return `${formatNumber(value, 1)} km`;
  }

  function formatMeters(value) {
    return `${formatNumber(value, 0)} m`;
  }

  function buildAthleteMeta(stats) {
    const parts = [];

    if (stats.username) parts.push(`@${stats.username}`);

    const location = [stats.city, stats.state, stats.country]
      .filter(Boolean)
      .join(", ");
    if (location) parts.push(location);

    if (
      stats.is_bcc_member === true ||
      stats.is_bcc_member === "true" ||
      stats.is_bcc_member === "TRUE" ||
      stats.is_bcc_member === 1 ||
      stats.is_bcc_member === "1"
    ) {
      if (stats.bcc_club_name) {
        parts.push(stats.bcc_club_name);
      } else {
        parts.push("BCC Member");
      }
    }

    return parts.join(" • ");
  }

  async function fetchStats() {
    if (!athleteId) {
      setStatsError("Athlete ID not found.");
      return;
    }

    setStatsLoading(true);
    setStatsError("");
    setStatsAvailable(false);

    try {
      const url = `${statsApiUrl}?action=getStats&athleteId=${encodeURIComponent(
        athleteId
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Unable to fetch stats");
      }

      if (!data.found) {
        setStats(null);
        setStatsAvailable(false);
        setStatsError("No stats found yet for this rider.");
        return;
      }

      setStats(data.stats);
      setStatsAvailable(true);
    } catch (error) {
      setStats(null);
      setStatsAvailable(false);
      setStatsError(
        error.message || "Something went wrong while loading stats."
      );
    } finally {
      setStatsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="BCC logo"
                  className="h-12 w-12 rounded-full object-contain"
                />
                <span className="text-sm text-yellow-300">
                  Bengaluru Cycling Club
                </span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Bengaluru Cycling Club
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Bengaluru Cycling Club is building a system where your effort
                doesn’t go unnoticed. No screenshots. No follow-ups. Just ride.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={heroButtonHref}
                  className="relative z-10 rounded-2xl bg-yellow-500 px-6 py-3 font-medium text-neutral-950 shadow-lg shadow-yellow-500/20 transition hover:scale-[1.02]"
                >
                  {heroButtonText}
                </a>

                <a
                  href="#leaderboards"
                  className="relative z-10 rounded-2xl border border-white/15 px-6 py-3 font-medium text-white/90 transition hover:bg-white/5"
                >
                  View Leaderboards
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="text-sm uppercase tracking-[0.2em] text-yellow-300/80">
                How it works
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="text-lg font-semibold text-white">
                    1. Connect Strava
                  </div>
                  <div className="mt-1 text-white/60">
                    One-time setup. Takes less than a minute.
                  </div>
                </div>

                <div>
                  <div className="text-lg font-semibold text-white">
                    2. Ride as usual
                  </div>
                  <div className="mt-1 text-white/60">
                    Your rides continue exactly as they do today.
                  </div>
                </div>

                <div>
                  <div className="text-lg font-semibold text-white">
                    3. View your stats
                  </div>
                  <div className="mt-1 text-white/60">
                    Your dashboard pulls your numbers from the system.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="leaderboards"
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Every week tells a story.
          </h2>
          <p className="mt-4 text-white/65">
            Distance. Elevation. Consistency. The leaderboard reflects what
            actually happened on the road.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold text-yellow-300">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-white/65">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="connect"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                One connection. Everything tracked.
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                Connect your Strava once. From that moment, your rides flow into
                the system automatically. No manual updates. No missed entries.
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-500/20 bg-neutral-900 p-8 shadow-2xl shadow-yellow-500/10">
              <div className="text-sm uppercase tracking-[0.2em] text-yellow-300/80">
                BCC Connect
              </div>

              <div className="mt-4 text-2xl font-semibold">
                {connectCardTitle}
              </div>

              <p className="mt-3 text-white/60">{connectCardText}</p>

              {!isConnected && (
                <a
                  href={connectUrl}
                  className="mt-6 inline-block rounded-2xl bg-yellow-500 px-5 py-3 font-medium text-neutral-950"
                >
                  Connect Strava
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="your-stats"
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">Your stats</h2>
          <p className="mt-4 text-white/65">
            Your connected rider profile appears here.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          {!isConnected ? (
            <div>
              <div className="text-xl font-semibold text-white">
                Connect your Strava account
              </div>
              <p className="mt-3 text-white/60">
                Connect Strava first to view your personal stats.
              </p>
              <a
                href={connectUrl}
                className="mt-6 inline-block rounded-2xl bg-yellow-500 px-5 py-3 font-medium text-neutral-950"
              >
                Connect Strava
              </a>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-white">
                    {riderName
                      ? `${riderName}, here’s your dashboard.`
                      : "Your dashboard"}
                  </div>
                  <p className="mt-2 text-white/60">
                    Athlete ID: {athleteId || "Not available"}
                  </p>
                </div>

                <button
                  onClick={fetchStats}
                  disabled={statsLoading}
                  className="rounded-2xl bg-yellow-500 px-5 py-3 font-medium text-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {statsLoading ? "Loading..." : "View your stats"}
                </button>
              </div>

              {statsError && (
                <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
                  {statsError}
                </div>
              )}

              {!statsAvailable && !statsLoading && !statsError && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-white/60">
                  Your stats will appear here once loaded.
                </div>
              )}

              {statsAvailable && stats && (
                <div className="mt-8 space-y-8">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <div className="text-2xl font-semibold text-white">
                      {stats.athlete_name || riderName || "Rider"}
                    </div>
                    {buildAthleteMeta(stats) && (
                      <div className="mt-2 text-sm text-white/50">
                        {buildAthleteMeta(stats)}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-sm text-white/50">No. of Rides</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {formatNumber(stats.ride_count)}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-sm text-white/50">Total Kms</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {formatKm(stats.all_cycling_km)}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-sm text-white/50">Elevation Gain</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {formatMeters(stats.elevation_m)}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-sm text-white/50">Longest Ride</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {formatKm(stats.longest_ride_km)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      Distance milestones
                    </h3>

                    <div className="mt-4 grid gap-4 md:grid-cols-4 xl:grid-cols-7">
                      {[
                        ["100s", stats.count_100km_rides],
                        ["200s", stats.count_200km_rides],
                        ["300s", stats.count_300km_rides],
                        ["400s", stats.count_400km_rides],
                        ["600s", stats.count_600km_rides],
                        ["1000s", stats.count_1000km_rides],
                        ["1200s", stats.count_1200km_rides],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-3xl border border-white/10 bg-black/20 p-5"
                        >
                          <div className="text-sm text-white/50">{label}</div>
                          <div className="mt-2 text-2xl font-semibold text-white">
                            {formatNumber(value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      Recent progress
                    </h3>

                    <div className="mt-4 grid gap-4 md:grid-cols-4">
                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                        <div className="text-sm text-white/50">Current Week</div>
                        <div className="mt-2 text-2xl font-semibold text-white">
                          {formatKm(stats.current_week_km)}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                        <div className="text-sm text-white/50">Previous Week</div>
                        <div className="mt-2 text-2xl font-semibold text-white">
                          {formatKm(stats.previous_week_km)}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                        <div className="text-sm text-white/50">Current Month</div>
                        <div className="mt-2 text-2xl font-semibold text-white">
                          {formatKm(stats.current_month_km)}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                        <div className="text-sm text-white/50">Previous Month</div>
                        <div className="mt-2 text-2xl font-semibold text-white">
                          {formatKm(stats.previous_month_km)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {(stats.last_activity_date || stats.last_calculated_at) && (
                    <div className="text-sm text-white/40">
                      {stats.last_activity_date &&
                        `Last activity: ${stats.last_activity_date}`}
                      {stats.last_activity_date &&
                        stats.last_calculated_at &&
                        " • "}
                      {stats.last_calculated_at &&
                        `Updated: ${stats.last_calculated_at}`}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Be part of something structured.
          </h2>
          <p className="mt-4 text-white/65">
            BCC is built around consistency, recognition, and community. If you
            ride, you belong here.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/40">
        Built by riders. For riders.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
