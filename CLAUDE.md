# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a personal experimentation repository for exploring and testing ideas with Claude. Each experiment may use different technologies and have its own setup.

## Structure

```
specs/          # Solution Intent Document — source of truth, drives all implementation
  01-executive-summary/
  02-business-context/
  03-solution-overview/
  04-architecture/
  05-decisions/adr/       # One ADR file per architecture decision
  06-constraints/
  07-nfrs/                # NFRs here map directly to acceptance criteria in tests/
  08-tech-stack/
  09-data-and-integration/
  10-deployment/
  11-risks/
  12-governance/
  13-future-state/
  14-appendices/diagrams/
src/            # Implementation — traceable to a spec file
tests/          # Derived from specs/07-nfrs/ and specs/03-solution-overview/
```

## Spec-Driven Conventions

- Code in `src/` should be traceable to a spec in `specs/`
- New architecture decisions go in `specs/05-decisions/adr/` using `ADR-000-template.md`
- NFRs in `specs/07-nfrs/nfrs.md` are the source for test acceptance criteria
- Diagrams live in `specs/14-appendices/diagrams/` and are referenced from spec files
