require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed business capabilities
  const capabilities = await Promise.all([
    prisma.businessCapability.upsert({
      where: { name: 'Customer Service Automation' },
      update: {},
      create: { name: 'Customer Service Automation', valueStream: 'Customer Experience', strategicObjective: 'Reduce cost to serve' },
    }),
    prisma.businessCapability.upsert({
      where: { name: 'Finance & Reporting' },
      update: {},
      create: { name: 'Finance & Reporting', valueStream: 'Finance Operations', strategicObjective: 'Improve reporting accuracy' },
    }),
    prisma.businessCapability.upsert({
      where: { name: 'HR & Workforce Management' },
      update: {},
      create: { name: 'HR & Workforce Management', valueStream: 'People & Culture', strategicObjective: 'Improve employee experience' },
    }),
    prisma.businessCapability.upsert({
      where: { name: 'IT Operations' },
      update: {},
      create: { name: 'IT Operations', valueStream: 'Technology', strategicObjective: 'Increase operational efficiency' },
    }),
    prisma.businessCapability.upsert({
      where: { name: 'Risk & Compliance' },
      update: {},
      create: { name: 'Risk & Compliance', valueStream: 'Governance', strategicObjective: 'Reduce regulatory exposure' },
    }),
  ]);

  // Seed sample agents
  const agent1 = await prisma.agent.upsert({
    where: { id: 'seed-agent-001' },
    update: {},
    create: {
      id: 'seed-agent-001',
      name: 'Customer FAQ Bot',
      description: 'Handles tier-1 customer enquiries via chat interface.',
      agentType: 'ASSISTIVE',
      lifecycleState: 'ACTIVE',
      riskTier: 'LOW',
      dataClassification: 'INTERNAL',
      environment: 'Production',
      businessCapabilityId: capabilities[0].id,
      owner: {
        create: {
          businessOwner: 'Jane Smith (Customer Experience)',
          technicalOwner: 'Platform Team',
        },
      },
    },
  });

  const agent2 = await prisma.agent.upsert({
    where: { id: 'seed-agent-002' },
    update: {},
    create: {
      id: 'seed-agent-002',
      name: 'Expense Reconciliation Agent',
      description: 'Autonomously reconciles expense claims against policy rules.',
      agentType: 'AUTONOMOUS',
      lifecycleState: 'IN_REVIEW',
      riskTier: 'HIGH',
      dataClassification: 'CONFIDENTIAL',
      environment: 'Staging',
      businessCapabilityId: capabilities[1].id,
      owner: {
        create: {
          businessOwner: 'Finance Director',
          technicalOwner: 'Finance Tech Team',
        },
      },
    },
  });

  const agent3 = await prisma.agent.upsert({
    where: { id: 'seed-agent-003' },
    update: {},
    create: {
      id: 'seed-agent-003',
      name: 'IT Incident Triage Orchestrator',
      description: 'Orchestrates multiple sub-agents to triage and route IT incidents.',
      agentType: 'COMPOSITE',
      lifecycleState: 'PROPOSED',
      riskTier: 'MEDIUM',
      dataClassification: 'INTERNAL',
      environment: 'Development',
      businessCapabilityId: capabilities[3].id,
      owner: {
        create: {
          businessOwner: 'IT Operations Manager',
          technicalOwner: 'Platform Team',
        },
      },
    },
  });

  // Seed audit logs
  await prisma.auditLog.createMany({
    skipDuplicates: true,
    data: [
      { agentId: agent1.id, action: 'CREATED', changedBy: 'admin@example.com', details: 'Initial registration' },
      { agentId: agent1.id, action: 'LIFECYCLE_TRANSITION', changedBy: 'admin@example.com', details: 'PROPOSED → APPROVED' },
      { agentId: agent1.id, action: 'LIFECYCLE_TRANSITION', changedBy: 'admin@example.com', details: 'APPROVED → ACTIVE' },
      { agentId: agent2.id, action: 'CREATED', changedBy: 'finance@example.com', details: 'Initial registration' },
      { agentId: agent2.id, action: 'LIFECYCLE_TRANSITION', changedBy: 'finance@example.com', details: 'PROPOSED → IN_REVIEW' },
      { agentId: agent3.id, action: 'CREATED', changedBy: 'itops@example.com', details: 'Initial registration' },
    ],
  });

  // Seed compliance record for active agent
  await prisma.complianceRecord.upsert({
    where: { id: 'seed-compliance-001' },
    update: {},
    create: {
      id: 'seed-compliance-001',
      agentId: agent1.id,
      approvedBy: 'EA Review Board',
      recertificationDue: new Date('2027-03-17'),
      notes: 'Approved at ARB March 2026 session.',
    },
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
