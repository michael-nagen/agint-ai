const features = [
  {
    icon: "?",
    title: "Asks probing questions",
    body: "Chavruta challenges your understanding with the right questions, so gaps surface before an exam does.",
  },
  {
    icon: "↺",
    title: "Reviews & quizzes you",
    body: "Active recall on what you've covered, spaced over time, so knowledge moves into long-term memory.",
  },
  {
    icon: "”",
    title: "Explain it back",
    body: "Teaching is the best test of understanding. Explain ideas in your own words and get gentle corrections.",
  },
  {
    icon: "◎",
    title: "Fills the gaps",
    body: "When something's missing, Chavruta connects it back to what you already know instead of starting from zero.",
  },
];

export default function Features() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
            What it does
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built to make understanding stick
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-400/40 hover:bg-white/[0.07]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600/20 text-xl font-bold text-brand-200">
                {f.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
