export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-slate-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-xs text-white">
            ח
          </span>
          <span className="font-medium text-slate-300">Chavruta</span>
        </div>
        <p>Learn with an AI, not just from one.</p>
        <p>© {new Date().getFullYear()} Chavruta. All rights reserved.</p>
      </div>
    </footer>
  );
}
