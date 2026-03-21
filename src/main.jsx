import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const features = [
    {
      title: "Weekly Leaderboards",
      desc: "Distance. Elevation. Consistency. Built for BCC members.",
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

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%)]" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-300">
                Bengaluru Cycling Club
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Ride. It gets tracked. You show up.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Bengaluru Cycling Club is building a system where your effort
                doesn’t go unnoticed. No screenshots. No follow-ups. Just ride.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://bcc-strava-connect.onrender.com/connect"
                  className="rounded-2xl bg-yellow-500 px-6 py-3 font-medium text-neutral-950 shadow-lg shadow-yellow-500/20 transition hover:scale-[1.02]"
                >
                  Connect Strava
                </a>
                <a
                  href="#leaderboards"
                  className="rounded-2xl border border-white/15 px-6 py-3 font-medium text-white/90 transition hover:bg-white/5"
                >
                  View Leaderboards
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: "Community", value: "BCC" },
                { label: "Tracking", value: "Automatic" },
                { label: "Recognition", value: "Weekly" },
                { label: "Tone", value: "Premium" },
              ].map((item) => (
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

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Not just another cycling group.
          </h2>
          <p className="mt-4 text-white/65">
            BCC is a community of riders who show up — consistently. From
            beginners to ultra-endurance cyclists, everyone rides under the same
            principle: effort matters. And it gets counted.
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
        id="leaderboards"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Every week tells a story.
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                Distance. Elevation. Consistency. The leaderboard reflects what
                actually happened on the road. Available for BCC members.
              </p>
            </div>
            <div className="rounded-3xl border border-yellow-500/20 bg-neutral-900 p-8 shadow-2xl shadow-yellow-500/10">
              <div className="text-sm uppercase tracking-[0.2em] text-yellow-300/80">
                BCC Members
              </div>
              <div className="mt-4 text-2xl font-semibold">
                Weekly boards. Real effort.
              </div>
              <p className="mt-3 text-white/60">
                Recognition built around consistency, not noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-yellow-300">
              Connect Strava
            </h3>
            <p className="mt-3 text-white/65">
              Riders connect once and the system handles the rest.
            </p>
            <a
              href="https://bcc-strava-connect.onrender.com/connect"
              className="mt-6 inline-block rounded-2xl bg-yellow-500 px-5 py-3 font-medium text-neutral-950"
            >
              Start Now
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Be part of something structured.
          </h2>
          <p className="mt-4 max-w-2xl text-white/65">
            BCC is built around consistency, recognition, and community. If you
            ride, you belong here.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/40">
        Bengaluru Cycling Club — Built by riders. For riders.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
