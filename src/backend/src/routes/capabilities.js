const express = require('express');
const router = express.Router();

// GET /api/capabilities — list all business capabilities
router.get('/', async (req, res, next) => {
  try {
    const capabilities = await req.prisma.businessCapability.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(capabilities);
  } catch (e) { next(e); }
});

// POST /api/capabilities — create a new capability
router.post('/', async (req, res, next) => {
  try {
    const capability = await req.prisma.businessCapability.create({ data: req.body });
    res.status(201).json(capability);
  } catch (e) { next(e); }
});

module.exports = router;
