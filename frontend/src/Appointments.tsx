import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Mail } from "lucide-react";

export default function ParentLogin() {
  const navigate = useNavigate();
  const [kundennummer, setKundennummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Login - später durch echte API ersetzen
    if (kundennummer && passwort) {
      localStorage.setItem("userType", "parent");
      localStorage.setItem("parentId", "1");
      navigate("/eltern/dashboard");
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.");
    setShowResetPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Elternportal</h1>
          <p className="text-gray-600 mt-2">Sonntags Lernzentrum</p>
        </div>

        {!showResetPassword ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kundennummer
              </label>
              <input
                type="text"
                value={kundennummer}
                onChange={(e) => setKundennummer(e.target.value)}
                placeholder="KD-2024-001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setShowResetPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Passwort vergessen?
            </button>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Anmelden
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <p className="text-gray-600 text-sm">
              Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen Ihres Passworts zu erhalten.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="ihre.email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowResetPassword(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Zurück
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Link senden
              </button>
            </div>
          </form>
        )}

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
