import { useState } from 'react';
import { Share2, Link as LinkIcon, Mail, ShieldCheck, FileText, CheckCircle2, Copy } from 'lucide-react';

export function ShareRecords() {
  const [selectedItems, setSelectedItems] = useState({
    labs: true,
    prescriptions: true,
    history: false,
    allergies: true,
    imaging: false
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleGenerateLink = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedLink("https://patientpassport.app/secure/share/req_8f72h19x");
      setIsGenerating(false);
    }, 1500);
  };

  const toggleItem = (key: keyof typeof selectedItems) => {
    setSelectedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Share Medical Records</h2>
        <p className="text-gray-500 mt-1">Securely share your health information with new doctors or family members.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Select Information to Share
            </h3>
            
            <div className="space-y-3">
              {[
                { id: 'labs', label: 'Recent Health Records', desc: 'Blood work, metabolic panels from last 12 months' },
                { id: 'prescriptions', label: 'Active Prescriptions', desc: 'Current medications and dosages' },
                { id: 'allergies', label: 'Allergies & Conditions', desc: 'Critical medical alerts and chronic conditions' },
                { id: 'history', label: 'Visit History & Notes', desc: 'Doctor notes from past appointments' },
                { id: 'imaging', label: 'Imaging Reports', desc: 'X-Rays, MRIs, and CT scan reports' },
              ].map((item) => (
                <label key={item.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedItems[item.id as keyof typeof selectedItems] ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex-shrink-0 mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={selectedItems[item.id as keyof typeof selectedItems]}
                      onChange={() => toggleItem(item.id as keyof typeof selectedItems)}
                    />
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${selectedItems[item.id as keyof typeof selectedItems] ? 'text-indigo-900' : 'text-gray-900'}`}>{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Secure Sharing Options
            </h3>
            
            <p className="text-sm text-gray-600 mb-6">
              Links automatically expire after 7 days. The recipient will need to verify their identity using a one-time passcode sent to their email.
            </p>

            {generatedLink ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Secure Link Generated</p>
                    <p className="text-xs text-emerald-700 mt-0.5">This link will expire in 7 days.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none"
                  />
                  <button className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors cursor-pointer" title="Copy Link">
                    <Copy className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Mail className="w-4 h-4" />
                    Email to Doctor
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleGenerateLink}
                disabled={isGenerating || !Object.values(selectedItems).some(Boolean)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Secure Link...
                  </span>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    Generate Secure Link
                  </>
                )}
              </button>
            )}
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="font-medium text-indigo-900 mb-2">Who has access?</h4>
            <ul className="space-y-3 mt-4">
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs">Dr. W</div>
                  <span className="text-indigo-900">Dr. James Wilson</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs cursor-pointer">Revoke</button>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs">Dr. S</div>
                  <span className="text-indigo-900">Dr. Sarah Smith</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs cursor-pointer">Revoke</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
