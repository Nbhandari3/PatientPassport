import { useState } from 'react';
import { Activity, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export function RiskPrediction() {
  const [formData, setFormData] = useState({
    age: '45',
    weight: '85',
    height: '175',
    lifestyle: 'Sedentary, desk job, occasional walking',
    diet: 'Mixed, often eats out, moderate sugar intake',
    medications: 'None',
    familyHistory: 'Father had hypertension',
    recentLabs: 'Cholesterol slightly high (LDL 130), Fasting Glucose 95'
  });
  
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are an advanced medical AI risk prediction system. 
        Analyze the following patient profile and predict possible future health risks (e.g., Diabetes, Heart disease, Hypertension, Obesity).
        
        Patient Profile:
        - Age: ${formData.age}
        - Weight: ${formData.weight} kg
        - Height: ${formData.height} cm
        - Lifestyle: ${formData.lifestyle}
        - Diet: ${formData.diet}
        - Medications: ${formData.medications}
        - Family History: ${formData.familyHistory}
        - Recent Health Records: ${formData.recentLabs}
        
        Structure your response:
        1. **Risk Overview**: A brief summary of their overall risk profile.
        2. **Specific Predictions**: List 2-3 specific conditions they are at risk for, with a risk level (Low, Moderate, High) and WHY.
        3. **Preventive Actions**: 3-4 highly specific, actionable steps they can take right now to lower these risks.
        
        Keep the tone professional, encouraging, and clear. Emphasize that this is preventive healthcare and not a formal diagnosis.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      setPrediction(response.text || "Could not generate prediction.");
    } catch (error) {
      console.error("Error predicting risks:", error);
      setPrediction("An error occurred while generating the prediction.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Smart Health Risk Prediction</h2>
        <p className="text-gray-500 mt-1">Analyze your profile to predict and prevent future health risks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Patient Profile</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Age</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Lifestyle & Activity</label>
                <input 
                  type="text" 
                  value={formData.lifestyle}
                  onChange={(e) => setFormData({...formData, lifestyle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Diet</label>
                <input 
                  type="text" 
                  value={formData.diet}
                  onChange={(e) => setFormData({...formData, diet: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Family History</label>
                <input 
                  type="text" 
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Recent Health Records</label>
                <textarea 
                  value={formData.recentLabs}
                  onChange={(e) => setFormData({...formData, recentLabs: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <button 
                onClick={handlePredict}
                disabled={isPredicting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {isPredicting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Generate Risk Prediction
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-full min-h-[600px]">
            <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              AI Risk Analysis
            </h3>
            
            <div className="prose prose-sm prose-indigo max-w-none">
              {isPredicting ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
                    <Activity className="w-12 h-12 text-indigo-600 relative z-10" />
                  </div>
                  <p>Processing health data and calculating risk factors...</p>
                </div>
              ) : prediction ? (
                <div className="markdown-body text-gray-700">
                  <ReactMarkdown>{prediction}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center space-y-4 py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <Activity className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">No prediction generated yet.</p>
                    <p className="text-sm mt-1">Fill out your profile and click generate to see your future health risks and preventive measures.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
