import { useState } from 'react';
import { Share2, Check, Copy, Shield, FileText, Activity, Pill, Stethoscope, Clock } from 'lucide-react';

export function ShareRecord() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['medications', 'allergies']);
  const [duration, setDuration] = useState('24h');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleGenerateLink = () => {
    // Simulate generating a secure link
    setGeneratedLink(`https://healthhub.app/share/${Math.random().toString(36).substring(2, 15)}`);
    setCopied(false);
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareableItems = [
    { id: 'medications', label: 'Current Medications', icon: Pill, description: 'Active prescriptions and dosages' },
    { id: 'allergies', label: 'Allergies & Conditions', icon: Shield, description: 'Known allergies and chronic conditions' },
    { id: 'labs', label: 'Recent Health Records', icon: Activity, description: 'Test results from the last 6 months' },
    { id: 'doctors', label: 'Care Team Info', icon: Stethoscope, description: 'Contact details for your current doctors' },
    { id: 'history', label: 'Visit History', icon: FileText, description: 'Past appointment notes and summaries' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Share My Record</h2>
        <p className="text-gray-500 mt-1">Securely share your medical information with new doctors or family members.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Select Information to Share</h3>
            <div className="space-y-3">
              {shareableItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected ? 'border-indigo-500 bg-indigo-50/30' : 'border-gray-100 hover:border-indigo-200'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-indigo-600' : 'border-2 border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />
                        <h4 className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>{item.label}</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Set Link Expiration</h3>
            <div className="grid grid-cols-3 gap-3">
              {['24h', '7d', '30d'].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`py-3 rounded-xl border font-medium text-sm transition-colors ${
                    duration === dur 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 text-gray-600 hover:border-indigo-200'
                  }`}
                >
                  {dur === '24h' ? '24 Hours' : dur === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              Your data is encrypted end-to-end. The recipient will only see the specific information you've selected, and access will automatically expire after the chosen duration.
            </p>
            
            <button 
              onClick={handleGenerateLink}
              disabled={selectedItems.length === 0}
              className="w-full py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Generate Secure Link
            </button>
          </div>

          {generatedLink && (
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-emerald-600 font-medium mb-3">
                <Check className="w-5 h-5" /> Link Generated
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This link will expire in {duration === '24h' ? '24 hours' : duration === '7d' ? '7 days' : '30 days'}.
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 truncate font-mono">
                  {generatedLink}
                </div>
                <button 
                  onClick={handleCopy}
                  className={`p-2 rounded-lg border transition-colors ${
                    copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-orange-500 shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 text-sm">Active Shared Links</h4>
                <p className="text-xs text-orange-600 mt-1">You currently have 0 active shared links.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
