import { useState, useEffect } from 'react';
import { Sparkles, Bell, Pill, Activity, Loader2, CheckCircle2, CalendarDays, FileText } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export function SmartActionPlan() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null);

  const [reminders, setReminders] = useState([
    {
      id: 1,
      category: "Upcoming Appointments",
      icon: CalendarDays,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      items: [
        { id: 101, title: "Annual Checkup with Dr. Smith", time: "Nov 20, 2023 - 10:00 AM", status: "upcoming" },
        { id: 102, title: "Cardiology Follow-up", time: "Dec 05, 2023 - 2:30 PM", status: "upcoming" }
      ]
    },
    {
      id: 2,
      category: "Prescription Reminders",
      icon: Pill,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      items: [
        { id: 201, title: "Take Lisinopril 10mg", time: "Today - 8:00 AM", status: "completed" },
        { id: 202, title: "Take Atorvastatin 20mg", time: "Today - 10:00 PM", status: "pending" },
        { id: 203, title: "Refill Atorvastatin", time: "Due in 2 days", status: "urgent" }
      ]
    },
    {
      id: 3,
      category: "Health & Activity Goals",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      items: [
        { id: 301, title: "30 min cardiovascular walk", time: "Today - Evening", status: "pending" },
        { id: 302, title: "Log blood pressure reading", time: "Today - Morning", status: "completed" }
      ]
    },
    {
      id: 4,
      category: "Other Tasks",
      icon: FileText,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      items: [
        { id: 401, title: "Review new lab results", time: "Available since yesterday", status: "urgent" }
      ]
    }
  ]);

  const toggleReminder = (categoryId: number, itemId: number) => {
    setReminders(reminders.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                status: item.status === 'completed' ? 'pending' : 'completed'
              };
            }
            return item;
          })
        };
      }
      return category;
    }));
  };

  const generateRecommendations = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are an advanced AI health assistant integrated into a Patient Passport app.
        Read the following patient medical profile and generate personalized health recommendations.
        
        Patient Profile:
        - Age: 45
        - Recent Vitals: BP 112/75 (improved), HR 68 bpm
        - Recent Records: Cholesterol slightly high (LDL 130), Fasting Glucose 95
        - Active Prescriptions: Lisinopril 10mg (daily), Atorvastatin 20mg (daily at bedtime)
        - Doctor Notes: "Reduce sodium intake, increase cardio to 30 mins 4x/week."
        - Allergies: Penicillin, Peanuts
        
        Structure your response exactly like this:
        ### 🌟 Daily Focus
        (1 short paragraph of encouragement based on their improved BP)
        
        ### 🥗 Nutrition & Diet
        (2-3 bullet points focusing on sodium reduction and cholesterol management)
        
        ### 🏃‍♂️ Activity Goals
        (2 bullet points based on the doctor's cardio recommendation)
        
        ### 💡 AI Insights
        (1 interesting, scientifically-backed insight about how their current medications interact with diet or lifestyle)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      setRecommendations(response.text || "Could not generate recommendations.");
    } catch (error) {
      console.error("Error generating recommendations:", error);
      setRecommendations("An error occurred while generating recommendations. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!recommendations) {
      generateRecommendations();
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            Smart Reminders
          </h2>
          <p className="text-gray-500 mt-1">Your AI-powered health insights and daily tasks in one place.</p>
        </div>
        <button 
          onClick={generateRecommendations}
          disabled={isGenerating}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Refresh Insights
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Categorized Reminders */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-medium text-gray-900 flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5 text-amber-500" />
            Your Action Items
          </h3>
          
          <div className="space-y-4">
            {reminders.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                    <div className={`p-1.5 rounded-lg ${section.bgColor} ${section.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{section.category}</h4>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {section.items.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => toggleReminder(section.id, item.id)}
                        className="p-4 flex items-start gap-3 hover:bg-gray-50/50 transition-colors cursor-pointer"
                      >
                        <div className="mt-0.5">
                          {item.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : item.status === 'urgent' ? (
                            <Bell className="w-5 h-5 text-rose-500 animate-pulse" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${item.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[500px] sticky top-8">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 py-32">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
                  <Sparkles className="w-12 h-12 text-indigo-600 relative z-10" />
                </div>
                <p>Analyzing your latest labs, vitals, and doctor notes...</p>
              </div>
            ) : recommendations ? (
              <div className="prose prose-sm prose-indigo max-w-none markdown-body text-gray-700">
                <ReactMarkdown>{recommendations}</ReactMarkdown>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
