import { useState } from "react";
import { useNavigate } from "react-router";
import { Users } from "lucide-react";

export default function StaffLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [rolle, setRolle] = useState("verwaltung");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Login - später durch echte API ersetzen
    if (email && passwort) {
      localStorage.setItem("userType", "staff");
      localStorage.setItem("staffRole", rolle);
      localStorage.setItem("staffName", "Maria Weber");
      navigate("/mitarbeiter/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mitarbeiterportal</h1>
          <p className="text-gray-600 mt-2">Sonntags Lernzentrum</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rolle
            </label>
            <select
              value={rolle}
              onChange={(e) => setRolle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="verwaltung">Verwaltung/Leitung (Admin)</option>
              <option value="lehrer">Lehrer</option>
              <option value="buchhaltung">Buchhaltung</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre.email@sonntags-lernzentrum.de"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Anmelden
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-gray-700"
          >
            ← Zurück zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
}
