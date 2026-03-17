require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const agentRoutes = require('./routes/agents');
const ownerRoutes = require('./routes/owners');
const capabilityRoutes = require('./routes/capabilities');
const auditLogRoutes = require('./routes/auditLogs');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Attach prisma to every request
app.use((req, _res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/agents', agentRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/capabilities', capabilityRoutes);
app.use('/api/audit-logs', auditLogRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`ARMT backend running on http://localhost:${PORT}`));
