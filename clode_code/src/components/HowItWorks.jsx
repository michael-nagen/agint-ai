const steps = [
  {
    n: "1",
    title: "Learn with the Maestro",
    body: "Cover new material however you normally do - lessons, lectures, or the Maestro.",
  },
  {
    n: "2",
    title: "Sit down with Chavruta",
    body: "Bring what you learned. Chavruta questions you, listens, and works through it with you.",
  },
  {
    n: "3",
    title: "Truly own the knowledge",
    body: "Through dialogue and recall, the material moves from 'I saw it' to 'I get it'.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Three simple steps
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="relative">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-brand-400/40 bg-brand-500/10 text-lg font-bold text-brand-200">
              {s.n}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-300">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
