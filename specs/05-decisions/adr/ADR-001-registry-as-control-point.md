# ADR-001: Registry as Governance Control Point

**Date:** 2026-03-17
**Status:** Accepted

## Context

ARMT could be implemented as a passive catalog (read-only reference) or as an active governance control point that gates production deployments.

## Decision

ARMT will function as an active control point — no agent may be promoted to production without registration, assigned ownership, risk classification, and governance approval.

## Rationale

A passive catalog would not solve the core problem of ungoverned agent proliferation. Enforcement requires integration with deployment processes.

## Implications

- Requires integration with CI/CD pipelines (Phase 3)
- Increases adoption friction — mitigated by keeping registration lightweight
- Platform team must operate and enforce the registry

## Alternatives Considered

| Option | Reason Rejected |
|---|---|
| Passive catalog | Does not prevent ungoverned deployments |
| Opt-in registration | Insufficient for enterprise compliance |
