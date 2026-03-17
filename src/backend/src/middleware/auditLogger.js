// Middleware that writes an AuditLog entry after mutating agent operations.
// Attach agentId to req before calling next() in route handlers that need it.
function auditLogger(action) {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = async (body) => {
      if (res.statusCode < 400) {
        const agentId = req.params.id || (body && body.id);
        if (agentId) {
          try {
            await req.prisma.auditLog.create({
              data: {
                agentId,
                action,
                changedBy: req.headers['x-user'] || 'system',
                details: req.auditDetails || null,
              },
            });
          } catch (e) {
            console.error('Audit log write failed:', e.message);
          }
        }
      }
      return originalJson(body);
    };

    next();
  };
}

module.exports = auditLogger;
