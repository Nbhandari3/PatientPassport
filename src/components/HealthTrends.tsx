import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Activity, HeartPulse, TrendingUp, Weight } from 'lucide-react';

const bpData = [
  { date: 'Jan', systolic: 120, diastolic: 80 },
  { date: 'Feb', systolic: 118, diastolic: 79 },
  { date: 'Mar', systolic: 122, diastolic: 82 },
  { date: 'Apr', systolic: 115, diastolic: 78 },
  { date: 'May', systolic: 119, diastolic: 80 },
  { date: 'Jun', systolic: 112, diastolic: 75 },
];

const hrData = [
  { date: 'Jan', heartRate: 72 },
  { date: 'Feb', heartRate: 70 },
  { date: 'Mar', heartRate: 75 },
  { date: 'Apr', heartRate: 68 },
  { date: 'May', heartRate: 71 },
  { date: 'Jun', heartRate: 68 },
];

const weightData = [
  { date: 'Jan', weight: 88 },
  { date: 'Feb', weight: 87.5 },
  { date: 'Mar', weight: 87 },
  { date: 'Apr', weight: 86.2 },
  { date: 'May', weight: 85.8 },
  { date: 'Jun', weight: 85 },
];

export function HealthTrends() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Health Trends</h2>
        <p className="text-gray-500 mt-1">Monitor your vital signs and health metrics over time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-500" />
                Blood Pressure
              </h3>
              <p className="text-sm text-gray-500 mt-1">Systolic & Diastolic (mmHg)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-gray-900">112/75</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1">
                <TrendingUp className="w-3 h-3" /> Improved
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#fb923c" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heart Rate Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-indigo-500" />
                Resting Heart Rate
              </h3>
              <p className="text-sm text-gray-500 mt-1">Beats per minute (bpm)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-gray-900">68</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1">
                <TrendingUp className="w-3 h-3" /> -4 bpm
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hrData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorHr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weight Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Weight className="w-5 h-5 text-emerald-500" />
                Body Weight
              </h3>
              <p className="text-sm text-gray-500 mt-1">Weight in kilograms (kg)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-gray-900">85.0</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1">
                <TrendingUp className="w-3 h-3" /> -3.0 kg
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="weight" name="Weight" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
