const express = require("express");
const cors = require("cors");
const app = express();

// Erweiterte CORS-Konfiguration
const corsOptions = {
  origin: function (origin, callback) {
    // Erlaubt Anfragen von Chrome Extensions (kein origin header) und localhost
    const allowedOrigins = [
      'http://localhost:3000',
      'https://www.wolvesville.com',
      'chrome-extension://*'
    ];
    
    // Chrome extensions haben keinen origin header
    if (!origin) return callback(null, true);
    
    // Prüfe ob origin erlaubt ist
    if (allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = allowed.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      callback(null, true); // Erlaube trotzdem für Entwicklung
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-JSON'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Explizite OPTIONS handler für preflight requests
app.options('*', cors(corsOptions));

// Variable, um den letzten Heartbeat-Zeitstempel zu halten
let lastHeartbeat = null;
let activeBotName = null;

// POST /api/heartbeat – empfängt und speichert den Heartbeat
app.post("/api/heartbeat", (req, res) => {
  const { timestamp, name } = req.body;
  
  // Optional: Validierung
  if (!timestamp) {
    return res.status(400).json({ error: "timestamp fehlt im Body" });
  }
  
  lastHeartbeat = new Date(timestamp);
  if (name) {
    activeBotName = name;
  }
  
  console.log(`[Heartbeat] empfangen um ${lastHeartbeat.toISOString()} von ${activeBotName || 'Unbekannt'}`);
  
  return res.status(200).json({ 
    status: 'ok', 
    received: lastHeartbeat.toISOString() 
  });
});

// GET /api/heartbeat – liefert den letzten Heartbeat-Zeitstempel zurück
app.get("/api/heartbeat", (req, res) => {
  if (!lastHeartbeat) {
    return res.status(404).json({ error: "kein Heartbeat empfangen" });
  }
  
  const now = new Date();
  const diff = now - lastHeartbeat;
  const isAlive = diff < 10000; // Weniger als 10 Sekunden = lebendig
  
  return res.json({ 
    lastHeartbeat: lastHeartbeat.toISOString(),
    activeBotName: activeBotName,
    isAlive: isAlive,
    secondsSinceLastHeartbeat: Math.floor(diff / 1000)
  });
});

// Namens-Verifikation: immer erlauben, Lizenz läuft 1 Jahr
app.post("/api/verify-name", (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ 
      allowed: false, 
      error: "Name darf nicht leer sein" 
    });
  }
  
  console.log(`[Verify] Name "${name}" wurde verifiziert`);
  
  res.json({
    allowed: true,
    expireAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
    name: name.trim()
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Interner Serverfehler' });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
  console.log(`CORS aktiviert für Chrome Extensions und Wolvesville`);
});        