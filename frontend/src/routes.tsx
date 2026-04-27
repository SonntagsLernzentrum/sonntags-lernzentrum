import { Download, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useInvoices } from "../../hooks/useData";

export default function ParentInvoices() {
  const { invoices } = useInvoices();

  const handleDownload = (invoiceId: string) => {
    // Mock Download - später durch echten PDF-Download ersetzen
    alert(`PDF-Download für Rechnung ${invoiceId} wird gestartet...`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "bezahlt":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            Bezahlt
          </span>
        );
      case "offen":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            Offen
          </span>
        );
      case "überfällig":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            <AlertCircle className="w-4 h-4" />
            Überfällig
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rechnungen</h2>
        <p className="text-gray-600">
          Übersicht aller Ihrer Rechnungen
        </p>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {invoice.rechnungsNr}
                  </h3>
                  {getStatusBadge(invoice.status)}
                </div>
                <p className="text-sm text-gray-600">
                  Rechnungsdatum: {new Date(invoice.datum).toLocaleDateString("de-DE")}
                </p>
              </div>
              <button
                onClick={() => handleDownload(invoice.rechnungsNr)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">{invoice.beschreibung}</span>
                  <span className="font-medium">{invoice.betrag.toFixed(2)} €</span>
                </div>

                {invoice.anfahrtzonenbetrag > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Anfahrtzonenbetrag (Zone {invoice.anfahrtszone})
                    </span>
                    <span className="text-gray-600">
                      {invoice.anfahrtzonenbetrag.toFixed(2)} €
                    </span>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  {invoice.mwst}
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Gesamtbetrag</span>
                  <span className="font-bold text-lg text-gray-900">
                    {invoice.gesamtbetrag.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {invoices.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-600">Keine Rechnungen vorhanden</p>
        </div>
      )}
    </div>
  );
}
