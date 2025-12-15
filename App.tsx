import React, { useState } from 'react';
import { getTechStackRecommendation } from './services/geminiService';
import { TechCard } from './components/TechCard';
import { RecommendationResponse } from './types';
import { Sparkles, ArrowRight, Loader2, Code, Zap, AlertTriangle, XCircle, CheckCircle, Ban, AlertOctagon, ChevronDown, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [description, setDescription] = useState('');
  const [optimizationGoal, setOptimizationGoal] = useState('Fastest to ship');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const optimizationOptions = [
    "Fastest to ship",
    "Cheapest",
    "Most scalable",
    "Beginner-friendly"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getTechStackRecommendation(description, optimizationGoal);
      setResult(data);
    } catch (err) {
      setError("Something went wrong while fetching the recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

      <main className="w-full max-w-5xl px-4 py-16 flex flex-col items-center z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 space-y-6 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700/50 text-emerald-400 text-sm font-medium mb-4 backdrop-blur-md">
            <Zap className="w-4 h-4 fill-emerald-400" />
            <span>AI-Powered Architecture</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 pb-2">
            Get Your Tech Stack
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Describe your idea. Get an opinionated, ruthless execution plan from a senior CTO.
          </p>
        </div>

        {/* Input Wrapper */}
        <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          {/* Optimization Dropdown */}
          <div className="mb-3 flex items-center justify-end space-x-3">
            <label className="text-sm font-medium text-slate-400">Primary goal:</label>
            <div className="relative">
                <select 
                    value={optimizationGoal}
                    onChange={(e) => setOptimizationGoal(e.target.value)}
                    className="appearance-none bg-slate-900/80 border border-slate-700 hover:border-emerald-500/50 text-slate-200 text-sm rounded-lg pl-4 pr-10 py-2 outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                >
                    {optimizationOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="I want to build a real-time collaborative whiteboard app for remote teams..."
                className="w-full bg-transparent text-lg text-slate-200 placeholder-slate-500 p-6 min-h-[140px] outline-none resize-none"
              />
              <div className="bg-slate-900/50 px-4 py-3 border-t border-slate-800 flex justify-between items-center backdrop-blur-sm">
                 <div className="flex items-center space-x-4 text-slate-500 text-sm hidden sm:flex">
                    <span className="flex items-center space-x-1.5">
                        <Code className="w-4 h-4" />
                        <span>Opinionated Mode</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>Gemini 2.5 Flash</span>
                 </div>

                <button
                  type="submit"
                  disabled={loading || !description.trim()}
                  className="flex items-center space-x-2 bg-slate-100 text-slate-900 hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] ml-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>Generate</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {error && (
            <div className="mt-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-center max-w-md animate-fade-in">
                {error}
            </div>
        )}

        {result && (
          <div className="w-full mt-16 space-y-12 animate-fade-in">
             
             {/* Strategy Header */}
             <div className="text-center space-y-4">
                 <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-sm uppercase tracking-wider shadow-lg">
                    Approach: {result.buildApproach}
                 </div>
                 <h2 className="text-2xl md:text-3xl font-light text-slate-100 max-w-3xl mx-auto">
                    {result.classification}
                 </h2>
             </div>

             {/* Main Stack */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-400">
                    <div className="h-px bg-slate-800 flex-1" />
                    <span className="text-sm font-medium uppercase tracking-widest">Recommended Stack</span>
                    <div className="h-px bg-slate-800 flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {result.stack.map((tool, idx) => (
                    <TechCard key={idx} tool={tool} index={idx} />
                  ))}
                </div>
            </div>

            {/* Anti-Patterns & Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Avoid List */}
                <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 text-red-400 mb-2">
                        <XCircle className="w-6 h-6" />
                        <h3 className="text-lg font-bold tracking-wide">WHAT NOT TO USE</h3>
                    </div>
                    <div className="space-y-4">
                        {result.whatNotToUse.map((item, i) => (
                            <div key={i} className="flex gap-4 p-3 rounded-lg bg-red-900/10 border border-red-900/20">
                                <Ban className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                <div>
                                    <div className="font-semibold text-red-200">{item.tool}</div>
                                    <div className="text-red-300/70 text-sm leading-snug">{item.reason}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Mistake */}
                <div className="bg-amber-950/10 border border-amber-900/30 rounded-2xl p-6 md:p-8 flex flex-col backdrop-blur-sm">
                    <div className="flex items-center space-x-3 text-amber-400 mb-6">
                        <AlertTriangle className="w-6 h-6" />
                        <h3 className="text-lg font-bold tracking-wide">#1 ROOKIE MISTAKE</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-6 bg-amber-900/10 rounded-xl border border-amber-900/20">
                        <p className="text-amber-100 text-lg text-center font-medium leading-relaxed italic">
                            "{result.commonMistake}"
                        </p>
                    </div>
                </div>
            </div>

            {/* MVP Cut Line */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
                 <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-center space-x-2">
                    <AlertOctagon className="w-5 h-5 text-slate-400" />
                    <h3 className="font-mono text-slate-300 font-bold tracking-widest">MVP CUT LINE</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                    {/* Must Build */}
                    <div className="p-6 md:p-8 space-y-4 bg-emerald-900/5">
                        <h4 className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-6">
                            <CheckCircle className="w-5 h-5" />
                            <span>Must Build (v1)</span>
                        </h4>
                        <ul className="space-y-3">
                            {result.mvpCutLine.mustBuild.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Must Cut */}
                    <div className="p-6 md:p-8 space-y-4 bg-slate-900/20">
                        <h4 className="flex items-center space-x-2 text-slate-500 font-bold text-sm uppercase tracking-wider mb-6">
                            <XCircle className="w-5 h-5" />
                            <span>Must Cut (Wait for v2)</span>
                        </h4>
                        <ul className="space-y-3">
                            {result.mvpCutLine.mustCut.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-500 line-through decoration-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-2.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                 </div>
            </div>

            {/* Why This Stack Wins (New Section) */}
            <div className="relative group rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-blue-500/50">
               <div className="bg-slate-950 rounded-2xl p-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16" />
                   
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <BrainCircuit className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 tracking-tight">WHY THIS STACK WINS FOR YOU</h3>
                   </div>

                   <ul className="space-y-4">
                      {result.whyThisStackWins.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                             <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">
                               {i + 1}
                             </span>
                             <p className="text-slate-300 leading-relaxed">{point}</p>
                          </li>
                      ))}
                   </ul>
               </div>
            </div>

            <div className="text-center pt-8 opacity-60 hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => {
                        setResult(null);
                        setDescription("");
                    }}
                    className="text-slate-500 hover:text-slate-300 underline underline-offset-4 text-sm"
                >
                    Start over with a new idea
                </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default App;
