import { Calendar, Plus, Clock, User, BookOpen } from "lucide-react";
import { useState } from "react";
import { useAppointments } from "../../hooks/useData";

export default function ParentAppointments() {
  const { appointments } = useAppointments();
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terminanfrage wurde gesendet. Sie erhalten eine Bestätigung per E-Mail.");
    setShowNewAppointment(false);
  };

  const handleGoogleCalendar = (appointment: any) => {
    // Mock Google Calendar Integration - später durch echte Integration ersetzen
    alert("Termin wird zu Google Calendar hinzugefügt...");
  };

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Termine</h2>
            <p className="text-gray-600">
              Übersicht und Verwaltung Ihrer Nachhilfetermine
            </p>
          </div>
          <button
            onClick={() => setShowNewAppointment(!showNewAppointment)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Termin vereinbaren
          </button>
        </div>
      </div>

      {/* Terminvereinbarung Formular */}
      {showNewAppointment && (
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Neuen Termin vereinbaren
          </h3>
          <form onSubmit={handleBookAppointment} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schüler
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option>Max Müller</option>
                  <option>Sophie Müller</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fach
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option>Mathematik</option>
                  <option>Deutsch</option>
                  <option>Englisch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewünschtes Datum
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewünschte Uhrzeit
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anmerkungen (optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                rows={3}
                placeholder="Besondere Wünsche oder Themen..."
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowNewAppointment(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Terminanfrage senden
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Nächster Termin hervorgehoben */}
      {sortedAppointments.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Nächster Termin
          </h3>
          <div className="bg-white rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{sortedAppointments[0].schueler}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{sortedAppointments[0].fach}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    {new Date(sortedAppointments[0].datum).toLocaleDateString("de-DE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{sortedAppointments[0].uhrzeit} Uhr</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Lehrkraft: {sortedAppointments[0].lehrkraft}
              </p>
              <button
                onClick={() => handleGoogleCalendar(sortedAppointments[0])}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Zu Google Calendar hinzufügen →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alle Termine */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Alle Termine
        </h3>
        <div className="space-y-3">
          {sortedAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className={`p-4 rounded-lg border ${
                index === 0
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {appointment.schueler} - {appointment.fach}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(appointment.datum).toLocaleDateString("de-DE")} um{" "}
                    {appointment.uhrzeit} Uhr
                  </p>
                  <p className="text-sm text-gray-600">
                    Lehrkraft: {appointment.lehrkraft}
                  </p>
                </div>
                <button
                  onClick={() => handleGoogleCalendar(appointment)}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Zu Kalender hinzufügen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sortedAppointments.length === 0 && !showNewAppointment && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Keine Termine vorhanden</p>
          <button
            onClick={() => setShowNewAppointment(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ersten Termin vereinbaren
          </button>
        </div>
      )}
    </div>
  );
}
