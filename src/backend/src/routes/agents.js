const express = require('express');
const router = express.Router();
const auditLogger = require('../middleware/auditLogger');

// Valid lifecycle transitions
const TRANSITIONS = {
  PROPOSED:   ['IN_REVIEW'],
  IN_REVIEW:  ['APPROVED', 'PROPOSED'],
  APPROVED:   ['ACTIVE', 'IN_REVIEW'],
  ACTIVE:     ['RESTRICTED', 'DEPRECATED'],
  RESTRICTED: ['ACTIVE', 'DEPRECATED'],
  DEPRECATED: ['RETIRED'],
  RETIRED:    [],
};

// GET /api/agents — list with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { name, lifecycleState, riskTier, agentType } = req.query;
    const agents = await req.prisma.agent.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(lifecycleState && { lifecycleState }),
        ...(riskTier && { riskTier }),
        ...(agentType && { agentType }),
      },
      include: { owner: true, businessCapability: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(agents);
  } catch (e) { next(e); }
});

// GET /api/agents/:id
router.get('/:id', async (req, res, next) => {
  try {
    const agent = await req.prisma.agent.findUnique({
      where: { id: req.params.id },
      include: { owner: true, businessCapability: true, complianceRecords: true },
    });
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (e) { next(e); }
});

// POST /api/agents — register new agent
router.post('/', auditLogger('CREATED'), async (req, res, next) => {
  try {
    const { owner, ...agentData } = req.body;
    const agent = await req.prisma.agent.create({
      data: {
        ...agentData,
        ...(owner && { owner: { create: owner } }),
      },
      include: { owner: true, businessCapability: true },
    });
    res.status(201).json(agent);
  } catch (e) { next(e); }
});

// PUT /api/agents/:id — update agent metadata
router.put('/:id', auditLogger('UPDATED'), async (req, res, next) => {
  try {
    const { owner, lifecycleState, ...agentData } = req.body;
    const agent = await req.prisma.agent.update({
      where: { id: req.params.id },
      data: {
        ...agentData,
        ...(owner && {
          owner: {
            upsert: { create: owner, update: owner },
          },
        }),
      },
      include: { owner: true, businessCapability: true },
    });
    res.json(agent);
  } catch (e) { next(e); }
});

// PATCH /api/agents/:id/lifecycle — transition lifecycle state
router.patch('/:id/lifecycle', async (req, res, next) => {
  try {
    const { newState } = req.body;
    const agent = await req.prisma.agent.findUnique({ where: { id: req.params.id } });
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const allowed = TRANSITIONS[agent.lifecycleState] || [];
    if (!allowed.includes(newState)) {
      return res.status(400).json({
        error: `Invalid transition: ${agent.lifecycleState} → ${newState}`,
        allowed,
      });
    }

    const updated = await req.prisma.agent.update({
      where: { id: req.params.id },
      data: { lifecycleState: newState },
      include: { owner: true, businessCapability: true },
    });

    await req.prisma.auditLog.create({
      data: {
        agentId: agent.id,
        action: 'LIFECYCLE_TRANSITION',
        changedBy: req.headers['x-user'] || 'system',
        details: `${agent.lifecycleState} → ${newState}`,
      },
    });

    res.json(updated);
  } catch (e) { next(e); }
});

// DELETE /api/agents/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await req.prisma.agent.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) { next(e); }
});

module.exports = router;
