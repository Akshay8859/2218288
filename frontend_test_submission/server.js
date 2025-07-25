const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const Log = require('../Logging_middleware'); 
const app = express();

const PORT = 3001;
let urlDB = {}; 

app.use(cors());
app.use(express.json());

app.post('/shorten', (req, res) => {
  const { originalUrl, customCode } = req.body;
  if (!originalUrl) {
    Log("backend", "warn", "route", "No originalUrl provided");
    return res.status(400).json({ error: "URL required" });
  }

  const code = customCode || shortid.generate().slice(0, 6);
  if (urlDB[code]) {
    return res.status(400).json({ error: "Custom code already used" });
  }

  urlDB[code] = { originalUrl, clicks: 0,createdAt: Date.now(), };
  Log({stack:"backend", level:"info", package:"route", message:`URL shortened with code ${code}`});
  res.json({ shortUrl: `http://localhost:3000/${code}` });
});

app.get('/r/:code', (req, res) => {
  const code = req.params.code;
  if (!urlDB[code]) {
    Log("backend", "error", "route", `Invalid code ${code}`);
    return res.status(404).send("URL not found");
  }

  urlDB[code].clicks++;
  Log("backend", "info", "route", `Redirecting ${code}`);
  res.redirect(urlDB[code].originalUrl);
});

app.get("/all-urls", (req, res) => {
  const allUrls = Object.entries(urlDB).map(([code, data]) => ({
    code,
    shortUrl: `http://localhost:3000/${code}`,
    originalUrl: data.originalUrl,
    clicks: data.clicks,
    createdAt: data.createdAt,
  }));

  res.json(allUrls);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});