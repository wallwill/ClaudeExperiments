# Constraints and Assumptions

## Business Constraints

| Constraint | Impact |
|---|---|
| Mandatory registration policy must be enforced | Requires deployment pipeline integration (Phase 3) |
| Annual recertification required for all agents | Operational overhead for agent owners |
| Centralized ownership model required | Clear accountability but adds operational process |

## Technical Constraints

| Constraint | Impact |
|---|---|
| Must integrate with Enterprise SSO | Authentication approach fixed |
| Must host on enterprise cloud platform | Hosting options constrained |
| Relational data model chosen | Schema changes require migrations |

## Operational Constraints

| Constraint | Impact |
|---|---|
| Platform team owns delivery and operations | Resourcing dependency |
| EA owns governance and taxonomy | Taxonomy changes require EA involvement |
| Security owns risk controls | Risk tier definitions require Security sign-off |

## Assumptions

| Assumption | If Wrong |
|---|---|
| Mandatory registration can be enforced via policy | Adoption falls short of 100% target |
| Enterprise SSO is available for integration | Auth approach must be revisited |
| Agents can be meaningfully classified by the defined risk tiers | Risk model needs redesign |
| Business capability taxonomy exists or can be defined | Capability mapping deferred |
