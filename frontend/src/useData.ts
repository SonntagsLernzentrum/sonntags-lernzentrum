import { FileSignature, Calendar, User, BookOpen } from "lucide-react";
import { useState } from "react";
import { useContracts } from "../../hooks/useData";

export default function ContractManagement() {
  const { contracts } = useContracts();
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  const contract = selectedContract
    ? contracts.find((c) => c.id === selectedContract)
    : null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vertragsübersicht
        </h2>
        <p className="text-gray-600">
          Alle Verträge in der Übersicht
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Vertragsliste */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alle Verträge ({contracts.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Vertragsnr.
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Schüler
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Fach
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Tarif
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => {
                  const isActive = new Date(contract.vertragsende.split(".").reverse().join("-")) > new Date();
                  return (
                    <tr
                      key={contract.id}
                      onClick={() => setSelectedContract(contract.id)}
                      className={`border-b border-gray-100 hover:bg-indigo-50 cursor-pointer transition-colors ${
                        selectedContract === contract.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {contract.vertragsNr}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {contract.schueler}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {contract.fach}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {contract.tarif}
                      </td>
                      <td className="py-3 px-4">
                        {isActive ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Aktiv
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            Beendet
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vertragsdetails */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Vertragsdetails
          </h3>

          {contract ? (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileSignature className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-gray-900">
                    {contract.vertragsNr}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{contract.art}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Schüler</p>
                    <p className="font-medium text-gray-900">
                      {contract.schueler}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Fach</p>
                    <p className="font-medium text-gray-900">{contract.fach}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileSignature className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Tarif</p>
                    <p className="font-medium text-gray-900">{contract.tarif}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Vertragsabschluss</p>
                    <p className="font-medium text-gray-900">
                      {contract.vertragsabschluss}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Vertragsende</p>
                    <p className="font-medium text-gray-900">
                      {contract.vertragsende}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (Letzter Schultag in Bayern)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Vertrag bearbeiten
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileSignature className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">
                Wählen Sie einen Vertrag aus der Liste aus
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistiken */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileSignature className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Aktive Verträge</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {
              contracts.filter(
                (c) =>
                  new Date(c.vertragsende.split(".").reverse().join("-")) >
                  new Date()
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileSignature className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Gesamt</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {contracts.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Ablaufend (30 Tage)</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
    </div>
  );
}
