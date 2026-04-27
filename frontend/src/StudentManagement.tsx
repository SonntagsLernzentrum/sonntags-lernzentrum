import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, FileText, FileSignature, AlertTriangle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useStudents, useContracts } from "../../hooks/useData";

export default function ChildDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useStudents();
  const { contracts: allContracts } = useContracts();
  const [showCancellation, setShowCancellation] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  const child = students.find((s) => s.id === id);
  const contracts = allContracts.filter((c) => c.schuelerId === id);

  if (!child) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-600">Schüler nicht gefunden</p>
        <button
          onClick={() => navigate("/eltern/kinder")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  const handleCancellation = (contractId: string, method: "app" | "whatsapp") => {
    if (method === "whatsapp") {
      window.open("https://wa.me/49911123456?text=Ich möchte einen Vertrag kündigen", "_blank");
    } else {
      alert("Kündigungsformular wurde an die Verwaltung gesendet.");
    }
    setShowCancellation(false);
    setSelectedContract(null);
  };

  const handleWithdrawal = (contractId: string, method: "app" | "whatsapp") => {
    const contract = contracts.find((c) => c.id === contractId);
    if (!contract) return;

    const contractDate = new Date(contract.vertragsabschluss.split(".").reverse().join("-"));
    const daysSinceContract = Math.floor(
      (new Date().getTime() - contractDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceContract > 14) {
      alert("Widerruf ist nur innerhalb von 14 Tagen nach Vertragsabschluss möglich.");
      return;
    }

    if (method === "whatsapp") {
      window.open("https://wa.me/49911123456?text=Ich möchte einen Vertrag widerrufen", "_blank");
    } else {
      alert("Widerrufsformular wurde an die Verwaltung gesendet.");
    }
    setShowWithdrawal(false);
    setSelectedContract(null);
  };

  const canWithdraw = (contractDate: string) => {
    const date = new Date(contractDate.split(".").reverse().join("-"));
    const daysSince = Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSince <= 14;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <button
          onClick={() => navigate("/eltern/kinder")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {child.name.split(" ")[0][0]}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{child.name}</h2>
            <p className="text-gray-600">
              Klasse {child.klasse} - {child.schulart}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Schulinformationen
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Schule</p>
              <p className="font-medium text-gray-900">{child.schule}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Schulart</p>
              <p className="font-medium text-gray-900">{child.schulart}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Klasse</p>
              <p className="font-medium text-gray-900">{child.klasse}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Geburtsdatum</p>
              <p className="font-medium text-gray-900">
                {new Date(child.geburtsdatum).toLocaleDateString("de-DE")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Dokumente
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Lernbericht Q1 2026</p>
              <p className="text-sm text-gray-600">PDF • 245 KB</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Nachhilfezeugnis</p>
              <p className="text-sm text-gray-600">PDF • 180 KB</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Fortschrittsbericht</p>
              <p className="text-sm text-gray-600">PDF • 320 KB</p>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileSignature className="w-5 h-5" />
          Verträge
        </h3>
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Vertragsnummer</p>
                  <p className="font-semibold text-gray-900">{contract.vertragsNr}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Art</p>
                  <p className="font-medium text-gray-900">{contract.art}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fach</p>
                  <p className="font-medium text-gray-900">{contract.fach}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tarif</p>
                  <p className="font-medium text-gray-900">{contract.tarif}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vertragsabschluss</p>
                  <p className="font-medium text-gray-900">{contract.vertragsabschluss}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vertragsende</p>
                  <p className="font-medium text-gray-900">{contract.vertragsende}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedContract(contract.id);
                    setShowCancellation(true);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Kündigen
                </button>
                <button
                  onClick={() => {
                    setSelectedContract(contract.id);
                    setShowWithdrawal(true);
                  }}
                  disabled={!canWithdraw(contract.vertragsabschluss)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    canWithdraw(contract.vertragsabschluss)
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Widerrufen
                  {!canWithdraw(contract.vertragsabschluss) && (
                    <span className="text-xs ml-1">(nur 14 Tage)</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kündigungsmodal */}
      {showCancellation && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Vertrag kündigen
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Möchten Sie den Vertrag kündigen? Bitte wählen Sie eine Methode:
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleCancellation(selectedContract, "app")}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kündigungsformular in der App ausfüllen
              </button>
              <button
                onClick={() => handleCancellation(selectedContract, "whatsapp")}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Per WhatsApp senden
              </button>
              <button
                onClick={() => {
                  setShowCancellation(false);
                  setSelectedContract(null);
                }}
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Widerrufsmodal */}
      {showWithdrawal && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Vertrag widerrufen
              </h3>
            </div>
            <p className="text-gray-600 mb-2">
              Widerruf ist nur innerhalb von 14 Tagen nach Vertragsabschluss möglich.
            </p>
            <p className="text-gray-600 mb-6">
              Bitte wählen Sie eine Methode:
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleWithdrawal(selectedContract, "app")}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Widerrufsformular in der App ausfüllen
              </button>
              <button
                onClick={() => handleWithdrawal(selectedContract, "whatsapp")}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Per WhatsApp senden
              </button>
              <button
                onClick={() => {
                  setShowWithdrawal(false);
                  setSelectedContract(null);
                }}
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
