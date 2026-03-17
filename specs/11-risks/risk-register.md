# Risk Register

## Agent Risk Tiers (Security Classification)

Risk is classified across three dimensions:
- Internal vs External exposure
- Autonomous decision-making level
- Data sensitivity

| Tier | Description | Mandatory Controls |
|---|---|---|
| Low | Internal, assistive, non-sensitive data | Audit logging, access control |
| Medium | Internal, some autonomy or sensitive data | + Input/output validation |
| High | External or highly autonomous | + Prompt injection mitigation, human-in-the-loop |
| Critical | External + autonomous + sensitive data | All controls + formal review |

## Project Risks

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | Low adoption | High | High | Enforce mandatory registration via policy | EA |
| 2 | Passive registry (governance not enforced) | Medium | High | Integrate governance gates into deployment pipelines | Platform team |
| 3 | Shadow agents bypass registry | Medium | High | Tie registry approval to CI/CD pipeline (Phase 3) | Platform + DevOps |
| 4 | Poor metadata quality | High | Medium | Controlled taxonomy + validation on submission | EA + Platform |
| 5 | Scope creep | Medium | Medium | Maintain MVP boundaries — explicit out-of-scope list | Product Owner |
| 6 | Risk misclassification | Medium | High | Formal review workflows for High/Critical tiers | Security |
