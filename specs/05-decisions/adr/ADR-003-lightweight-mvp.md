# ADR-003: Lightweight MVP Scope

**Date:** 2026-03-17
**Status:** Accepted

## Context

ARMT could launch with full automation, runtime integration, and marketplace features, or constrain scope to registry and governance fundamentals.

## Decision

MVP is scoped to registration, metadata, ownership, lifecycle, governance workflow, and search/reporting only.

## Rationale

Fast adoption is the primary success driver. A lightweight tool with mandatory registration is more likely to achieve 100% compliance than a complex platform.

## Implications

- Agent execution, orchestration, model hosting, and marketplace are explicitly deferred
- Runtime observability deferred to future phases
- Scope creep risk must be actively managed

## Alternatives Considered

| Option | Reason Rejected |
|---|---|
| Full platform at launch | Too slow to deliver; adoption risk |
| Execution + registry combined | Conflates governance with runtime concerns |
