# Non-Functional Requirements

> NFRs here drive acceptance criteria in tests/

## Performance

| Requirement | Target | Measurement |
|---|---|---|
| Search response time | < 2 seconds | p95 latency |
| CRUD operations | < 3 seconds | p95 latency |

## Availability / Reliability

| Requirement | Target | Notes |
|---|---|---|
| Uptime | 99.5% | Excludes planned maintenance |

## Scalability

| Requirement | Target | Measurement |
|---|---|---|
| Agent records supported | 5,000+ | Load test |

## Security

| Requirement | Standard/Control | Notes |
|---|---|---|
| Role-based access control | RBAC | Registry Admin, Owner, Reviewer, Architect, Consumer |
| Encryption in transit | TLS | All API and UI traffic |
| Encryption at rest | Platform standard | Database and storage |
| Full audit trail | Immutable audit log | All create/update/delete/approve actions |
| Prompt injection mitigation | Input/output validation | Mandatory for all risk tiers |
| Human-in-the-loop | Governance workflow | Required for High and Critical risk agents |

## Governance

| Requirement | Target | Notes |
|---|---|---|
| Production registration compliance | 100% | Enforced via deployment gate |
| Annual recertification | 100% | Workflow-driven |

## Auditability

| Requirement | Tooling | Notes |
|---|---|---|
| Full lifecycle traceability | Audit Log entity | All state transitions recorded |

## Usability

| Requirement | Target | Notes |
|---|---|---|
| Search and filtering | Strong, low-friction | Key adoption driver |
| Registration experience | Minimal friction | Optimise for adoption |
