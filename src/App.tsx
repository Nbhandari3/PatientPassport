/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LabInterpreter } from './components/LabInterpreter';
import { RiskPrediction } from './components/RiskPrediction';
import { EmergencyQR } from './components/EmergencyQR';
import { DoctorHub } from './components/DoctorHub';
import { ShareRecord } from './components/ShareRecord';
import { SmartActionPlan } from './components/SmartActionPlan';
import { Medications } from './components/Medications';
import { HealthTrends } from './components/HealthTrends';
import { Appointments } from './components/Appointments';
import { MedSchedule } from './components/MedSchedule';
import { AIAssistant } from './components/AIAssistant';

import { Profile } from './components/Profile';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-[60vh] text-gray-500 space-y-4">
      <h2 className="text-2xl font-medium text-gray-900">{title}</h2>
      <p>This feature is coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/action-plan" element={<SmartActionPlan />} />
          <Route path="/share-records" element={<ShareRecord />} />
          <Route path="/doctor-hub" element={<DoctorHub />} />
          <Route path="/lab-results" element={<LabInterpreter />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/health-trends" element={<HealthTrends />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/med-schedule" element={<MedSchedule />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/emergency" element={<EmergencyQR />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
