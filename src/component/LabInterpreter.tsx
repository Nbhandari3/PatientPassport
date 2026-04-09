import { useState, useRef } from 'react';
import { Upload, FileText, Loader2, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export function LabInterpreter() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pastLabs = [
    { id: 1, name: 'Complete Blood Count (CBC)', date: 'Oct 12, 2023', doctor: 'Dr. Sarah Smith', status: 'Normal' },
    { id: 2, name: 'Lipid Panel', date: 'Oct 12, 2023', doctor: 'Dr. Sarah Smith', status: 'Attention Needed' },
    { id: 3, name: 'Comprehensive Metabolic Panel', date: 'Jun 05, 2023', doctor: 'Dr. James Wilson', status: 'Normal' },
    { id: 4, name: 'Hemoglobin A1C', date: 'Jan 15, 2023', doctor: 'Dr. Sarah Smith', status: 'Normal' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
      setResult(null);
    }
  };

  const analyzeLabReport = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: file.type,
                  data: base64Data
                }
              },
              {
                text: `You are an expert medical AI assistant. Analyze this lab report. 
                Explain the results in simple, easy-to-understand language for a patient.
                Structure your response:
                1. **Summary**: A 1-2 sentence overview.
                2. **Key Findings**: Bullet points of what's normal and what's out of range. Use simple terms.
                3. **Recommendations**: Actionable lifestyle or dietary advice based on the results.
                4. **Disclaimer**: Remind them to consult their doctor.
                
                Keep it empathetic, clear, and professional.`
              }
            ]
          }
        });
        
        setResult(response.text || "Could not analyze the report.");
        setIsAnalyzing(false);
      };
    } catch (error) {
      console.error("Error analyzing lab report:", error);
      setResult("An error occurred while analyzing the report. Please try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tight">Personal Health Record</h2>
        <p className="text-gray-500 mt-1">View past records or upload new reports for AI interpretation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Past Labs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Past Health Records
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {pastLabs.map((lab) => (
                <div key={lab.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{lab.name}</h4>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      lab.status === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {lab.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {lab.date}</span>
                      <span>•</span>
                      <span>{lab.doctor}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-50 bg-gray-50/50">
              <button className="w-full text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                View All History
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Interpreter */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              AI Record Interpreter
            </h3>
            
            <div 
              className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer mb-6"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Upload New Record</h3>
              <p className="text-sm text-gray-500 mt-2">Drag and drop or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Supports Images (JPG, PNG) and PDF</p>
            </div>

            {file && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={analyzeLabReport}
                  disabled={isAnalyzing}
                  className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Analyze
                    </>
                  )}
                </button>
              </div>
            )}

            {(isAnalyzing || result) && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Interpretation Results
                </h4>
                <div className="prose prose-sm prose-indigo max-w-none bg-indigo-50/30 p-6 rounded-xl border border-indigo-50">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-4 py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                      <p>Our AI is carefully reading your health record...</p>
                    </div>
                  ) : result ? (
                    <div className="markdown-body text-gray-700">
                      <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
