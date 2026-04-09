import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Video, FileText, ChevronRight, Plus } from 'lucide-react';

const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    date: 'Today, Oct 24',
    time: '2:30 PM',
    type: 'In-person',
    location: 'Heart & Vascular Institute, Room 302',
    color: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50',
    text: 'text-blue-700'
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'Primary Care',
    date: 'Mon, Oct 28',
    time: '10:00 AM',
    type: 'Video Visit',
    location: 'Telehealth Portal',
    color: 'from-emerald-500 to-teal-400',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700'
  },
  {
    id: 3,
    doctor: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    date: 'Thu, Nov 12',
    time: '1:15 PM',
    type: 'In-person',
    location: 'Skin Health Center, Suite 4B',
    color: 'from-purple-500 to-indigo-400',
    bg: 'bg-purple-50',
    text: 'text-purple-700'
  }
];

const pastAppointments = [
  {
    id: 4,
    doctor: 'Dr. Michael Chen',
    specialty: 'Primary Care',
    date: 'Sep 15, 2023',
    time: '9:00 AM',
    type: 'In-person',
    status: 'Completed',
    notes: 'Annual physical. All vitals normal.'
  },
  {
    id: 5,
    doctor: 'Dr. James Wilson',
    specialty: 'Optometrist',
    date: 'Aug 02, 2023',
    time: '3:45 PM',
    type: 'In-person',
    status: 'Completed',
    notes: 'Prescription updated.'
  }
];

export function Appointments() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Appointments</h2>
          <p className="text-slate-500 mt-1">Manage your upcoming visits and view past records.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#0ECFB4] to-[#7C6FF7] text-white rounded-xl font-medium shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5">
          <Plus className="w-5 h-5" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-xl shadow-sm border border-slate-100 w-fit">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'upcoming'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'past'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Past Visits
        </button>
      </div>

      {/* Content */}
      {activeTab === 'upcoming' ? (
        <div className="grid gap-4">
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 transition-all hover:shadow-md">
              {/* Date/Time Column */}
              <div className={`md:w-48 flex-shrink-0 rounded-xl p-4 flex flex-col justify-center items-center text-center ${apt.bg}`}>
                <Calendar className={`w-6 h-6 mb-2 ${apt.text}`} />
                <div className={`font-bold text-lg ${apt.text}`}>{apt.date}</div>
                <div className={`text-sm font-medium mt-1 opacity-80 ${apt.text}`}>{apt.time}</div>
              </div>

              {/* Details Column */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{apt.doctor}</h3>
                    <p className="text-slate-500 font-medium">{apt.specialty}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${apt.color}`}>
                    {apt.type}
                  </span>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    {apt.type === 'Video Visit' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    <span>{apt.location}</span>
                  </div>
                </div>
              </div>

              {/* Actions Column */}
              <div className="md:w-48 flex-shrink-0 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                  {apt.type === 'Video Visit' ? 'Join Call' : 'Check In'}
                </button>
                <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {pastAppointments.map((apt) => (
              <div key={apt.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{apt.doctor}</h4>
                    <p className="text-sm text-slate-500">{apt.specialty}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium w-fit">
                    {apt.status}
                  </span>
                  <button className="flex items-center gap-1 text-sm font-medium text-[#0ECFB4] hover:text-[#09A892] transition-colors">
                    <FileText className="w-4 h-4" />
                    Visit Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
