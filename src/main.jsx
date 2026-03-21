import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const features = [
    {
      title: "Weekly Leaderboards",
      desc: "Distance. Elevation. Consistency. Available for BCC members.",
    },
    {
      title: "Strava Connect",
      desc: "Connect once. Your rides flow in automatically without screenshots or manual updates.",
    },
    {
      title: "Milestones & Recognition",
      desc: "Long rides, consistency, and effort that actually gets seen and remembered.",
    },
  ];

  const stats = [
    { label: "Community", value: "BCC" },
    { label: "Tracking", value: "Automatic" },
    { label: "Recognition", value: "Weekly" },
  ];

  const connectUrl = "https://bcc-strava-connect.onrender.com/connect";
  const logoUrl =
    "https://raw.githubusercontent.com/bengalurucyclingclub/bcc-website/main/bcc-logo.jpeg";

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img src={logoUrl} alt="BCC logo" className="h-12 w-12 rounded-full object-contain" />
                <span className="text-sm text-yellow-300">Bengaluru Cycling Club</span>
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
                  href={connectUrl}
                  className="relative z-10 rounded-2xl bg-yellow-500 px-6 py-3 font-medium text-neutral-950 shadow-lg shadow-yellow-500/20 transition hover:scale-[1.02]"
                >
                  Connect Strava
                </a>

                <a
                  href="#leaderboards"
                  className="relative z-10 rounded-2xl border border-white/15 px-6 py-3 font-medium text-white/90 transition hover:bg-white/5"
                >
                  View Leaderboards
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="text-sm text-white/50">{item.label}</div>
                  <div className="mt-2 text-2xl font-semibold text-yellow-300">
                    {item.value}
                  </div>
                </div>
              ))}
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
            actually happened on the road. Available for BCC members.
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

      <section id="connect" className="border-y border-white/10 bg-white/[0.03]">
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
              <div className="mt-4 text-2xl font-semibold">You’re in.</div>
              <p className="mt-3 text-white/60">
                Connect once. Your rides get tracked. Your name shows up where it
                should.
              </p>
              <a
                href={connectUrl}
                className="mt-6 inline-block rounded-2xl bg-yellow-500 px-5 py-3 font-medium text-neutral-950"
              >
                Connect Strava
              </a>
            </div>
          </div>
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
