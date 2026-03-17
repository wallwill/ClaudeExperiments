const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const getAgents = (filters = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
  );
  return request(`/agents${params.toString() ? `?${params}` : ''}`);
};

export const getAgent = (id) => request(`/agents/${id}`);

export const createAgent = (data) =>
  request('/agents', { method: 'POST', body: data });

export const updateAgent = (id, data) =>
  request(`/agents/${id}`, { method: 'PUT', body: data });

export const transitionLifecycle = (id, newState) =>
  request(`/agents/${id}/lifecycle`, { method: 'PATCH', body: { newState } });

export const deleteAgent = (id) =>
  request(`/agents/${id}`, { method: 'DELETE' });

export const getCapabilities = () => request('/capabilities');

export const getOwners = () => request('/owners');

export const getAuditLogs = (agentId) =>
  request(`/audit-logs?agentId=${agentId}`);
