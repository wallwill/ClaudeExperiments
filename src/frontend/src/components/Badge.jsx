const LIFECYCLE_LABELS = {
  PROPOSED: 'Proposed',
  IN_REVIEW: 'In Review',
  APPROVED: 'Approved',
  ACTIVE: 'Active',
  RESTRICTED: 'Restricted',
  DEPRECATED: 'Deprecated',
  RETIRED: 'Retired',
};

const RISK_LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export default function Badge({ type, value }) {
  const label =
    type === 'lifecycle'
      ? LIFECYCLE_LABELS[value] ?? value
      : RISK_LABELS[value] ?? value;

  return (
    <span className={`badge badge-${value?.toLowerCase().replace('_', '')}`}>
      {label}
    </span>
  );
}
