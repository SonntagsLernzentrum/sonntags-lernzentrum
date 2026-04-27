const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SLZ Backend läuft");
});

app.post("/api/login", (req, res) => {
  const { login, password } = req.body;

  if (password !== "Start123!") {
    return res.status(401).json({ message: "Falsches Passwort" });
  }

  if (login === "LV432085") {
    return res.json({
      token: "demo-token-admin",
      user: { role: "Leitung / Verwaltung", lastName: "Verwaltung" }
    });
  }

  if (login === "L658934") {
    return res.json({
      token: "demo-token-teacher",
      user: { role: "Lehrer", lastName: "Lehrer" }
    });
  }

  if (login === "B45385") {
    return res.json({
      token: "demo-token-accounting",
      user: { role: "Buchhaltung", lastName: "Buchhaltung" }
    });
  }

  if (login === "SLZ384321-26") {
    return res.json({
      token: "demo-token-parent",
      user: { role: "Eltern", lastName: "Müller" }
    });
  }

  return res.status(401).json({ message: "Benutzer nicht gefunden" });
});

app.get("/api/me", (req, res) => {
  res.json({
    user: { role: "Leitung / Verwaltung", lastName: "Verwaltung" }
  });
});

app.get("/api/invoices", (req, res) => {
  res.json([]);
});

app.get("/api/students", (req, res) => {
  res.json([]);
});

app.get("/api/contracts", (req, res) => {
  res.json([]);
});

app.get("/api/admin/dashboard", (req, res) => {
  res.json({ openInvoices: 0 });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
