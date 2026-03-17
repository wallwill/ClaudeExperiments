const express = require('express');
const router = express.Router();

// GET /api/owners — list all owners (for dropdowns)
router.get('/', async (req, res, next) => {
  try {
    const owners = await req.prisma.owner.findMany({
      include: { agent: { select: { id: true, name: true } } },
      orderBy: { businessOwner: 'asc' },
    });
    res.json(owners);
  } catch (e) { next(e); }
});

module.exports = router;
