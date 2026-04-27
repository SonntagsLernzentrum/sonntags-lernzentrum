import { Calendar, FileText, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useAppointments, useInvoices, useStudents } from "../../hooks/useData";

export default function ParentDashboard() {
  const { students } = useStudents();
  const { invoices } = useInvoices();
  const { appointments } = useAppointments();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Guten Morgen";
    if (hour < 18) return "Guten Tag";
    return "Guten Abend";
  };

  const parentName = "Müller";
  const nextAppointment = appointments[0];
  const openInvoices = invoices.filter((inv) => inv.status === "offen" || inv.status === "überfällig");
  const overdueInvoices = invoices.filter((inv) => inv.status === "überfällig");
  const myStudents = students.filter(s => s.name.includes("Müller"));

  return (
    <div className="space-y-6">
      {/* Begrüßung */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {getGreeting()}, Frau {parentName}!
        </h2>
        <p className="text-gray-600 mt-2">
          Willkommen zurück im Elternportal
        </p>
      </div>

      {/* Überfällige Rechnungen Warnung */}
      {overdueInvoices.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900">Überfällige Rechnungen</h3>
            <p className="text-red-700 text-sm mt-1">
              Sie haben {overdueInvoices.length} überfällige Rechnung(en). Bitte begleichen Sie diese zeitnah.
            </p>
            <Link
              to="/eltern/rechnungen"
              className="text-red-700 underline text-sm mt-2 inline-block hover:text-red-800"
            >
              Zu den Rechnungen →
            </Link>
          </div>
        </div>
      )}

      {/* Schnellübersicht */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Meine Kinder</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{myStudents.length}</p>
          <p className="text-gray-600 text-sm mt-1">Angemeldete Schüler</p>
          <Link
            to="/eltern/kinder"
            className="text-blue-600 text-sm mt-4 inline-block hover:underline"
          >
            Details ansehen →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Termine</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{appointments.filter(a => a.schueler.includes("Müller")).length}</p>
          <p className="text-gray-600 text-sm mt-1">Geplante Termine</p>
          <Link
            to="/eltern/termine"
            className="text-green-600 text-sm mt-4 inline-block hover:underline"
          >
            Alle Termine →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Rechnungen</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{openInvoices.length}</p>
          <p className="text-gray-600 text-sm mt-1">Offene Rechnungen</p>
          <Link
            to="/eltern/rechnungen"
            className="text-orange-600 text-sm mt-4 inline-block hover:underline"
          >
            Zur Übersicht →
          </Link>
        </div>
      </div>

      {/* Nächster Termin */}
      {nextAppointment && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nächster Termin
          </h3>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{nextAppointment.schueler} - {nextAppointment.fach}</p>
              <p className="text-gray-600 text-sm">
                {new Date(nextAppointment.datum).toLocaleDateString("de-DE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                um {nextAppointment.uhrzeit} Uhr
              </p>
              <p className="text-gray-600 text-sm">Lehrkraft: {nextAppointment.lehrkraft}</p>
            </div>
          </div>
        </div>
      )}

      {/* Aktuelle Kinder */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ihre Kinder
        </h3>
        <div className="space-y-3">
          {myStudents.map((student) => (
            <Link
              key={student.id}
              to={`/eltern/kinder/${student.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">
                    Klasse {student.klasse} - {student.schule}
                  </p>
                </div>
                <span className="text-blue-600 text-sm">Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
