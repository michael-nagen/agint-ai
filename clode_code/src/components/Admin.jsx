import { useState } from "react";

export default function Admin() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [error, setError] = useState("");
  const [data, setData] = useState({ count: 0, signups: [] });

  async function loadSignups(event) {
    event?.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/admin/signups", {
        headers: { "x-admin-token": token },
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setData({ count: body.count ?? 0, signups: body.signups ?? [] });
        setStatus("ready");
      } else {
        setStatus("error");
        setError(
          res.status === 401
            ? "Wrong password."
            : body.error || "Something went wrong."
        );
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the server.");
    }
  }

  function downloadCsv() {
    const header = "email,timestamp\n";
    const lines = data.signups
      .map((s) => `${s.email},${s.timestamp}`)
      .join("\n");
    const blob = new Blob([header + lines], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chavruta-waitlist.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#0b0a1a] text-slate-100 font-sans antialiased">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
              ח
            </span>
            <span>Chavruta · Admin</span>
          </a>
          <a href="#" className="text-sm text-slate-400 hover:text-white">
            ← Back to site
          </a>
        </div>

        {status !== "ready" ? (
          <form
            onSubmit={loadSignups}
            className="mx-auto mt-20 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <h1 className="text-xl font-semibold">Waitlist access</h1>
            <p className="mt-2 text-sm text-slate-400">
              Enter the admin password to view who signed up.
            </p>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin password"
              aria-label="Admin password"
              className="mt-5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
            >
              {status === "loading" ? "Loading…" : "View signups"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-sm text-rose-300">{error}</p>
            )}
          </form>
        ) : (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold">
                {data.count} {data.count === 1 ? "signup" : "signups"}
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={loadSignups}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 hover:border-white/40"
                >
                  Refresh
                </button>
                <button
                  onClick={downloadCsv}
                  disabled={data.count === 0}
                  className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 disabled:opacity-50"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {data.count === 0 ? (
              <p className="mt-10 text-slate-400">No signups yet.</p>
            ) : (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-300">
                    <tr>
                      <th className="px-5 py-3 font-medium">#</th>
                      <th className="px-5 py-3 font-medium">Email</th>
                      <th className="px-5 py-3 font-medium">Signed up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.signups.map((s, i) => (
                      <tr
                        key={s.email + i}
                        className="border-t border-white/5 hover:bg-white/[0.03]"
                      >
                        <td className="px-5 py-3 text-slate-500">{i + 1}</td>
                        <td className="px-5 py-3 text-white">{s.email}</td>
                        <td className="px-5 py-3 text-slate-400">
                          {formatDate(s.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}
