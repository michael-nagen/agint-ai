import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Please try again.");
    }
  }

  return (
    <section
      id="join"
      className="border-t border-white/5 bg-white/[0.02]"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
          Early access
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Be the first to study with Chavruta
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
          Join the waitlist and we'll let you know the moment it's ready. No
          spam - just an invite.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-5">
            <p className="text-lg font-semibold text-emerald-300">
              Thank you! 🎉
            </p>
            <p className="mt-1 text-emerald-100/80">{message}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@example.com"
              aria-label="Email address"
              className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Join the waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-rose-300">{message}</p>
        )}
      </div>
    </section>
  );
}
