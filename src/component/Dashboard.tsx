import { useState, useEffect } from 'react';
import { Activity, ArrowRight, FileText, QrCode, TrendingUp, HeartPulse } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const mockData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 118 },
  { name: 'Mar', value: 122 },
  { name: 'Apr', value: 115 },
  { name: 'May', value: 119 },
  { name: 'Jun', value: 112 },
];

const trendData = [
  { date: 'Jan', systolic: 120, diastolic: 80, heartRate: 72 },
  { date: 'Feb', systolic: 118, diastolic: 79, heartRate: 70 },
  { date: 'Mar', systolic: 122, diastolic: 82, heartRate: 75 },
  { date: 'Apr', systolic: 115, diastolic: 78, heartRate: 68 },
  { date: 'May', systolic: 119, diastolic: 80, heartRate: 71 },
  { date: 'Jun', systolic: 112, diastolic: 75, heartRate: 68 },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Welcome back, Alex</h2>
          <p className="text-gray-900 font-bold mt-1 tracking-wide">Your Personal Health Records, Anytime, Anywhere.</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold text-gray-900 tracking-tight">{formattedTime}</p>
          <p className="text-sm font-medium text-gray-500">{formattedDate}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-2xl shadow-sm border border-rose-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-rose-900">Blood Pressure</h3>
            <span className="p-2 bg-white/60 rounded-lg text-rose-600 shadow-sm">
              <Activity className="w-5 h-5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-rose-950">112/75</span>
            <span className="text-sm text-rose-700 font-medium">mmHg</span>
          </div>
          <div className="mt-4 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#f43f5e" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-indigo-900">Heart Rate</h3>
            <span className="p-2 bg-white/60 rounded-lg text-indigo-600 shadow-sm">
              <HeartPulse className="w-5 h-5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-indigo-950">68</span>
            <span className="text-sm text-indigo-700 font-medium">bpm</span>
          </div>
          <p className="text-sm text-emerald-600 mt-4 flex items-center gap-1 font-medium bg-emerald-50/50 w-fit px-2 py-1 rounded-md">
            <TrendingUp className="w-4 h-4" />
            Resting HR improved by 2%
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#FF5C72] to-[#FF8A50] p-6 rounded-2xl shadow-lg shadow-rose-500/20 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <QrCode className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-white/90">Emergency QR</h3>
            <p className="text-2xl font-extrabold mt-2">Active & Ready</p>
          </div>
          <button 
            onClick={() => navigate('/emergency')}
            className="relative z-10 mt-6 bg-white/20 hover:bg-white/30 transition-colors text-white py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-between backdrop-blur-sm cursor-pointer shadow-sm"
          >
            View QR Card
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-6">Health Trends Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={10} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line yAxisId="left" type="monotone" dataKey="systolic" name="Systolic BP" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line yAxisId="left" type="monotone" dataKey="diastolic" name="Diastolic BP" stroke="#fb923c" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">Recent Health Records</h3>
            <button 
              onClick={() => navigate('/lab-results')}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer"
            >
              Analyze New
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Complete Blood Count', date: 'Oct 12, 2023', status: 'Normal' },
              { name: 'Lipid Panel', date: 'Oct 12, 2023', status: 'Attention' },
              { name: 'Metabolic Panel', date: 'Jun 05, 2023', status: 'Normal' },
            ].map((lab, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{lab.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lab.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium",
                  lab.status === 'Normal' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                )}>
                  {lab.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">Health Risk Predictions</h3>
            <button 
              onClick={() => navigate('/profile')}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer"
            >
              Update Profile
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Hypertension</span>
                <span className="text-amber-600 font-medium">Moderate Risk</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[60%] rounded-full" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Based on recent BP trends and family history.</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Type 2 Diabetes</span>
                <span className="text-emerald-600 font-medium">Low Risk</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[15%] rounded-full" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Fasting glucose levels are optimal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
