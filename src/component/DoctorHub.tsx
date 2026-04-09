import { useState } from 'react';
import { Calendar, Clock, FileText, Pill, User, Phone, Mail, Stethoscope, Activity, ArrowLeft, ChevronRight } from 'lucide-react';

export function DoctorHub() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      specialty: "Primary Care",
      hospital: "City General Hospital",
      phone: "(555) 123-4567",
      email: "dr.smith@citygeneral.org",
      lastVisit: "Oct 12, 2023",
      image: "https://picsum.photos/seed/doctor1/200/200",
      description: "Dr. Smith is a board-certified internal medicine physician with over 15 years of experience. She focuses on preventive care, chronic disease management, and comprehensive adult medicine.",
      history: [
        { date: "Oct 12, 2023", reason: "Annual Physical", notes: "Patient is doing well overall. Blood pressure is slightly elevated. Recommended lifestyle changes." },
        { date: "Mar 04, 2023", reason: "Sinus Infection", notes: "Prescribed antibiotics. Advised rest and hydration." }
      ],
      recommendations: [
        "Reduce sodium intake to < 2000mg/day",
        "Increase cardiovascular exercise to 30 minutes, 4 times a week",
        "Schedule follow-up lipid panel in 6 months"
      ],
      currentAppointments: [
        { date: "Nov 20, 2023", time: "10:00 AM", type: "Annual Checkup Follow-up" }
      ]
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Cardiologist",
      hospital: "Heart Institute",
      phone: "(555) 987-6543",
      email: "j.wilson@heartinstitute.com",
      lastVisit: "Sep 05, 2023",
      image: "https://picsum.photos/seed/doctor2/200/200",
      description: "Dr. Wilson specializes in cardiovascular disease, focusing on hypertension, heart failure, and preventive cardiology. He is affiliated with the Heart Institute.",
      history: [
        { date: "Sep 05, 2023", reason: "Routine Cardiac Evaluation", notes: "EKG normal. Adjusted Lisinopril dosage. Continue current diet." },
        { date: "Jan 12, 2023", reason: "Initial Consultation", notes: "Established baseline metrics. Prescribed Atorvastatin for cholesterol management." }
      ],
      recommendations: [
        "Continue daily blood pressure monitoring",
        "Maintain current medication schedule strictly",
        "Report any instances of chest pain or unusual shortness of breath immediately"
      ],
      currentAppointments: [
        { date: "Dec 05, 2023", time: "2:30 PM", type: "6-Month Follow-up" }
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "ENT Specialist",
      hospital: "Metro Medical Center",
      phone: "(555) 456-7890",
      email: "echen@metromedical.com",
      lastVisit: "Jan 15, 2023",
      image: "https://picsum.photos/seed/doctor3/200/200",
      description: "Dr. Chen is an Otolaryngologist treating disorders of the ear, nose, and throat. She has a special interest in allergy management and sinus disorders.",
      history: [
        { date: "Jan 15, 2023", reason: "Allergy Assessment", notes: "Identified seasonal triggers. Prescribed daily antihistamine during spring." }
      ],
      recommendations: [
        "Use HEPA air filter in bedroom",
        "Begin antihistamine regimen 2 weeks before spring season"
      ],
      currentAppointments: []
    },
    {
      id: 4,
      name: "Dr. Michael Chang",
      specialty: "Dermatologist",
      hospital: "Skin & Laser Center",
      phone: "(555) 234-5678",
      email: "m.chang@skincenter.com",
      lastVisit: "Aug 22, 2023",
      image: "https://picsum.photos/seed/doctor4/200/200",
      description: "Dr. Chang specializes in medical and cosmetic dermatology, with expertise in skin cancer screening and treatment of chronic skin conditions like eczema and psoriasis.",
      history: [
        { date: "Aug 22, 2023", reason: "Annual Skin Check", notes: "Full body exam completed. Removed one benign mole on back. No other concerns." },
        { date: "Feb 10, 2022", reason: "Eczema Flare-up", notes: "Prescribed topical corticosteroid. Recommended gentle, fragrance-free skincare routine." }
      ],
      recommendations: [
        "Apply SPF 30+ sunscreen daily, even on cloudy days",
        "Moisturize immediately after showering",
        "Monitor mole on left shoulder for any changes in size or color"
      ],
      currentAppointments: [
        { date: "Aug 15, 2024", time: "11:00 AM", type: "Annual Skin Check" }
      ]
    },
    {
      id: 5,
      name: "Dr. Olivia Martinez",
      specialty: "Endocrinologist",
      hospital: "City General Hospital",
      phone: "(555) 876-5432",
      email: "o.martinez@citygeneral.org",
      lastVisit: "Nov 02, 2023",
      image: "https://picsum.photos/seed/doctor5/200/200",
      description: "Dr. Martinez is a board-certified endocrinologist specializing in diabetes management, thyroid disorders, and metabolic syndrome.",
      history: [
        { date: "Nov 02, 2023", reason: "Thyroid Follow-up", notes: "TSH levels are stable. Continue current Levothyroxine dosage." },
        { date: "May 18, 2023", reason: "Initial Consultation", notes: "Diagnosed with mild hypothyroidism. Started on low-dose medication." }
      ],
      recommendations: [
        "Take thyroid medication on an empty stomach, 30-60 minutes before breakfast",
        "Schedule next blood test 2 weeks before next appointment",
        "Ensure adequate iodine intake in diet"
      ],
      currentAppointments: [
        { date: "May 05, 2024", time: "9:15 AM", type: "6-Month Follow-up" }
      ]
    },
    {
      id: 6,
      name: "Dr. Robert Taylor",
      specialty: "Orthopedic Surgeon",
      hospital: "Sports Medicine Clinic",
      phone: "(555) 345-6789",
      email: "r.taylor@sportsmed.com",
      lastVisit: "Jul 10, 2023",
      image: "https://picsum.photos/seed/doctor6/200/200",
      description: "Dr. Taylor specializes in sports injuries, joint replacement, and arthroscopic surgery. He works closely with physical therapists to ensure optimal recovery.",
      history: [
        { date: "Jul 10, 2023", reason: "Knee Pain Evaluation", notes: "Diagnosed with mild meniscus tear. Recommended physical therapy and rest. Surgery not required at this time." }
      ],
      recommendations: [
        "Complete 6 weeks of physical therapy",
        "Avoid high-impact activities like running; switch to swimming or cycling",
        "Use ice therapy for 15 minutes after exercise"
      ],
      currentAppointments: []
    }
  ];

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  if (selectedDoctor) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => setSelectedDoctorId(null)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Care Team
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="px-8 pb-8 relative">
            <img 
              src={selectedDoctor.image} 
              alt={selectedDoctor.name} 
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md absolute -top-12" 
              referrerPolicy="no-referrer" 
            />
            <div className="pt-16 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedDoctor.name}</h2>
                <p className="text-lg text-indigo-600 font-medium mt-1">{selectedDoctor.specialty}</p>
                <p className="text-gray-500 mt-1 flex items-center gap-2"><Stethoscope className="w-4 h-4" /> {selectedDoctor.hospital}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors cursor-pointer flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Message
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors cursor-pointer flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Book
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedDoctor.description}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Visit History & Notes
                  </h3>
                  <div className="space-y-4">
                    {selectedDoctor.history.map((hist, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{hist.reason}</h4>
                          <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">{hist.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{hist.notes}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" /> Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {selectedDoctor.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" /> Current Appointments
                  </h3>
                  {selectedDoctor.currentAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDoctor.currentAppointments.map((apt, i) => (
                        <div key={i} className="p-3 rounded-xl border border-indigo-100 bg-indigo-50/50">
                          <p className="font-medium text-indigo-900 text-sm">{apt.type}</p>
                          <p className="text-xs text-indigo-700 mt-1 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {apt.date} at {apt.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No upcoming appointments.</p>
                  )}
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {selectedDoctor.phone}</p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {selectedDoctor.email}</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Doctor Hub</h2>
        <p className="text-gray-500 mt-1">Manage your care team and view doctor details.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doc => (
          <div 
            key={doc.id} 
            onClick={() => setSelectedDoctorId(doc.id)}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-5">
              <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-50 group-hover:border-indigo-100 transition-colors" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{doc.name}</h4>
                <p className="text-sm text-indigo-600 font-medium">{doc.specialty}</p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm text-gray-600 mb-6">
              <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-gray-400" /> {doc.hospital}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {doc.phone}</p>
            </div>
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
              <span className="text-xs text-gray-500">Last visit: {doc.lastVisit}</span>
              <span className="text-indigo-600 flex items-center gap-1 text-sm font-medium group-hover:translate-x-1 transition-transform">
                View Profile <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h3 className="text-2xl font-semibold tracking-tight mb-6">Care Team Overview</h3>
        <div className="space-y-6">
          {doctors.map(doc => (
            <div key={`overview-${doc.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-50" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{doc.name}</h4>
                      <p className="text-sm text-indigo-600 font-medium">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-gray-400" /> {doc.hospital}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {doc.phone}</p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {doc.email}</p>
                  </div>
                </div>
                
                <div className="md:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-600" /> Past Appointments</h5>
                    <div className="space-y-4">
                      {doc.history.map((hist, i) => (
                        <div key={i} className="text-sm border-l-2 border-indigo-100 pl-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800">{hist.reason}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{hist.date}</span>
                          </div>
                          <p className="text-gray-600 text-xs mt-1 leading-relaxed">{hist.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-600" /> Upcoming</h5>
                      {doc.currentAppointments.length > 0 ? (
                        <div className="space-y-2">
                          {doc.currentAppointments.map((apt, i) => (
                            <div key={i} className="text-sm bg-indigo-50 text-indigo-800 p-3 rounded-xl border border-indigo-100">
                              <div className="font-medium">{apt.type}</div>
                              <div className="text-xs mt-1 opacity-80 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {apt.date} at {apt.time}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">No upcoming appointments</p>
                      )}
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-600" /> AI Recommendations</h5>
                      <ul className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                        {doc.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                            <span className="leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
