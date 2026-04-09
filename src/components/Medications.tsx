import { Pill, AlertCircle, CheckCircle2, Clock, User } from 'lucide-react';

export function Medications() {
  const medications = [
    { 
      id: 1, 
      name: "Lisinopril", 
      dosage: "10mg", 
      frequency: "Once daily in the morning", 
      doctor: "Dr. James Wilson", 
      purpose: "Blood Pressure Management", 
      refills: 2, 
      status: "Active", 
      nextDose: "Tomorrow, 8:00 AM",
      instructions: "Take with or without food. Do not skip doses."
    },
    { 
      id: 2, 
      name: "Atorvastatin", 
      dosage: "20mg", 
      frequency: "Once daily at bedtime", 
      doctor: "Dr. Sarah Smith", 
      purpose: "Cholesterol Control", 
      refills: 0, 
      status: "Needs Refill", 
      nextDose: "Today, 10:00 PM",
      instructions: "Avoid grapefruit juice while taking this medication."
    },
    { 
      id: 3, 
      name: "Albuterol Inhaler", 
      dosage: "90mcg/actuation", 
      frequency: "As needed for shortness of breath", 
      doctor: "Dr. Emily Chen", 
      purpose: "Asthma Relief", 
      refills: 1, 
      status: "Active", 
      nextDose: "As needed",
      instructions: "Shake well before use. Inhale 2 puffs every 4-6 hours as needed."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Medications</h2>
        <p className="text-gray-500 mt-1">Manage all your active prescriptions and refill requests.</p>
      </header>

      <div className="grid gap-6">
        {medications.map((med) => (
          <div key={med.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{med.name} <span className="text-indigo-600 text-lg font-medium ml-1">{med.dosage}</span></h3>
                  <p className="text-sm text-gray-500 mt-0.5">{med.purpose}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {med.status === 'Needs Refill' ? (
                  <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-amber-100">
                    <AlertCircle className="w-4 h-4" /> Needs Refill
                  </span>
                ) : (
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" /> Active
                  </span>
                )}
                <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                  {med.status === 'Needs Refill' ? 'Request Refill' : 'View Details'}
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50/50 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Schedule</p>
                <p className="text-sm font-medium text-gray-900">{med.frequency}</p>
                <p className="text-xs text-indigo-600 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Next: {med.nextDose}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Prescribed By</p>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" /> {med.doctor}
                </p>
                <p className="text-xs text-gray-500 mt-1">{med.refills} refills remaining</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Instructions</p>
                <p className="text-sm text-gray-700">{med.instructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
