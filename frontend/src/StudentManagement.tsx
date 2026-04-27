import { GraduationCap, FileText, Calendar } from "lucide-react";
import { Link } from "react-router";
import { useStudents, useContracts } from "../../hooks/useData";

export default function ParentChildren() {
  const { students } = useStudents();
  const { contracts } = useContracts();

  // Filter für Müller-Kinder (später durch echte Parent-ID ersetzen)
  const myChildren = students.filter((s) => s.name.includes("Müller"));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Meine Kinder</h2>
        <p className="text-gray-600">
          Übersicht aller angemeldeten Schüler
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {myChildren.map((child) => {
          const contracts = mockContracts.filter((c) => c.schuelerId === child.id);

          return (
            <div
              key={child.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{child.name}</h3>
                    <p className="text-blue-100">Klasse {child.klasse}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Schule</p>
                  <p className="font-medium text-gray-900">{child.schule}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Schulart</p>
                  <p className="font-medium text-gray-900">{child.schulart}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Geburtsdatum</p>
                  <p className="font-medium text-gray-900">
                    {new Date(child.geburtsdatum).toLocaleDateString("de-DE")}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      Aktive Verträge
                    </p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {childContracts.length}
                    </span>
                  </div>
                  {childContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="text-sm text-gray-600 mb-1"
                    >
                      • {contract.fach} ({contract.tarif})
                    </div>
                  ))}
                </div>

                <Link
                  to={`/eltern/kinder/${child.id}`}
                  className="block w-full py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors mt-4"
                >
                  Details ansehen
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {myChildren.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Keine Kinder angemeldet</p>
        </div>
      )}
    </div>
  );
}
