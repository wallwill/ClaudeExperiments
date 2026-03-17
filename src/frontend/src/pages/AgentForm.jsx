import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAgent, createAgent, updateAgent, getCapabilities } from '../api/agents';

const AGENT_TYPES = ['ASSISTIVE', 'AUTONOMOUS', 'COMPOSITE'];
const RISK_TIERS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const DATA_CLASSIFICATIONS = ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED'];

const EMPTY_FORM = {
  name: '', description: '', agentType: 'ASSISTIVE',
  riskTier: 'LOW', dataClassification: 'INTERNAL', environment: '',
  businessCapabilityId: '',
  owner: { businessOwner: '', technicalOwner: '' },
};

export default function AgentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [capabilities, setCapabilities] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCapabilities().then(setCapabilities);
    if (isEdit) {
      getAgent(id).then((agent) => {
        setForm({
          name: agent.name,
          description: agent.description,
          agentType: agent.agentType,
          riskTier: agent.riskTier,
          dataClassification: agent.dataClassification,
          environment: agent.environment,
          businessCapabilityId: agent.businessCapabilityId ?? '',
          owner: agent.owner
            ? { businessOwner: agent.owner.businessOwner, technicalOwner: agent.owner.technicalOwner }
            : { businessOwner: '', technicalOwner: '' },
        });
      });
    }
  }, [id, isEdit]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setOwner = (key, value) => setForm((f) => ({ ...f, owner: { ...f.owner, [key]: value } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form, businessCapabilityId: form.businessCapabilityId || null };
      if (isEdit) {
        await updateAgent(id, payload);
        navigate(`/agents/${id}`);
      } else {
        const agent = await createAgent(payload);
        navigate(`/agents/${agent.id}`);
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{isEdit ? 'Edit Agent' : 'Register Agent'}</h1>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Agent Name *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label>Description *</label>
              <textarea required value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Agent Type *</label>
              <select value={form.agentType} onChange={(e) => set('agentType', e.target.value)}>
                {AGENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Environment *</label>
              <input required value={form.environment} onChange={(e) => set('environment', e.target.value)} placeholder="e.g. Production" />
            </div>
            <div className="form-group">
              <label>Risk Tier *</label>
              <select value={form.riskTier} onChange={(e) => set('riskTier', e.target.value)}>
                {RISK_TIERS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Data Classification *</label>
              <select value={form.dataClassification} onChange={(e) => set('dataClassification', e.target.value)}>
                {DATA_CLASSIFICATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Business Capability</label>
              <select value={form.businessCapabilityId} onChange={(e) => set('businessCapabilityId', e.target.value)}>
                <option value="">— Select capability —</option>
                {capabilities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Business Owner *</label>
              <input required value={form.owner.businessOwner} onChange={(e) => setOwner('businessOwner', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Technical Owner *</label>
              <input required value={form.owner.technicalOwner} onChange={(e) => setOwner('technicalOwner', e.target.value)} />
            </div>
          </div>

          {error && <p style={{ color: '#dc2626', marginTop: 12 }}>{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Register Agent'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
