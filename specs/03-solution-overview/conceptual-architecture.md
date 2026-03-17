# Conceptual Architecture

## Agent Classification

| Type | Description |
|---|---|
| Assistive | Supports humans, does not act autonomously |
| Autonomous | Acts independently to complete tasks |
| Composite / Orchestrated | Composed of or orchestrating other agents |

## Lifecycle States

```
Proposed → In Review → Approved → Active → Restricted → Deprecated → Retired
```

## Key Relationships

- Agent → Application
- Agent → Agent (composition)
- Agent → Service/API

## Business Architecture Alignment

Each registered agent must map to:
- A **business capability**
- A **value stream**
- A **strategic objective**

This enables investment tracking, capability coverage analysis, and portfolio rationalization.

## Architecture Diagram

> Place diagram in /specs/14-appendices/diagrams/
