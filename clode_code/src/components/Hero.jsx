export default function Hero() {
  return (
    <header className="relative">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
            ח
          </span>
          <span>Chavruta</span>
        </a>
        <a
          href="#join"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-400 hover:text-white"
        >
          Join the waitlist
        </a>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
          An AI study partner, not just a tutor
        </span>

        <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Learn <span className="text-brand-300">with</span> an AI,
          <br className="hidden sm:block" /> not just <span className="text-slate-400">from</span> one.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          Chavruta is your AI study companion. It doesn't just hand you answers -
          it sits beside you, questions you, and helps you truly process and
          internalize what you've learned. The perfect complement to studying
          with the Maestro.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#join"
            className="w-full rounded-full bg-brand-600 px-8 py-3.5 text-center font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-500 sm:w-auto"
          >
            Get early access
          </a>
          <a
            href="#concept"
            className="w-full rounded-full border border-white/15 px-8 py-3.5 text-center font-medium text-slate-200 transition hover:border-white/40 sm:w-auto"
          >
            How it's different
          </a>
        </div>
      </div>
    </header>
  );
}
