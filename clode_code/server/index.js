import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import XLSX from "xlsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const XLSX_PATH = join(DATA_DIR, "waitlist.xlsx");
const SHEET_NAME = "Waitlist";
const PORT = process.env.PORT || 3001;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "chavruta-admin";

// Reasonable email check - not RFC-perfect, but rejects obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function loadRows() {
  if (!existsSync(XLSX_PATH)) return [];
  const workbook = XLSX.readFile(XLSX_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet);
}

function saveRows(rows) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const sheet = XLSX.utils.json_to_sheet(rows, {
    header: ["email", "timestamp"],
  });
  sheet["!cols"] = [{ wch: 36 }, { wch: 26 }];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, SHEET_NAME);
  XLSX.writeFile(workbook, XLSX_PATH);
}

const app = express();
app.use(express.json());

app.post("/api/signup", (req, res) => {
  const email = String(req.body?.email ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    return res.status(400).json({ ok: false, error: "Email is required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res
      .status(400)
      .json({ ok: false, error: "Please enter a valid email address." });
  }

  try {
    const rows = loadRows();
    const exists = rows.some(
      (row) => String(row.email ?? "").toLowerCase() === email
    );
    if (exists) {
      return res
        .status(409)
        .json({ ok: false, error: "This email is already on the list." });
    }

    rows.push({ email, timestamp: new Date().toISOString() });
    saveRows(rows);

    return res.status(201).json({ ok: true, count: rows.length });
  } catch (err) {
    console.error("Failed to save signup:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

app.get("/api/admin/signups", (req, res) => {
  const token = req.get("x-admin-token") || req.query.token;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }

  try {
    const rows = loadRows()
      .map((row) => ({
        email: String(row.email ?? ""),
        timestamp: String(row.timestamp ?? ""),
      }))
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return res.json({ ok: true, count: rows.length, signups: rows });
  } catch (err) {
    console.error("Failed to read signups:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Could not read the waitlist." });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Chavruta API listening on http://localhost:${PORT}`);
});
