const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());

const users = [
  { id: 1, type: 'parent', login: 'K10001', password: bcrypt.hashSync('Start123!', 10), role: 'ELTERN', name: 'Familie Sonntag', lastName: 'Sonntag' },
  { id: 2, type: 'staff', login: 'LV432085', password: bcrypt.hashSync('Start123!', 10), role: 'ADMIN', name: 'Jason', lastName: 'Sonntag' },
  { id: 3, type: 'staff', login: 'L658934', password: bcrypt.hashSync('Start123!', 10), role: 'LEHRER', name: 'Lehrer', lastName: 'Mustermann' },
  { id: 4, type: 'staff', login: 'B45385', password: bcrypt.hashSync('Start123!', 10), role: 'BUCHHALTUNG', name: 'Buchhaltung', lastName: 'SLZ' }
];

const invoices = [
  { id: 1, parentId: 1, number: 'RE-2604-001', title: 'Einzelstunde Nachhilfe Mittelschule', amount: '35,00€', travelAmount: '0,00€', zone: 1, vat: '0% §4 Nr.21a)bb) UStG Umsatzsteuerfrei', total: '35,00€', status: 'offen' }
];

const students = [
  { id: 1, parentId: 1, name: 'Max', grade: '6', school: 'Johann Daniel Preissler Mittelschule', schoolType: 'Mittelschule' }
];

const contracts = [
  { id: 1, studentId: 1, number: 'NH4-836', type: 'Nachhilfe', student: 'Max', subject: 'Mathematik', tariff: 'FörderPlus', start: '14.02.2026', end: '31.07.2026' }
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 11) return 'Guten Morgen';
  if (hour < 18) return 'Guten Tag';
  return 'Guten Abend';
}

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token ungültig' });
  }
}

app.get('/', (req, res) => {
  res.json({ ok: true, app: 'Sonntags Lernzentrum Portal API', status: 'online' });
});

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Login fehlgeschlagen' });
  }
  const token = jwt.sign({ id: user.id, login: user.login, role: user.role, type: user.type, name: user.name, lastName: user.lastName }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, login: user.login, role: user.role, type: user.type, name: user.name, lastName: user.lastName } });
});

app.get('/api/me', auth, (req, res) => res.json({ user: req.user, greeting: greeting() }));
app.get('/api/invoices', auth, (req, res) => res.json(invoices));
app.get('/api/students', auth, (req, res) => res.json(students));
app.get('/api/contracts', auth, (req, res) => res.json(contracts));

app.get('/api/admin/dashboard', auth, (req, res) => {
  res.json({ openInvoices: invoices.length, students: students.length, contracts: contracts.length, messages: 0, cancellations: 0, revocations: 0 });
});

app.listen(PORT, () => console.log(`SLZ API running on port ${PORT}`));
