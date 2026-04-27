import { Link } from "react-router";
import { GraduationCap, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sonntags Lernzentrum
          </h1>
          <p className="text-xl text-gray-600">
            Willkommen im Verwaltungsportal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/eltern/login"
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Elternportal
              </h2>
              <p className="text-gray-600 mb-6">
                Zugang für Eltern und Erziehungsberechtigte
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Zum Login
              </button>
            </div>
          </Link>

          <Link
            to="/mitarbeiter/login"
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Mitarbeiterportal
              </h2>
              <p className="text-gray-600 mb-6">
                Zugang für Verwaltung, Leitung und Lehrkräfte
              </p>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Zum Login
              </button>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2026 Sonntags Lernzentrum - Jason Sonntag</p>
        </div>
      </div>
    </div>
  );
}
