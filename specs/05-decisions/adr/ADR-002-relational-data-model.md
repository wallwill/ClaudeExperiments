# ADR-002: Relational Data Model (PostgreSQL)

**Date:** 2026-03-17
**Status:** Accepted

## Context

Agent metadata could be stored in a flexible document store (e.g. MongoDB) or a structured relational database.

## Decision

Use PostgreSQL with a relational data model.

## Rationale

Structured governance requires consistent, queryable metadata. Relational integrity enforces mandatory fields and relationships (agent → owner, agent → capability, etc.).

## Implications

- Less flexible schema — metadata extensions require migrations
- Strong auditability and reporting capabilities
- Extensible metadata model planned for future phases

## Alternatives Considered

| Option | Reason Rejected |
|---|---|
| Document store | Too flexible — inconsistent metadata quality |
| Graph database | Overhead not justified for MVP |
