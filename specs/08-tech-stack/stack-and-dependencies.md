# Technology Stack and Dependencies

## MVP Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React (or equivalent) | TBD — decision pending |
| Backend | Node.js / .NET / Java | TBD — decision pending |
| Database | PostgreSQL | Chosen — see ADR-002 |
| Authentication | Enterprise SSO | Constraint — see constraints |
| Hosting | Enterprise cloud platform | Constraint |
| CI/CD | Standard pipeline tooling | TBD |

## Evolution Path

| Phase | Change |
|---|---|
| Phase 2 | Event-driven architecture |
| Phase 2 | Schema standardization |
| Phase 2+ | Extensible metadata model |

## External Dependencies

| Dependency | Type | Owner | Criticality |
|---|---|---|---|
| Enterprise SSO | Authentication | IT / Identity team | High |
| Enterprise cloud platform | Hosting | Platform / Infra | High |
| APM tools (Phase 2) | Integration | EA / Portfolio | Medium |
| CMDB (Phase 2) | Integration | IT Operations | Medium |
| AI platforms (Phase 2) | Integration | AI Platform team | Medium |
| CI/CD pipelines (Phase 3) | Integration | DevOps | High |
