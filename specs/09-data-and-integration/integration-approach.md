# Integration Strategy

## Phase 1 — Standalone Registry

| Integration | Type | Notes |
|---|---|---|
| REST API | Outbound | Core integration surface |
| CSV import/export | Bulk | Onboarding and reporting |

## Phase 2 — Enterprise Connections

| System | Direction | Purpose |
|---|---|---|
| APM tools | Bidirectional | Align agent portfolio with application portfolio |
| CMDB | Bidirectional | Asset and configuration management |
| AI platforms | Inbound | Auto-register agents from platform events |

## Phase 3 — Event-Driven Integration

| System | Direction | Purpose |
|---|---|---|
| CI/CD pipelines | Inbound | Block deployment without registry approval |
| Runtime systems | Inbound | Lifecycle events and observability hooks |

## API / Contract Specs

> OpenAPI spec to be defined — place in /specs/14-appendices/
