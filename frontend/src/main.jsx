import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LogOut, FileText, Users, Calendar, CreditCard } from 'lucide-react';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:10000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ invoices: [], students: [], contracts: [], dashboard: null });
  const [login, setLogin] = useState('LV432085');
  const [password, setPassword] = useState('Start123!');
  const [error, setError] = useState('');

  async function api(path) {
    const res = await fetch(API + path, { headers: { Authorization: 'Bearer ' + token } });
    return res.json();
  }

  useEffect(() => {
    if (!token) return;
    Promise.all([api('/api/me'), api('/api/invoices'), api('/api/students'), api('/api/contracts'), api('/api/admin/dashboard')])
      .then(([me, invoices, students, contracts, dashboard]) => {
        setUser(me.user);
        setData({ invoices, students, contracts, dashboard });
      })
      .catch(() => logout());
  }, [token]);

  async function doLogin(e) {
    e.preventDefault();
    setError('');
    const res = await fetch(API + '/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login, password })
    });
    const json = await res.json();
    if (!res.ok) return setError(json.message || 'Fehler');
    localStorage.setItem('token', json.token);
    setToken(json.token);
    setUser(json.user);
  }

  function logout() { localStorage.removeItem('token'); setToken(null); setUser(null); }

  if (!token) return <main className="loginPage"><form className="loginBox" onSubmit={doLogin}>
    <h1>Sonntags Lernzentrum</h1><p>Portal Login</p>
    <label>Kundennummer / Personalnummer</label><input value={login} onChange={e=>setLogin(e.target.value)} />
    <label>Passwort</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
    {error && <div className="error">{error}</div>}
    <button>Anmelden</button>
    <small>Demo: LV432085, L658934, B45385 oder K10001 / Start123!</small>
  </form></main>;

  return <main className="app">
    <aside><h2>SLZ</h2><p>{user?.role}</p><nav><a>Dashboard</a><a>Rechnungen</a><a>Schüler</a><a>Verträge</a><a>Konto</a></nav><button onClick={logout}><LogOut size={16}/> Abmelden</button></aside>
    <section className="content"><header><h1>Guten Tag, {user?.lastName}</h1><p>Willkommen im Sonntags Lernzentrum Portal.</p></header>
      <div className="cards"><Card icon={<FileText/>} title="Offene Rechnungen" value={data.dashboard?.openInvoices ?? data.invoices.length}/><Card icon={<Users/>} title="Schüler" value={data.students.length}/><Card icon={<Calendar/>} title="Verträge" value={data.contracts.length}/><Card icon={<CreditCard/>} title="Zahlungen" value="Aktiv"/></div>
      <Panel title="Rechnungen">{data.invoices.map(i=><div className="row" key={i.id}><b>{i.number}</b><span>{i.title}</span><span>{i.total}</span><button>PDF</button></div>)}</Panel>
      <Panel title="Meine Kinder / Schüler">{data.students.map(s=><div className="row" key={s.id}><b>{s.name}</b><span>Klasse {s.grade}</span><span>{s.school}</span></div>)}</Panel>
      <Panel title="Verträge">{data.contracts.map(c=><div className="contract" key={c.id}><b>{c.number}</b><p>{c.type} · {c.student} · {c.subject} · {c.tariff}</p><p>{c.start} bis {c.end}</p><button>Kündigung anfragen</button></div>)}</Panel>
    </section>
  </main>;
}
function Card({icon,title,value}){return <div className="card">{icon}<span>{title}</span><b>{value}</b></div>}
function Panel({title,children}){return <section className="panel"><h2>{title}</h2>{children}</section>}

createRoot(document.getElementById('root')).render(<App/>);
