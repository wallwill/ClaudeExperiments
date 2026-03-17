import { Routes, Route, Link } from 'react-router-dom';
import AgentList from './pages/AgentList';
import AgentDetail from './pages/AgentDetail';
import AgentForm from './pages/AgentForm';

export default function App() {
  return (
    <div>
      <header className="topbar">
        <Link to="/" className="topbar-title">ARMT</Link>
        <span className="topbar-subtitle">Agent Registry Management Tool</span>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<AgentList />} />
          <Route path="/agents/new" element={<AgentForm />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/agents/:id/edit" element={<AgentForm />} />
        </Routes>
      </main>
    </div>
  );
}
