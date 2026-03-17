const express = require('express');
const router = express.Router();

// GET /api/audit-logs?agentId=:id — audit history for an agent
router.get('/', async (req, res, next) => {
  try {
    const { agentId } = req.query;
    if (!agentId) return res.status(400).json({ error: 'agentId query param required' });
    const logs = await req.prisma.auditLog.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(logs);
  } catch (e) { next(e); }
});

module.exports = router;
