import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Activity, ShieldAlert, Heart, Smartphone, ShieldCheck, Key } from 'lucide-react';

export function Profile() {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    setIsCodeSent(true);
    setTimeout(() => setIsCodeSent(false), 5000);
  };

  const demographicData = {
    fullName: "Alex Johnson",
    dateOfBirth: "1985-04-12",
    age: 40,
    gender: "Male",
    bloodType: "O+",
    height: "175 cm",
    weight: "85 kg",
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@example.com",
    address: "123 Healthway Drive, Wellness City, CA 90210",
    emergencyContact: {
      name: "Sarah Johnson",
      relation: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    insurance: {
      provider: "BlueCross Health",
      policyNumber: "BCH-987654321",
      groupNumber: "GRP-112233"
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Full Profile</h2>
        <p className="text-gray-500 mt-1">Your demographic and personal health information.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Header Card */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold flex-shrink-0">
            {demographicData.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-900">{demographicData.fullName}</h3>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                <Calendar className="w-4 h-4" /> {demographicData.dateOfBirth} ({demographicData.age} yrs)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium">
                <Heart className="w-4 h-4" /> Blood: {demographicData.bloodType}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                <Activity className="w-4 h-4" /> {demographicData.gender}
              </span>
            </div>
          </div>
        </div>

        {/* Security & Encryption */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" /> Security & Encryption
          </h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-500" /> End-to-End Encryption Recovery
              </h5>
              <p className="text-sm text-gray-500 mt-1">
                Send your E2E encryption recovery code to your registered mobile device ({demographicData.phone}).
              </p>
            </div>
            <button
              onClick={handleSendCode}
              disabled={isCodeSent}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isCodeSent 
                  ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              {isCodeSent ? 'Code Sent via SMS' : 'Send Code to Mobile'}
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" /> Contact Info
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</label>
              <div className="mt-1 flex items-center gap-2 text-gray-900">
                <Phone className="w-4 h-4 text-gray-400" /> {demographicData.phone}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
              <div className="mt-1 flex items-center gap-2 text-gray-900">
                <Mail className="w-4 h-4 text-gray-400" /> {demographicData.email}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</label>
              <div className="mt-1 flex items-start gap-2 text-gray-900">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" /> 
                <span>{demographicData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Attributes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" /> Physical Details
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Height</label>
              <div className="mt-1 text-gray-900 font-medium">{demographicData.height}</div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</label>
              <div className="mt-1 text-gray-900 font-medium">{demographicData.weight}</div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</label>
              <div className="mt-1 text-gray-900 font-medium">{demographicData.bloodType}</div>
            </div>
          </div>
        </div>

        {/* Emergency & Insurance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" /> Emergency & Insurance
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</label>
              <div className="mt-1 text-gray-900 font-medium">{demographicData.emergencyContact.name} ({demographicData.emergencyContact.relation})</div>
              <div className="text-gray-500 text-sm">{demographicData.emergencyContact.phone}</div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance Provider</label>
              <div className="mt-1 text-gray-900 font-medium">{demographicData.insurance.provider}</div>
              <div className="text-gray-500 text-sm">Policy: {demographicData.insurance.policyNumber}</div>
              <div className="text-gray-500 text-sm">Group: {demographicData.insurance.groupNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
