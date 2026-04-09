import React, { useState } from 'react';
import { Pill, Clock, CheckCircle2, AlertCircle, Info, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const schedule = [
  {
    id: 1,
    time: '08:00 AM',
    period: 'Morning',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', instructions: 'Take with food', status: 'taken', type: 'pill', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      { name: 'Vitamin D3', dosage: '2000 IU', instructions: 'With breakfast', status: 'taken', type: 'supplement', color: 'bg-amber-50 text-amber-700 border-amber-200' }
    ]
  },
  {
    id: 2,
    time: '01:00 PM',
    period: 'Afternoon',
    medications: [
      { name: 'Metformin', dosage: '500mg', instructions: 'Take with lunch', status: 'pending', type: 'pill', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    ]
  },
  {
    id: 3,
    time: '08:00 PM',
    period: 'Evening',
    medications: [
      { name: 'Atorvastatin', dosage: '20mg', instructions: 'Before bed', status: 'upcoming', type: 'pill', color: 'bg-purple-50 text-purple-700 border-purple-200' },
      { name: 'Melatonin', dosage: '5mg', instructions: '30 mins before sleep', status: 'upcoming', type: 'supplement', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
    ]
  }
];

export function MedSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 1);
    setCurrentDate(next);
  };

  const prevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 1);
    setCurrentDate(prev);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Medication Schedule</h2>
          <p className="text-slate-500 mt-1">Track your daily doses and stay on top of your health.</p>
        </div>
        
        {/* Date Navigator */}
        <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100">
          <button onClick={prevDay} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2 min-w-[140px] justify-center">
            <CalendarIcon className="w-4 h-4 text-[#0ECFB4]" />
            <span className="font-bold text-slate-800 text-sm">{formatDate(currentDate)}</span>
          </div>
          <button onClick={nextDay} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-[#0ECFB4] to-[#7C6FF7] rounded-2xl p-6 text-white shadow-lg shadow-teal-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Daily Progress</h3>
          <p className="text-white/80 text-sm max-w-md">You've taken 2 out of 5 medications today. Keep it up!</p>
          
          <div className="mt-4 w-full bg-white/20 rounded-full h-2.5 backdrop-blur-sm">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
        
        <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center flex-shrink-0 relative">
          <div className="absolute inset-0 rounded-full border-4 border-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-90deg)' }}></div>
          <div className="text-center">
            <span className="text-2xl font-bold">40%</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
        {schedule.map((slot, index) => (
          <div key={slot.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline Dot */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow-sm md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 text-lg">{slot.period}</h4>
                <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full">{slot.time}</span>
              </div>

              <div className="space-y-3">
                {slot.medications.map((med, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${med.color} flex items-start gap-4 transition-all hover:-translate-y-0.5`}>
                    <div className="mt-1 bg-white/50 p-2 rounded-lg backdrop-blur-sm">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-base">{med.name}</h5>
                        {med.status === 'taken' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : med.status === 'pending' ? (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-current opacity-30" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 opacity-80 text-sm font-medium">
                        <span>{med.dosage}</span>
                        <span>•</span>
                        <span>{med.instructions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  slot.medications.some(m => m.status === 'pending')
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : slot.medications.every(m => m.status === 'taken')
                    ? 'bg-emerald-50 text-emerald-700 cursor-default'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                  {slot.medications.some(m => m.status === 'pending')
                    ? 'Mark as Taken'
                    : slot.medications.every(m => m.status === 'taken')
                    ? 'All Taken'
                    : 'Upcoming'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
