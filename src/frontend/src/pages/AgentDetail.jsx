import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAgent, transitionLifecycle, deleteAgent, getAuditLogs } from '../api/agents';
import Badge from '../components/Badge';

const TRANSITIONS = {
  PROPOSED:   ['IN_REVIEW'],
  IN_REVIEW:  ['APPROVED', 'PROPOSED'],
  APPROVED:   ['ACTIVE', 'IN_REVIEW'],
  ACTIVE:     ['RESTRICTED', 'DEPRECATED'],
  RESTRICTED: ['ACTIVE', 'DEPRECATED'],
  DEPRECATED: ['RETIRED'],
  RETIRED:    [],
};

function fmt(val) { return val?.replace(/_/g, ' ') ?? '—'; }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-AU', { dateStyle: 'medium' }) : '—'; }
function fmtDateTime(d) { return d ? new Date(d).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' }) : '—'; }

export default function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState(null);

  const reload = () => {
    getAgent(id).then(setAgent);
    getAuditLogs(id).then(setAuditLogs);
  };

  useEffect(() => { reload(); }, [id]);

  const handleTransition = async (newState) => {
    try {
      setError(null);
      await transitionLifecycle(id, newState);
      reload();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete agent "${agent.name}"? This cannot be undone.`)) return;
    await deleteAgent(id);
    navigate('/');
  };

  if (!agent) return <div className="empty-state">Loading...</div>;

  const nextStates = TRANSITIONS[agent.lifecycleState] || [];
  const latestCompliance = agent.complianceRecords?.sort((a, b) => new Date(b.approvalDate) - new Date(a.approvalDate))[0];

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 className="page-title">{agent.name}</h1>
          <Badge type="lifecycle" value={agent.lifecycleState} />
          <Badge type="risk" value={agent.riskTier} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/agents/${id}/edit`} className="btn btn-secondary">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>

      {/* Core metadata */}
      <div className="card mb-4">
        <h2 className="section-title">Agent Details</h2>
        <div className="detail-grid">
          <div className="detail-field"><label>Description</label><span>{agent.description}</span></div>
          <div className="detail-field"><label>Type</label><span>{fmt(agent.agentType)}</span></div>
          <div className="detail-field"><label>Environment</label><span>{agent.environment}</span></div>
          <div className="detail-field"><label>Data Classification</label><span>{fmt(agent.dataClassification)}</span></div>
          <div className="detail-field"><label>Business Capability</label><span>{agent.businessCapability?.name ?? '—'}</span></div>
          <div className="detail-field"><label>Value Stream</label><span>{agent.businessCapability?.valueStream ?? '—'}</span></div>
          <div className="detail-field"><label>Business Owner</label><span>{agent.owner?.businessOwner ?? '—'}</span></div>
          <div className="detail-field"><label>Technical Owner</label><span>{agent.owner?.technicalOwner ?? '—'}</span></div>
          <div className="detail-field"><label>Registered</label><span>{fmtDate(agent.createdAt)}</span></div>
          <div className="detail-field"><label>Last Updated</label><span>{fmtDate(agent.updatedAt)}</span></div>
        </div>
      </div>

      {/* Lifecycle transitions */}
      <div className="card mb-4">
        <h2 className="section-title">Lifecycle Management</h2>
        <div className="lifecycle-section">
          <h3>Current state: <Badge type="lifecycle" value={agent.lifecycleState} /></h3>
          {nextStates.length > 0 ? (
            <div className="transition-buttons" style={{ marginTop: 10 }}>
              <span style={{ fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>Transition to:</span>
              {nextStates.map((s) => (
                <button key={s} className="btn btn-secondary btn-sm" onClick={() => handleTransition(s)}>
                  {fmt(s)}
                </button>
              ))}
            </div>
          ) : (
            <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 8 }}>No further transitions available.</p>
          )}
          {error && <p style={{ color: '#dc2626', marginTop: 8, fontSize: 13 }}>{error}</p>}
        </div>
      </div>

      {/* Compliance */}
      <div className="card mb-4">
        <h2 className="section-title">Governance & Compliance</h2>
        {latestCompliance ? (
          <div className="detail-grid">
            <div className="detail-field"><label>Approved By</label><span>{latestCompliance.approvedBy}</span></div>
            <div className="detail-field"><label>Approval Date</label><span>{fmtDate(latestCompliance.approvalDate)}</span></div>
            <div className="detail-field"><label>Recertification Due</label><span>{fmtDate(latestCompliance.recertificationDue)}</span></div>
            <div className="detail-field"><label>Notes</label><span>{latestCompliance.notes ?? '—'}</span></div>
          </div>
        ) : (
          <p style={{ color: '#94a3b8', fontSize: 13 }}>No compliance record on file.</p>
        )}
      </div>

      {/* Audit log */}
      <div className="card">
        <h2 className="section-title">Audit History</h2>
        {auditLogs.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: 13 }}>No audit entries.</p>
        ) : (
          <ul className="audit-log">
            {auditLogs.map((log) => (
              <li key={log.id}>
                <span className="audit-action">{fmt(log.action)}</span>
                <span className="audit-time">{fmtDateTime(log.createdAt)}</span>
                <span style={{ color: '#64748b', fontSize: 12 }}>{log.changedBy}</span>
                {log.details && <span className="audit-details">{log.details}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
