import { QRCodeSVG } from 'qrcode.react';
import { Download, Phone, ShieldAlert, User } from 'lucide-react';

export function EmergencyQR() {
  const patientData = {
    name: "Alex Johnson",
    dob: "1980-05-14",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Lisinopril 10mg", "Atorvastatin 20mg"],
    chronicConditions: ["Hypertension", "Asthma"],
    emergencyContact: {
      name: "Sarah Johnson",
      relation: "Spouse",
      phone: "+1 (555) 123-4567"
    }
  };

  // In a real app, this would be a URL to a public emergency profile page
  const qrData = JSON.stringify(patientData);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Emergency Health QR Card</h2>
        <p className="text-gray-500 mt-1">Instant access to your critical medical history for first responders.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col items-center p-10 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-rose-600"></div>
          
          <div className="relative z-10 bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-8 mt-4">
            <QRCodeSVG 
              value={qrData} 
              size={200}
              level="H"
              includeMargin={true}
              fgColor="#111827"
            />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900">{patientData.name}</h3>
          <p className="text-gray-500 font-medium tracking-wide mt-1">MEDICAL EMERGENCY SCAN</p>

          <div className="w-full mt-8 space-y-4">
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Download className="w-5 h-5" />
              Save to Apple Wallet / GPay
            </button>
            <p className="text-xs text-center text-gray-400">
              Scan this code with any smartphone camera to view critical medical information.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Basic Info
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Blood Type</p>
                <p className="text-lg font-semibold text-rose-600">{patientData.bloodType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Date of Birth</p>
                <p className="text-lg font-medium text-gray-900">{patientData.dob}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Critical Alerts
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map(a => (
                    <span key={a} className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md text-sm font-medium border border-rose-100">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Chronic Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {patientData.chronicConditions.map(c => (
                    <span key={c} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-sm font-medium border border-amber-100">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-indigo-500" />
              Emergency Contact
            </h3>
            <div>
              <p className="font-medium text-gray-900">{patientData.emergencyContact.name}</p>
              <p className="text-sm text-gray-500">{patientData.emergencyContact.relation}</p>
              <p className="text-lg font-medium text-indigo-600 mt-1">{patientData.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
