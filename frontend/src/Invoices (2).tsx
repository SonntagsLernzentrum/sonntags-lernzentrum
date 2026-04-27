import { useState } from "react";
import { User, CreditCard, Upload, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useParents } from "../../hooks/useData";
import { zahlungsweisen } from "../../data/mockData";

export default function ParentAccount() {
  const navigate = useNavigate();
  const { parents } = useParents();
  const [parentData, setParentData] = useState(parents[0] || {
    id: "1",
    anrede: "Frau",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    strasse: "",
    plz: "",
    ort: "",
    alleinSorgeberechtigt: false,
    kundennummer: "",
  });
  const [partner, setPartner] = useState({
    anrede: "Herr",
    vorname: "Michael",
    nachname: "Müller",
    email: "michael.mueller@example.com",
    telefon: "0911 654321",
    strasse: "Hauptstraße 15",
    plz: "90402",
    ort: "Nürnberg",
  });
  const [paymentMethod, setPaymentMethod] = useState("sepa");
  const [invoicePeriod, setInvoicePeriod] = useState("7");
  const [sepaData, setSepaData] = useState({
    kontoinhaber: "",
    iban: "",
    bic: "",
    bank: "",
  });
  const [sepaSignature, setSepaSignature] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod.includes("sepa") && (!sepaData.kontoinhaber || !sepaData.iban || !sepaSignature)) {
      alert("Bitte füllen Sie alle SEPA-Pflichtfelder aus und unterschreiben Sie das Mandat.");
      return;
    }

    alert("Änderungen wurden gespeichert!");
  };

  // IBAN validieren und Bank automatisch ermitteln
  const handleIbanChange = (iban: string) => {
    const cleanedIban = iban.replace(/\s/g, "").toUpperCase();
    setSepaData({ ...sepaData, iban: cleanedIban });

    // Banknamen basierend auf BLZ ermitteln (vereinfachte Version)
    if (cleanedIban.startsWith("DE")) {
      const blz = cleanedIban.substring(4, 12);

      // Beispiel-Zuordnung (in Produktion durch echte BLZ-Datenbank ersetzen)
      const bankMapping: { [key: string]: string } = {
        "76050101": "Sparkasse Nürnberg",
        "76020070": "HypoVereinsbank Nürnberg",
        "76030080": "Commerzbank Nürnberg",
        "76010085": "Postbank Nürnberg",
      };

      const bankName = bankMapping[blz] || "Bank wird ermittelt...";
      setSepaData(prev => ({ ...prev, bank: bankName }));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/eltern/login");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mein Konto</h2>
        <p className="text-gray-600">
          Verwalten Sie Ihre persönlichen Daten und Einstellungen
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Erziehungsberechtigte */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            1. Erziehungsberechtigte
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anrede
              </label>
              <select
                value={parentData.anrede}
                onChange={(e) =>
                  setParentData({ ...parentData, anrede: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="Frau">Frau</option>
                <option value="Herr">Herr</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vorname
              </label>
              <input
                type="text"
                value={parentData.vorname}
                onChange={(e) =>
                  setParentData({ ...parentData, vorname: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nachname
              </label>
              <input
                type="text"
                value={parentData.nachname}
                onChange={(e) =>
                  setParentData({ ...parentData, nachname: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                value={parentData.email}
                onChange={(e) =>
                  setParentData({ ...parentData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefonnummer
              </label>
              <input
                type="tel"
                value={parentData.telefon}
                onChange={(e) =>
                  setParentData({ ...parentData, telefon: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Straße und Hausnummer
              </label>
              <input
                type="text"
                value={parentData.strasse}
                onChange={(e) =>
                  setParentData({ ...parentData, strasse: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PLZ
              </label>
              <input
                type="text"
                value={parentData.plz}
                onChange={(e) =>
                  setParentData({ ...parentData, plz: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ort
              </label>
              <input
                type="text"
                value={parentData.ort}
                onChange={(e) =>
                  setParentData({ ...parentData, ort: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={parentData.alleinSorgeberechtigt}
                onChange={(e) =>
                  setParentData({
                    ...parentData,
                    alleinSorgeberechtigt: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Allein Sorgeberechtigt
              </span>
            </label>
          </div>
        </div>

        {/* 2. Erziehungsberechtigte oder Nachweis Upload */}
        {!parentData.alleinSorgeberechtigt ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              2. Erziehungsberechtigte
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anrede
                </label>
                <select
                  value={partner.anrede}
                  onChange={(e) =>
                    setPartner({ ...partner, anrede: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Frau">Frau</option>
                  <option value="Herr">Herr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vorname
                </label>
                <input
                  type="text"
                  value={partner.vorname}
                  onChange={(e) =>
                    setPartner({ ...partner, vorname: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachname
                </label>
                <input
                  type="text"
                  value={partner.nachname}
                  onChange={(e) =>
                    setPartner({ ...partner, nachname: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={partner.email}
                  onChange={(e) =>
                    setPartner({ ...partner, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  value={partner.telefon}
                  onChange={(e) =>
                    setPartner({ ...partner, telefon: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Straße und Hausnummer
                </label>
                <input
                  type="text"
                  value={partner.strasse}
                  onChange={(e) =>
                    setPartner({ ...partner, strasse: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PLZ
                </label>
                <input
                  type="text"
                  value={partner.plz}
                  onChange={(e) =>
                    setPartner({ ...partner, plz: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ort
                </label>
                <input
                  type="text"
                  value={partner.ort}
                  onChange={(e) =>
                    setPartner({ ...partner, ort: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Nachweis Alleinsorgeberechtigung
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Bitte laden Sie einen Nachweis der Alleinsorgeberechtigung hoch
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Erlaubte Formate: PDF, JPG, PNG (max. 5 MB)
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Datei auswählen
              </button>
            </div>
          </div>
        )}

        {/* Zahlungsweise */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Zahlungsweise
          </h3>

          <div className="space-y-3 mb-4">
            {zahlungsweisen.map((method) => {
              const value = method.toLowerCase().replace(/\s+/g, "_");
              return (
              <label
                key={method.value}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">{method}</span>
              </label>
            );
            })}
          </div>

          {paymentMethod.includes("rechnung") && !paymentMethod.includes("öffentliche") && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zahlungsfrist
              </label>
              <select
                value={invoicePeriod}
                onChange={(e) => setInvoicePeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="7">Innerhalb 7 Tage</option>
                <option value="14">Innerhalb 14 Tage</option>
              </select>
            </div>
          )}

          {paymentMethod.includes("öffentliche") && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                Zahlungsfrist: Innerhalb 30 Tage
              </p>
            </div>
          )}

          {paymentMethod.includes("sepa") && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Gläubigerdaten für SEPA-Mandat
                </h4>
                <p className="text-sm text-gray-700">
                  <strong>Gläubiger:</strong> Sonntags Lernzentrum Jason Sonntag
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Gläubiger-ID:</strong> DE19ZZZ00002785273
                </p>
              </div>

              <div className="p-4 border-2 border-blue-200 rounded-lg bg-white">
                <h4 className="font-medium text-gray-900 mb-4">
                  SEPA-Lastschriftmandat
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kontoinhaber <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={sepaData.kontoinhaber}
                      onChange={(e) =>
                        setSepaData({ ...sepaData, kontoinhaber: e.target.value })
                      }
                      placeholder="Max Mustermann"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IBAN <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={sepaData.iban}
                      onChange={(e) => handleIbanChange(e.target.value)}
                      placeholder="DE89 3704 0044 0532 0130 00"
                      maxLength={34}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BIC
                    </label>
                    <input
                      type="text"
                      value={sepaData.bic}
                      onChange={(e) =>
                        setSepaData({ ...sepaData, bic: e.target.value.toUpperCase() })
                      }
                      placeholder="COBADEFFXXX"
                      maxLength={11}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Optional - wird bei deutschen IBANs automatisch ermittelt
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank
                    </label>
                    <input
                      type="text"
                      value={sepaData.bank}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      placeholder="Wird automatisch ermittelt..."
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-3">
                      SEPA-Lastschriftmandat
                    </h5>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 mb-4 max-h-48 overflow-y-auto">
                      <p className="mb-2">
                        Ich ermächtige das Sonntags Lernzentrum Jason Sonntag, Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die vom Sonntags Lernzentrum Jason Sonntag auf mein Konto gezogenen Lastschriften einzulösen.
                      </p>
                      <p className="mb-2">
                        <strong>Gläubiger-Identifikationsnummer:</strong> DE19ZZZ00002785273
                      </p>
                      <p className="mb-2">
                        <strong>Mandatsreferenz:</strong> Wird separat mitgeteilt
                      </p>
                      <p className="text-xs mt-3 text-gray-600">
                        Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Digitale Unterschrift <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={sepaSignature}
                        onChange={(e) => setSepaSignature(e.target.value)}
                        placeholder="Vor- und Nachname eingeben"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none italic"
                        required
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Durch Eingabe Ihres Namens bestätigen Sie das SEPA-Lastschriftmandat
                      </p>
                    </div>

                    <div className="flex items-start gap-2 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <input
                        type="checkbox"
                        id="sepa-consent"
                        required
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="sepa-consent" className="text-sm text-gray-700">
                        Ich habe die Mandatsbestimmungen gelesen und stimme dem SEPA-Lastschriftmandat zu. Ich bestätige, dass ich zur Erteilung dieses Mandats berechtigt bin.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Änderungen speichern
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Abmelden
        </button>
      </div>
    </div>
  );
}
