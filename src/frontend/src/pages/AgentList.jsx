import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAgents } from '../api/agents';
import Badge from '../components/Badge';

const LIFECYCLE_STATES = ['PROPOSED', 'IN_REVIEW', 'APPROVED', 'ACTIVE', 'RESTRICTED', 'DEPRECATED', 'RETIRED'];
const RISK_TIERS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const AGENT_TYPES = ['ASSISTIVE', 'AUTONOMOUS', 'COMPOSITE'];

export default function AgentList() {
  const [agents, setAgents] = useState([]);
  const [filters, setFilters] = useState({ name: '', lifecycleState: '', riskTier: '', agentType: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAgents(filters)
      .then(setAgents)
      .finally(() => setLoading(false));
  }, [filters]);

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Agent Registry</h1>
        <Link to="/agents/new" className="btn btn-primary">+ Register Agent</Link>
      </div>

      <div className="filters">
        <input
          placeholder="Search by name..."
          value={filters.name}
          onChange={(e) => setFilter('name', e.target.value)}
        />
        <select value={filters.lifecycleState} onChange={(e) => setFilter('lifecycleState', e.target.value)}>
          <option value="">All Lifecycle States</option>
          {LIFECYCLE_STATES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
        <select value={filters.riskTier} onChange={(e) => setFilter('riskTier', e.target.value)}>
          <option value="">All Risk Tiers</option>
          {RISK_TIERS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filters.agentType} onChange={(e) => setFilter('agentType', e.target.value)}>
          <option value="">All Types</option>
          {AGENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div className="empty-state">Loading...</div>
        ) : agents.length === 0 ? (
          <div className="empty-state">No agents found. <Link to="/agents/new">Register the first one.</Link></div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Lifecycle State</th>
                <th>Risk Tier</th>
                <th>Business Owner</th>
                <th>Capability</th>
                <th>Environment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td><Link to={`/agents/${agent.id}`}>{agent.name}</Link></td>
                  <td>{agent.agentType}</td>
                  <td><Badge type="lifecycle" value={agent.lifecycleState} /></td>
                  <td><Badge type="risk" value={agent.riskTier} /></td>
                  <td>{agent.owner?.businessOwner ?? '—'}</td>
                  <td>{agent.businessCapability?.name ?? '—'}</td>
                  <td>{agent.environment}</td>
                  <td>
                    <div className="actions-cell">
                      <Link to={`/agents/${agent.id}`} className="btn btn-secondary btn-sm">View</Link>
                      <Link to={`/agents/${agent.id}/edit`} className="btn btn-secondary btn-sm">Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
